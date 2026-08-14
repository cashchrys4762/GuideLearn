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

async function resolveAuth() {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();

  if (gatewayKey) {
    return {
      apiKey: gatewayKey,
      baseURL: "https://ai-gateway.vercel.sh/v1",
      model:
        process.env.GUIDELEARN_AI_MODEL?.trim() ||
        process.env.AI_GATEWAY_MODEL?.trim() ||
        "google/gemini-2.0-flash",
    };
  }

  // Prefer fresh OIDC on Vercel deployments / linked local projects.
  try {
    const oidc = (await getVercelOidcToken())?.trim();
    if (oidc) {
      return {
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
      apiKey: oidcEnv,
      baseURL: "https://ai-gateway.vercel.sh/v1",
      model:
        process.env.GUIDELEARN_AI_MODEL?.trim() ||
        process.env.AI_GATEWAY_MODEL?.trim() ||
        "google/gemini-2.0-flash",
    };
  }

  if (openaiKey) {
    return {
      apiKey: openaiKey,
      baseURL: "https://api.openai.com/v1",
      model: process.env.GUIDELEARN_AI_MODEL?.trim() || "gpt-4o-mini",
    };
  }

  return null;
}

export async function aiConfigured() {
  return (await resolveAuth()) !== null;
}

export async function chatCompletion(options: {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const auth = await resolveAuth();
  if (!auth) {
    throw new Error(
      "AI is not configured. Set AI_GATEWAY_API_KEY (Vercel AI Gateway) or OPENAI_API_KEY.",
    );
  }

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
      messages: options.messages,
    }),
  });

  const data = (await res.json()) as ChatCompletionResponse;
  if (!res.ok) {
    const msg = data.error?.message || `AI request failed (${res.status})`;
    throw new Error(msg);
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("AI returned an empty response.");
  return text;
}
