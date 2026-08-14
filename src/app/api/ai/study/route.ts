import { NextResponse } from "next/server";
import { aiConfigured, chatCompletion, type ChatMessage } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

type Kind = "summary" | "flashcards" | "mcq" | "tf";

type Body = {
  locale?: "th" | "en";
  kind?: Kind;
  text?: string;
  fileName?: string;
  imageDataUrl?: string | null;
};

const KIND_PROMPTS: Record<Kind, { th: string; en: string }> = {
  summary: {
    th: "สรุปเนื้อหาเป็นจุดสั้น ๆ 5–8 ข้อ เน้นสิ่งที่ควรจำก่อนสอบ ใช้ภาษาไทย",
    en: "Summarize into 5–8 concise bullet points focused on exam-ready takeaways.",
  },
  flashcards: {
    th: "สร้างบัตรคำ 6–10 ใบ รูปแบบแต่ละบรรทัด: Q: ... | A: ... ใช้ภาษาไทย",
    en: "Create 6–10 flashcards. One per line as: Q: ... | A: ...",
  },
  mcq: {
    th: "สร้างข้อสอบปรนัย 5 ข้อ แต่ละข้อมีตัวเลือก A–D และเฉลยท้ายข้อ รูปแบบชัดเจน ภาษาไทย",
    en: "Create 5 multiple-choice questions with options A–D and the answer after each question.",
  },
  tf: {
    th: "สร้างข้อถูก/ผิด 8 ข้อ แต่ละข้อตามด้วยคำว่า ถูก หรือ ผิด และเหตุผลสั้น ๆ ภาษาไทย",
    en: "Create 8 true/false items. After each statement write True or False plus a one-line reason.",
  },
};

export async function POST(req: Request) {
  try {
    if (!(await aiConfigured())) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "ยังไม่ได้ตั้งค่า AI — เพิ่ม GEMINI_API_KEY (ฟรีจาก Google AI Studio) หรือ OPENAI_API_KEY / AI_GATEWAY_API_KEY ใน Vercel Environment Variables",
        },
        { status: 503 },
      );
    }

    const body = (await req.json()) as Body;
    const locale = body.locale === "en" ? "en" : "th";
    const kind = (body.kind || "summary") as Kind;
    if (!KIND_PROMPTS[kind]) {
      return NextResponse.json({ ok: false, error: "Invalid kind" }, { status: 400 });
    }

    const text = (body.text || "").trim();
    const imageDataUrl = body.imageDataUrl?.trim() || null;
    const fileName = (body.fileName || "notes").slice(0, 120);

    if (!text && !imageDataUrl) {
      return NextResponse.json(
        {
          ok: false,
          error:
            locale === "th"
              ? "อัปโหลดไฟล์หรือวางข้อความก่อนสร้างสรุป/ข้อสอบ"
              : "Upload a file or paste text first.",
        },
        { status: 400 },
      );
    }

    if (imageDataUrl && imageDataUrl.length > 6_500_000) {
      return NextResponse.json(
        { ok: false, error: locale === "th" ? "ไฟล์ใหญ่เกินไป (จำกัด ~4MB)" : "File too large (max ~4MB)." },
        { status: 400 },
      );
    }

    const task = KIND_PROMPTS[kind][locale];
    const system =
      locale === "th"
        ? `คุณคือผู้ช่วยเรียน GuideLearn ช่วยสรุปโน้ตและสร้างแบบฝึกจากเอกสารนักเรียน
- ยึดเฉพาะเนื้อหาที่ให้มา ห้ามแต่งข้อมูลนอกเอกสาร
- จัดรูปแบบอ่านง่าย ชัดเจน สำหรับนักเรียนมัธยม–มหาวิทยาลัย`
        : `You are GuideLearn's study assistant. Summarize notes and generate practice from the student's material.
- Use only the provided content; do not invent facts.
- Keep formatting clear for high-school / early university students.`;

    const userText = `${task}

File: ${fileName}
---
${text ? text.slice(0, 14000) : "(content is in the attached image/PDF preview)"}`;

    const messages: ChatMessage[] = [{ role: "system", content: system }];
    if (imageDataUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: userText },
          { type: "image_url", image_url: { url: imageDataUrl } },
        ],
      });
    } else {
      messages.push({ role: "user", content: userText });
    }

    const result = await chatCompletion({ messages, temperature: 0.3, maxTokens: 2200 });
    return NextResponse.json({ ok: true, kind, text: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Study AI failed";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
