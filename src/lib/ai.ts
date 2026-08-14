type ChatContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string | ChatContentPart[];
};

type ChatCompletionResponse = {
  choices?: Array<{ message?: { content?: string | null } }>;
  error?: { message?: string };
};

type ResolvedAuth =
  | {
      kind: "openai-compatible";
      apiKey: string;
      baseURL: string;
      model: string;
    }
  | {
      kind: "gemini";
      apiKey: string;
      model: string;
    }
  | {
      kind: "pollinations";
      model: string;
    };

function parseDataUrl(dataUrl: string): { mime: string; data: string } | null {
  const m = /^data:([^;]+);base64,(.+)$/i.exec(dataUrl);
  if (!m) return null;
  return { mime: m[1], data: m[2] };
}

function flattenText(content: ChatMessage["content"]): string {
  if (typeof content === "string") return content;
  return content
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("\n");
}

function firstImageDataUrl(messages: ChatMessage[]): string | null {
  for (const message of messages) {
    if (typeof message.content === "string") continue;
    for (const part of message.content) {
      if (part.type === "image_url" && part.image_url.url.startsWith("data:")) {
        return part.image_url.url;
      }
    }
  }
  return null;
}

async function ocrImageDataUrl(dataUrl: string): Promise<string> {
  const form = new FormData();
  form.set("base64Image", dataUrl);
  form.set("language", "eng");
  form.set("isOverlayRequired", "false");
  form.set("OCREngine", "2");
  form.set("scale", "true");
  // Public OCR.space demo key — free tier for light usage
  form.set("apikey", process.env.OCR_SPACE_API_KEY?.trim() || "helloworld");

  const res = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    body: form,
  });
  const data = (await res.json()) as {
    ParsedResults?: Array<{ ParsedText?: string }>;
    ErrorMessage?: string | string[];
    IsErroredOnProcessing?: boolean;
  };

  if (!res.ok || data.IsErroredOnProcessing) {
    const err = Array.isArray(data.ErrorMessage)
      ? data.ErrorMessage.join(", ")
      : data.ErrorMessage || `OCR failed (${res.status})`;
    throw new Error(err);
  }

  const text = (data.ParsedResults || [])
    .map((r) => r.ParsedText || "")
    .join("\n")
    .trim();
  return text;
}

async function resolveAuth(): Promise<ResolvedAuth | null> {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim();
  const forceOidc = process.env.AI_GATEWAY_FORCE_OIDC === "1";

  if (gatewayKey) {
    return {
      kind: "openai-compatible",
      apiKey: gatewayKey,
      baseURL: "https://ai-gateway.vercel.sh/v1",
      model:
        process.env.GUIDELEARN_AI_MODEL?.trim() ||
        process.env.AI_GATEWAY_MODEL?.trim() ||
        "google/gemini-2.0-flash",
    };
  }

  if (geminiKey) {
    return {
      kind: "gemini",
      apiKey: geminiKey,
      model: process.env.GUIDELEARN_AI_MODEL?.trim() || "gemini-2.0-flash",
    };
  }

  if (openaiKey) {
    return {
      kind: "openai-compatible",
      apiKey: openaiKey,
      baseURL: "https://api.openai.com/v1",
      model: process.env.GUIDELEARN_AI_MODEL?.trim() || "gpt-4o-mini",
    };
  }

  // Free no-key fallback (never use Vercel OIDC by default — requires a card).
  if (!forceOidc) {
    return {
      kind: "pollinations",
      model: process.env.GUIDELEARN_AI_MODEL?.trim() || "openai",
    };
  }

  try {
    const { getVercelOidcToken } = await import("@vercel/oidc");
    const oidc = (await getVercelOidcToken())?.trim();
    if (oidc) {
      return {
        kind: "openai-compatible",
        apiKey: oidc,
        baseURL: "https://ai-gateway.vercel.sh/v1",
        model:
          process.env.GUIDELEARN_AI_MODEL?.trim() ||
          process.env.AI_GATEWAY_MODEL?.trim() ||
          "google/gemini-2.0-flash",
      };
    }
  } catch {
    /* ignore */
  }

  return {
    kind: "pollinations",
    model: process.env.GUIDELEARN_AI_MODEL?.trim() || "openai",
  };
}

export async function aiConfigured() {
  return (await resolveAuth()) !== null;
}

async function chatViaGemini(auth: Extract<ResolvedAuth, { kind: "gemini" }>, messages: ChatMessage[]) {
  const systemParts = messages
    .filter((m) => m.role === "system")
    .map((m) => flattenText(m.content))
    .filter(Boolean);

  const contents: Array<{
    role: "user" | "model";
    parts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }>;
  }> = [];

  for (const message of messages) {
    if (message.role === "system") continue;
    const role = message.role === "assistant" ? "model" : "user";
    const parts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }> = [];

    if (typeof message.content === "string") {
      parts.push({ text: message.content });
    } else {
      for (const part of message.content) {
        if (part.type === "text") {
          parts.push({ text: part.text });
        } else {
          const parsed = parseDataUrl(part.image_url.url);
          if (parsed) {
            parts.push({
              inline_data: { mime_type: parsed.mime, data: parsed.data },
            });
          }
        }
      }
    }

    if (parts.length) contents.push({ role, parts });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(auth.model)}:generateContent?key=${encodeURIComponent(auth.apiKey)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: systemParts.length
        ? { parts: systemParts.map((text) => ({ text })) }
        : undefined,
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 2048,
      },
    }),
  });

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    error?: { message?: string };
  };

  if (!res.ok) {
    throw new Error(data.error?.message || `Gemini request failed (${res.status})`);
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("").trim();
  if (!text) throw new Error("AI returned an empty response.");
  return text;
}

async function chatViaOpenAICompat(
  auth: Extract<ResolvedAuth, { kind: "openai-compatible" }>,
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number },
) {
  const res = await fetch(`${auth.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: auth.model,
      temperature: options.temperature ?? 0.4,
      max_tokens: options.maxTokens ?? 1800,
      messages,
    }),
  });

  const data = (await res.json()) as ChatCompletionResponse;
  if (!res.ok) {
    const msg = data.error?.message || `AI request failed (${res.status})`;
    if (/credit card/i.test(msg)) {
      throw new Error(
        "Vercel AI Gateway ต้องการบัตรเครดิต — ระบบจะใช้โหมดฟรีแทนถ้าไม่บังคับ OIDC",
      );
    }
    throw new Error(msg);
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("AI returned an empty response.");
  return text;
}

async function chatViaPollinations(auth: Extract<ResolvedAuth, { kind: "pollinations" }>, messages: ChatMessage[]) {
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => flattenText(m.content))
    .join("\n");

  let imageNote = "";
  const image = firstImageDataUrl(messages);
  if (image) {
    try {
      const ocr = await ocrImageDataUrl(image);
      imageNote = ocr
        ? `\n\n[OCR from homework image]\n${ocr.slice(0, 5000)}`
        : "\n\n[Homework image attached but OCR found little text]";
    } catch {
      imageNote =
        "\n\n[Homework image attached. OCR unavailable — ask the student to type the problem if needed.]";
    }
  }

  const dialogue = messages
    .filter((m) => m.role !== "system")
    .map((m) => {
      const who = m.role === "assistant" ? "Tutor" : "Student";
      return `${who}: ${flattenText(m.content)}`;
    })
    .join("\n");

  const prompt = `${system}${imageNote}

Conversation:
${dialogue}

Tutor:`.trim();

  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=${encodeURIComponent(auth.model)}&token=${Date.now()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "text/plain" },
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("โหมด AI ฟรีใช้งานหนาแน่น ลองใหม่อีกครั้งในสักครู่");
    }
    throw new Error(`Free AI request failed (${res.status})`);
  }

  const text = (await res.text()).trim();
  if (!text) throw new Error("AI returned an empty response.");
  return text;
}

export async function chatCompletion(options: {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const auth = await resolveAuth();
  if (!auth) {
    throw new Error("AI is not available.");
  }

  if (auth.kind === "gemini") {
    return chatViaGemini(auth, options.messages);
  }
  if (auth.kind === "pollinations") {
    return chatViaPollinations(auth, options.messages);
  }
  return chatViaOpenAICompat(auth, options.messages, options);
}
