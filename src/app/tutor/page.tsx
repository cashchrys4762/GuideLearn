"use client";

import Image from "next/image";
import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript, useVoice } from "@/lib/a11y";
import { assets } from "@/lib/assets";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";

type DropStatus = "idle" | "analyzing";

export default function TutorPage() {
  const { t, locale } = useI18n();
  const { speak } = useVoice();
  const { triggerSave } = useAutosave();
  usePageScript(`${t.tools.tutorTitle}. ${t.tools.tutorBody}`, true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dropStatus, setDropStatus] = useState<DropStatus>("idle");

  const steps = [
    t.tools.tutorStep1,
    t.tools.tutorStep2,
    t.tools.tutorStep3,
    t.tools.tutorStep4,
  ];

  const processNote =
    locale === "th"
      ? "AI สอนกระบวนการคิด ไม่เฉลยคำตอบทันที — ลองทีละขั้นก่อน"
      : "AI teaches the process, not just answers — try each step before spoilers.";

  const preventDefaults = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setDropStatus("analyzing");
    speak(t.studyBuddy.analyzing);
    window.setTimeout(() => {
      setDropStatus("idle");
      triggerSave();
      speak(`${t.studyBuddy.analysisComplete}. ${t.studyBuddy.problem}`);
    }, 1800);
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
                  handleFiles(e.dataTransfer.files);
                }}
                className={`cloud-shadow flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-[24px] border-4 border-dashed bg-white p-8 transition-all ${
                  dragging
                    ? "border-primary bg-primary-fixed/20"
                    : "border-primary-fixed hover:border-primary/50"
                }`}
              >
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed ${
                    dropStatus === "analyzing" ? "text-tertiary-container" : "text-primary"
                  }`}
                >
                  <Icon
                    name={dropStatus === "analyzing" ? "check_circle" : "add_photo_alternate"}
                    className="text-[32px]"
                  />
                </div>
                <h3 className="font-headline-md text-[20px] text-primary">
                  {dropStatus === "analyzing" ? t.studyBuddy.analyzing : t.studyBuddy.dropTitle}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm text-center">
                  {t.studyBuddy.dropHint}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              <section className="cloud-shadow rounded-[24px] bg-white p-6 md:p-8">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                  {t.studyBuddy.step1.replace(":", "")}
                </h2>
                <ol className="space-y-3">
                  {steps.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 rounded-2xl border border-surface-dim bg-surface-container-low px-4 py-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
                <button
                  type="button"
                  onClick={() => speak(processNote)}
                  className="mt-5 inline-flex items-center gap-2 font-label-md text-label-md text-primary underline-offset-4 hover:underline"
                >
                  <Icon name="info" className="text-[18px]" />
                  {processNote}
                </button>
              </section>
            </div>

            <aside className="cloud-shadow flex min-h-[420px] flex-col overflow-hidden rounded-[24px] border border-surface-dim bg-white">
              <div className="flex items-center gap-3 bg-gradient-to-r from-primary-container to-primary px-5 py-4">
                <Image
                  src={assets.tigerGrad}
                  alt={t.studyBuddy.coachName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  unoptimized
                />
                <div>
                  <p className="font-headline-md text-[18px] font-bold text-white">
                    {t.studyBuddy.coachName}
                  </p>
                  <p className="font-label-sm text-label-sm text-primary-fixed opacity-90">
                    {t.studyBuddy.online}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 bg-surface p-5">
                <div className="max-w-[90%] rounded-[24px] rounded-bl-sm border border-surface-dim bg-white p-4">
                  <p className="font-body-md text-body-md text-on-surface">
                    {t.studyBuddy.welcome}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    {t.studyBuddy.welcomeHint}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-primary"
                    aria-label={t.studyBuddy.audioMode}
                    onClick={() =>
                      speak(`${t.studyBuddy.welcome} ${t.studyBuddy.welcomeHint}`)
                    }
                  >
                    <Icon name="volume_up" className="text-[20px]" />
                  </button>
                </div>
                <div className="max-w-[85%] self-end rounded-[24px] rounded-br-sm bg-primary p-4 text-white">
                  <p className="font-body-md text-body-md">{t.studyBuddy.userMsg}</p>
                </div>
                <div className="max-w-[90%] rounded-[24px] rounded-bl-sm border border-surface-dim bg-white p-4">
                  <p className="font-body-md text-body-md">{t.studyBuddy.coachReply1}</p>
                  <p className="font-body-md text-body-md mt-2">{t.studyBuddy.coachReply2}</p>
                  <div className="mt-3 rounded-xl border border-tertiary-fixed bg-tertiary-fixed/40 p-3 text-[15px]">
                    <p className="mb-1 font-bold text-on-tertiary-fixed-variant">
                      {t.studyBuddy.step1}
                    </p>
                    <p>{t.studyBuddy.step1q}</p>
                  </div>
                </div>
              </div>
              <p className="flex items-center justify-center gap-1 border-t border-surface-dim px-4 py-3 text-[11px] text-on-surface-variant/70">
                <Icon name="lock" className="text-[14px]" /> {t.studyBuddy.safe}
              </p>
            </aside>
          </div>
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
