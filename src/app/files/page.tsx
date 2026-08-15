"use client";

import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript } from "@/lib/a11y";
import { useAutosave } from "@/lib/autosave";
import { fileToStudyPayload } from "@/lib/client-files";
import { useI18n } from "@/lib/i18n";

type GenKind = "summary" | "flashcards" | "mcq" | "tf";

export default function FilesPage() {
  const { t, locale } = useI18n();
  const { triggerSave } = useAutosave();
  usePageScript(`${t.tools.filesTitle}. ${t.tools.filesBody}`, true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [payload, setPayload] = useState<{
    text?: string;
    imageDataUrl?: string;
    fileName: string;
  } | null>(null);
  const [paste, setPaste] = useState("");
  const [result, setResult] = useState<{ kind: GenKind; text: string } | null>(null);

  const labels =
    locale === "th"
      ? {
          summary: "สรุปสั้น",
          flashcards: "บัตรคำ",
          mcq: "ปรนัย",
          tf: "ถูก–ผิด",
          resultTitle: "ผลลัพธ์จาก AI",
          dropHint: "ลากไฟล์มาวาง หรือคลิกเพื่อเลือก (.txt .pdf รูป)",
          pasteLabel: "หรือวางข้อความโน้ตที่นี่",
          needFile: "อัปโหลดไฟล์หรือวางข้อความก่อน",
          working: "AI กำลังสร้าง…",
        }
      : {
          summary: "Short summary",
          flashcards: "Flashcards",
          mcq: "Multiple choice",
          tf: "True / False",
          resultTitle: "AI result",
          dropHint: "Drag files here or click (.txt .pdf images)",
          pasteLabel: "Or paste notes here",
          needFile: "Upload a file or paste text first",
          working: "AI is generating…",
        };

  const preventDefaults = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const ingestFile = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const next = await fileToStudyPayload(file);
      setPayload(next);
      setFileName(next.fileName);
      setRawFile(file);
      setResult(null);
      triggerSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPayload(null);
      setFileName(null);
      setRawFile(null);
    } finally {
      setBusy(false);
    }
  };

  const generate = async (kind: GenKind) => {
    const text = (payload?.text || paste).trim();
    const imageDataUrl = payload?.imageDataUrl || null;
    if (!text && !imageDataUrl && !rawFile) {
      setError(labels.needFile);
      return;
    }

    setBusy(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai/study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          kind,
          text,
          imageDataUrl,
          fileName: payload?.fileName || fileName || "notes",
        }),
      });
      const data = (await res.json()) as { ok?: boolean; text?: string; error?: string };
      if (!res.ok || !data.ok || !data.text) {
        throw new Error(data.error || (locale === "th" ? "สร้างไม่สำเร็จ" : "Generation failed"));
      }

      setResult({ kind, text: data.text });
      triggerSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI error");
    } finally {
      setBusy(false);
    }
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
              const file = e.dataTransfer.files?.[0];
              if (file) void ingestFile(file);
            }}
            className={`cloud-shadow mb-6 flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-[24px] border-4 border-dashed bg-white p-8 transition-all ${
              dragging
                ? "border-primary bg-primary-fixed/20"
                : "border-primary-fixed hover:border-primary/50"
            }`}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <Icon name={busy ? "hourglass_top" : "upload_file"} className="text-[28px]" />
            </div>
            <p className="font-headline-md text-[20px] text-primary">{t.tools.uploadCta}</p>
            <p className="font-body-md text-body-md mt-2 text-on-surface-variant">
              {fileName
                ? locale === "th"
                  ? `พร้อมแล้ว: ${fileName}`
                  : `Ready: ${fileName}`
                : labels.dropHint}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void ingestFile(file);
              }}
            />
          </div>

          <label className="mb-8 block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">
              {labels.pasteLabel}
            </span>
            <textarea
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-outline-variant bg-white p-4 text-sm outline-none focus:border-primary"
              placeholder={
                locale === "th"
                  ? "วางสรุปบทเรียนหรือโน้ตของคุณ…"
                  : "Paste your lesson notes…"
              }
            />
          </label>

          {error && (
            <p className="mb-6 rounded-2xl bg-error-container/40 px-4 py-3 text-sm text-on-error-container">
              {error}
            </p>
          )}

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
                disabled={busy}
                onClick={() => void generate(btn.kind)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-label-md text-label-md transition-colors disabled:opacity-60 ${
                  result?.kind === btn.kind
                    ? "bg-primary text-on-primary"
                    : "cloud-shadow bg-white text-primary hover:bg-primary-fixed/40"
                }`}
              >
                <Icon name={btn.icon} /> {busy ? labels.working : btn.label}
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
                  {labels.resultTitle}
                </h2>
              </div>
              <pre className="font-body-md text-body-md whitespace-pre-wrap rounded-2xl bg-surface-container-low p-5 text-on-surface">
                {result.text}
              </pre>
            </section>
          )}
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
