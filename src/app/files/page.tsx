"use client";

import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript } from "@/lib/a11y";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";

type GenKind = "summary" | "flashcards" | "mcq" | "tf";

export default function FilesPage() {
  const { t, locale } = useI18n();
  const { triggerSave } = useAutosave();
  usePageScript(`${t.tools.filesTitle}. ${t.tools.filesBody}`, true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [result, setResult] = useState<{ kind: GenKind; text: string } | null>(null);

  const labels =
    locale === "th"
      ? {
          summary: "สรุปสั้น",
          flashcards: "บัตรคำ",
          mcq: "ปรนัย",
          tf: "ถูก–ผิด",
          sampleTitle: "ผลลัพธ์ตัวอย่าง",
          dropHint: "ลากไฟล์มาวาง หรือคลิกเพื่อเลือก",
        }
      : {
          summary: "Short summary",
          flashcards: "Flashcards",
          mcq: "Multiple choice",
          tf: "True / False",
          sampleTitle: "Sample result",
          dropHint: "Drag files here or click to browse",
        };

  const samples: Record<GenKind, string> =
    locale === "th"
      ? {
          summary:
            "แคลคูลัสบทนี้เน้นเทคนิคอินทิกรัล: การแทนค่า แยกส่วน และเศษส่วนย่อย จดจำรูปแบบมาตรฐานก่อนทำข้อสอบจับเวลา",
          flashcards:
            "หน้า 1: ∫xⁿ dx = ? → xⁿ⁺¹/(n+1)+C\nหน้า 2: กฎลูกโซ่ใช้เมื่อ… → ฟังก์ชันประกอบ\nหน้า 3: ∫eˣ dx = ? → eˣ+C",
          mcq:
            "ข้อ 1) ∫ 2x dx เท่ากับข้อใด?\nA) x²+C  B) 2x²+C  C) x+C  D) 2+C\nคำใบ้: ลองอินทิกรัลพจน์ต่อพจน์",
          tf:
            "1. อนุพันธ์ของค่าคงที่คือ 0 — ถูก\n2. อินทิกรัลของ 1/x คือ ln|x|+C — ถูก\n3. กฎผลคูณใช้กับอินทิกรัลโดยตรง — ผิด",
        }
      : {
          summary:
            "This unit focuses on integration techniques: substitution, parts, and partial fractions. Memorize standard forms before timed practice.",
          flashcards:
            "Card 1: ∫xⁿ dx = ? → xⁿ⁺¹/(n+1)+C\nCard 2: Chain rule applies when… → composition of functions\nCard 3: ∫eˣ dx = ? → eˣ+C",
          mcq:
            "Q1) What is ∫ 2x dx?\nA) x²+C  B) 2x²+C  C) x+C  D) 2+C\nHint: integrate term by term.",
          tf:
            "1. Derivative of a constant is 0 — True\n2. ∫(1/x) dx = ln|x|+C — True\n3. Product rule applies directly to integrals — False",
        };

  const preventDefaults = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const markUploaded = () => {
    setUploaded(true);
    triggerSave();
  };

  const generate = (kind: GenKind) => {
    setResult({ kind, text: samples[kind] });
    triggerSave();
  };

  return (
    <AppShell>
      <RequireAuth>
        <PageMain id="main-content">
          <header className="mb-8 max-w-3xl">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary">
              {t.tools.filesTitle}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t.tools.filesBody}
            </p>
          </header>

          <div
            role="button"
            tabIndex={0}
            aria-label={t.tools.uploadCta}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragEnter={(e) => {
              preventDefaults(e);
              setDragging(true);
            }}
            onDragOver={(e) => {
              preventDefaults(e);
              setDragging(true);
            }}
            onDragLeave={(e) => {
              preventDefaults(e);
              setDragging(false);
            }}
            onDrop={(e) => {
              preventDefaults(e);
              setDragging(false);
              if (e.dataTransfer.files?.length) markUploaded();
            }}
            className={`cloud-shadow mb-8 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-[24px] border-4 border-dashed bg-white p-8 transition-all ${
              dragging
                ? "border-primary bg-primary-fixed/20"
                : "border-primary-fixed hover:border-primary/50"
            }`}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <Icon name="upload_file" className="text-[28px]" />
            </div>
            <p className="font-headline-md text-[20px] text-primary">{t.tools.uploadCta}</p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              {uploaded
                ? locale === "th"
                  ? "อัปโหลดแล้ว — พร้อมสร้างสรุป"
                  : "File ready — generate a study set"
                : labels.dropHint}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) markUploaded();
              }}
            />
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {(
              [
                { kind: "summary" as const, icon: "summarize", label: labels.summary },
                { kind: "flashcards" as const, icon: "style", label: labels.flashcards },
                { kind: "mcq" as const, icon: "quiz", label: labels.mcq },
                { kind: "tf" as const, icon: "rule", label: labels.tf },
              ] as const
            ).map((btn) => (
              <button
                key={btn.kind}
                type="button"
                onClick={() => generate(btn.kind)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-label-md text-label-md transition-colors ${
                  result?.kind === btn.kind
                    ? "bg-primary text-on-primary"
                    : "bg-white text-primary cloud-shadow hover:bg-primary-fixed/40"
                }`}
              >
                <Icon name={btn.icon} /> {btn.label}
              </button>
            ))}
          </div>

          {result && (
            <section className="cloud-shadow rounded-[24px] border-t-[6px] border-tertiary-container bg-white p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant">
                  <Icon name="auto_awesome" />
                </div>
                <h2 className="font-headline-md text-[20px] text-on-surface">
                  {labels.sampleTitle}
                </h2>
              </div>
              <pre className="font-body-md text-body-md text-on-surface whitespace-pre-wrap rounded-2xl bg-surface-container-low p-5">
                {result.text}
              </pre>
            </section>
          )}
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
