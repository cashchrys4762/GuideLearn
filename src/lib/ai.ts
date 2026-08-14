import { getVercelOidcToken } from "@vercel/oidc";

export type ChatContentPart =
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
    };

function parseDataUrl(dataUrl: string): { mime: string; data: string } | null {
  const m = /^data:([^;]+);base64,(.+)$/i.exec(dataUrl);
  if (!m) return null;
  return { mime: m[1], data: m[2] };
}

async function resolveAuth(): Promise<ResolvedAuth | null> {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim();

  // Explicit gateway key first.
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

  // Free Gemini key preferred over OIDC (OIDC often requires a card for credits).
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

  try {
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
    /* not on Vercel / OIDC unavailable */
  }

  const oidcEnv = process.env.VERCEL_OIDC_TOKEN?.trim();
  if (oidcEnv) {
    return {
      kind: "openai-compatible",
      apiKey: oidcEnv,
      baseURL: "https://ai-gateway.vercel.sh/v1",
      model:
        process.env.GUIDELEARN_AI_MODEL?.trim() ||
        process.env.AI_GATEWAY_MODEL?.trim() ||
        "google/gemini-2.0-flash",
    };
  }

  return null;
}

export async function aiConfigured() {
  return (await resolveAuth()) !== null;
}

function flattenText(content: ChatMessage["content"]): string {
  if (typeof content === "string") return content;
  return content
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("\n");
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
        "Vercel AI Gateway ต้องการบัตรเครดิตเพื่อปลดล็อกเครดิตฟรี หรือใส่ GEMINI_API_KEY / OPENAI_API_KEY ใน Environment Variables",
      );
    }
    throw new Error(msg);
  }

  const text = data.choices?.[0]?.message?.content?.trim();
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
    throw new Error(
      "ยังไม่ได้ตั้งค่า AI — เพิ่ม GEMINI_API_KEY (ฟรีจาก Google AI Studio) หรือ OPENAI_API_KEY หรือ AI_GATEWAY_API_KEY ใน Vercel",
    );
  }

  if (auth.kind === "gemini") {
    return chatViaGemini(auth, options.messages);
  }

  return chatViaOpenAICompat(auth, options.messages, options);
}
