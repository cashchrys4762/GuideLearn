"use client";

import Image from "next/image";
import { useRef, useState, type DragEvent, type FormEvent, type KeyboardEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript, useVoice } from "@/lib/a11y";
import { assets } from "@/lib/assets";
import { useAutosave } from "@/lib/autosave";
import { readAsDataUrl } from "@/lib/client-files";
import { useI18n } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

export default function TutorPage() {
  const { t, locale } = useI18n();
  const { speak } = useVoice();
  const { triggerSave } = useAutosave();
  usePageScript(`${t.tools.tutorTitle}. ${t.tools.tutorBody}`, true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `${t.studyBuddy.welcome}\n\n${t.studyBuddy.welcomeHint}`,
    },
  ]);

  const steps = [
    t.tools.tutorStep1,
    t.tools.tutorStep2,
    t.tools.tutorStep3,
    t.tools.tutorStep4,
  ];

  const preventDefaults = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const askTutor = async (opts: { message?: string; imageDataUrl?: string | null }) => {
    const message = (opts.message || "").trim();
    const imageDataUrl = opts.imageDataUrl ?? null;
    if (!message && !imageDataUrl) return;

    setBusy(true);
    setError(null);

    const userLabel = imageDataUrl
      ? message
        ? `${message}\n[${locale === "th" ? "แนบรูปโจทย์" : "Attached homework photo"}]`
        : locale === "th"
          ? "อัปโหลดรูปโจทย์การบ้านแล้ว ช่วยพาคิดทีละขั้นหน่อย"
          : "Uploaded a homework photo — please guide me step by step."
      : message;

    const nextHistory = [...messages, { role: "user" as const, content: userLabel }];
    setMessages(nextHistory);
    if (message) setInput("");
    speak(t.studyBuddy.analyzing);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          message,
          imageDataUrl,
          history: messages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .slice(-8)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; reply?: string; error?: string };
      if (!res.ok || !data.ok || !data.reply) {
        throw new Error(data.error || (locale === "th" ? "ติวไม่สำเร็จ" : "Tutor request failed"));
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
      speak(`${t.studyBuddy.analysisComplete}. ${data.reply.slice(0, 180)}`);
      triggerSave();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "AI error";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            locale === "th"
              ? `ตอนนี้ยังช่วยต่อไม่ได้: ${msg}`
              : `I couldn't continue right now: ${msg}`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.[0]) return;
    try {
      setBusy(true);
      setError(null);
      const dataUrl = await readAsDataUrl(files[0]);
      setPreview(dataUrl);
      await askTutor({ imageDataUrl: dataUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    void askTutor({ message: input, imageDataUrl: null });
  };

  return (
    <AppShell>
      <RequireAuth>
        <PageMain id="main-content">
          <header className="mb-8 max-w-3xl">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 flex items-center gap-3 text-primary">
              {t.tools.tutorTitle}
              <Icon name="stars" filled className="text-secondary-container" />
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t.tools.tutorBody}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div
                role="button"
                tabIndex={0}
                aria-label={t.studyBuddy.dropTitle}
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
                  void handleFiles(e.dataTransfer.files);
                }}
                className={`cloud-shadow flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-[24px] border-4 border-dashed bg-white p-8 transition-all ${
                  dragging
                    ? "border-primary bg-primary-fixed/20"
                    : "border-primary-fixed hover:border-primary/50"
                }`}
              >
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Homework preview"
                    className="mb-4 max-h-40 rounded-xl object-contain"
                  />
                ) : (
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed ${
                      busy ? "text-tertiary-container" : "text-primary"
                    }`}
                  >
                    <Icon
                      name={busy ? "hourglass_top" : "add_photo_alternate"}
                      className="text-[32px]"
                    />
                  </div>
                )}
                <h3 className="font-headline-md text-[20px] text-primary">
                  {busy ? t.studyBuddy.analyzing : t.studyBuddy.dropTitle}
                </h3>
                <p className="font-body-md text-body-md mt-2 max-w-sm text-center text-on-surface-variant">
                  {t.studyBuddy.dropHint}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => void handleFiles(e.target.files)}
                />
              </div>

              {error && (
                <p className="rounded-2xl bg-error-container/40 px-4 py-3 text-sm text-on-error-container">
                  {error}
                </p>
              )}

              <section className="cloud-shadow rounded-[24px] bg-white p-6 md:p-8">
                <h2 className="font-headline-md text-headline-md mb-4 text-on-surface">
                  {t.studyBuddy.step1.replace(":", "")}
                </h2>
                <ol className="space-y-3">
                  {steps.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 rounded-2xl border border-surface-dim bg-surface-container-low px-4 py-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
                        {i + 1}
                      </span>
                      <span className="font-body-md text-body-md pt-1 text-on-surface">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className="cloud-shadow flex min-h-[420px] flex-col overflow-hidden rounded-[24px] border border-surface-dim bg-white">
              <div className="flex items-center gap-3 bg-primary px-5 py-4 text-on-primary">
                <Image
                  src={assets.tigerGrad}
                  alt={t.studyBuddy.coachName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  unoptimized
                />
                <div>
                  <p className="font-headline-md text-[18px] font-bold">{t.studyBuddy.coachName}</p>
                  <p className="font-label-sm text-label-sm opacity-90">
                    {busy ? t.studyBuddy.analyzing : t.studyBuddy.online}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface p-5">
                {messages.map((m, i) => (
                  <div
                    key={`${i}-${m.role}-${m.content.slice(0, 12)}`}
                    className={`max-w-[92%] rounded-[24px] p-4 whitespace-pre-wrap ${
                      m.role === "user"
                        ? "ml-auto rounded-br-sm bg-primary text-on-primary"
                        : "rounded-bl-sm border border-surface-dim bg-white text-on-surface"
                    }`}
                  >
                    <p className="font-body-md text-body-md">{m.content}</p>
                    {m.role === "assistant" && (
                      <button
                        type="button"
                        className="mt-2 text-primary"
                        aria-label={t.studyBuddy.audioMode}
                        onClick={() => speak(m.content)}
                      >
                        <Icon name="volume_up" className="text-[20px]" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={onSubmit} className="border-t border-surface-dim p-3">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.studyBuddy.placeholder}
                    disabled={busy}
                    className="min-w-0 flex-1 rounded-full border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary disabled:opacity-50"
                  >
                    <Icon name="send" />
                  </button>
                </div>
              </form>
            </aside>
          </div>
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
