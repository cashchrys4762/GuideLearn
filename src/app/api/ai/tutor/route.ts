import { NextResponse } from "next/server";
import { aiConfigured, chatCompletion, type ChatMessage } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  locale?: "th" | "en";
  message?: string;
  imageDataUrl?: string | null;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
};

export async function POST(req: Request) {
  try {
    if (!(await aiConfigured())) {
      return NextResponse.json(
        {
          ok: false,
          error: "AI ยังไม่พร้อมใช้งาน ลองรีเฟรชหน้าแล้วลองใหม่",
        },
        { status: 503 },
      );
    }

    const body = (await req.json()) as Body;
    const locale = body.locale === "en" ? "en" : "th";
    const message = (body.message || "").trim();
    const imageDataUrl = body.imageDataUrl?.trim() || null;
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

    if (!message && !imageDataUrl) {
      return NextResponse.json(
        { ok: false, error: locale === "th" ? "กรุณาพิมพ์คำถามหรืออัปโหลดรูปโจทย์" : "Send a question or homework photo." },
        { status: 400 },
      );
    }

    if (imageDataUrl && imageDataUrl.length > 6_500_000) {
      return NextResponse.json(
        { ok: false, error: locale === "th" ? "ไฟล์ใหญ่เกินไป (จำกัด ~4MB)" : "File too large (max ~4MB)." },
        { status: 400 },
      );
    }

    const system =
      locale === "th"
        ? `คุณคือโค้ชโทบี้ (Coach Toby) ติวเตอร์ AI ของ GuideLearn
- ช่วยนักเรียนไทยคิดทีละขั้น แบบโซเครติก ห้ามเฉลยคำตอบสุดท้ายทันที
- อ่านโจทย์จากรูป/ข้อความ อธิบายแนวคิดสั้น ๆ แล้วถามคำถามนำ
- ถ้าเป็นคณิต ชี้แนวคิดสำคัญและขั้นถัดไป 1–2 ขั้น
- ตอบภาษาไทย กระชับ อ่านง่าย ใช้ markdown สั้น ๆ ได้
- ห้ามสร้างข้อมูลเท็จ และอย่าเปิดเผยคำตอบเต็มจนกว่านักเรียนจะขอชัดเจนว่า "เฉลยเลย"`
        : `You are Coach Toby, GuideLearn's homework tutor.
- Be Socratic: guide step-by-step; do not give the final answer immediately.
- Read the problem from image/text, explain the idea briefly, then ask a leading question.
- Keep replies concise in English (Thai ok if student uses Thai).
- Never invent facts. Only reveal a full solution if the student clearly asks for the final answer.`;

    const messages: ChatMessage[] = [{ role: "system", content: system }];

    for (const turn of history) {
      if (!turn?.content?.trim()) continue;
      if (turn.role !== "user" && turn.role !== "assistant") continue;
      messages.push({ role: turn.role, content: turn.content.slice(0, 4000) });
    }

    if (imageDataUrl) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text:
              message ||
              (locale === "th"
                ? "นี่คือรูปโจทย์การบ้านของฉัน ช่วยอ่านโจทย์ แล้วพาคิดทีละขั้นโดยยังไม่เฉลยคำตอบสุดท้าย"
                : "Here is my homework photo. Read the problem and guide me step-by-step without giving the final answer yet."),
          },
          { type: "image_url", image_url: { url: imageDataUrl } },
        ],
      });
    } else {
      messages.push({ role: "user", content: message });
    }

    const reply = await chatCompletion({ messages, temperature: 0.35, maxTokens: 1600 });
    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Tutor AI failed";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
