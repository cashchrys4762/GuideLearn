"use client";

type PuterAI = {
  chat: (...args: unknown[]) => Promise<unknown>;
};

declare global {
  interface Window {
    puter?: { ai?: PuterAI };
  }
}

let loading: Promise<void> | null = null;

export function loadPuter(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.puter?.ai?.chat) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-puter="1"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Puter failed to load")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.dataset.puter = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Puter failed to load"));
    document.head.appendChild(script);
  });

  return loading;
}

function extractText(result: unknown): string {
  if (typeof result === "string") return result.trim();
  if (!result || typeof result !== "object") return "";

  const r = result as Record<string, unknown>;
  if (typeof r.message === "string") return r.message.trim();
  if (r.message && typeof r.message === "object") {
    const msg = r.message as Record<string, unknown>;
    if (typeof msg.content === "string") return msg.content.trim();
    if (Array.isArray(msg.content)) {
      return msg.content
        .map((part) => {
          if (typeof part === "string") return part;
          if (part && typeof part === "object" && "text" in part) {
            return String((part as { text?: string }).text || "");
          }
          return "";
        })
        .join("")
        .trim();
    }
  }
  if (typeof r.text === "string") return r.text.trim();
  if (typeof r.content === "string") return r.content.trim();
  return "";
}

/** Free User-Pays AI via Puter (no Vercel card / server key required). */
export async function puterChat(options: {
  system: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  userText: string;
  imageFile?: File | null;
  model?: string;
}): Promise<string> {
  await loadPuter();
  const chat = window.puter?.ai?.chat;
  if (!chat) throw new Error("Puter AI is unavailable in this browser.");

  const model = options.model || "gpt-4.1-nano";
  const dialogue = options.messages
    .map((m) => `${m.role === "assistant" ? "Tutor" : "Student"}: ${m.content}`)
    .join("\n");

  const prompt = `${options.system}

${dialogue ? `Conversation so far:\n${dialogue}\n` : ""}
Student: ${options.userText}
Tutor:`.trim();

  const result = options.imageFile
    ? await chat(prompt, options.imageFile, { model })
    : await chat(prompt, { model });

  const text = extractText(result);
  if (!text) throw new Error("Empty AI response");
  return text;
}
