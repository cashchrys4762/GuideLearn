"use client";

import Image from "next/image";
import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { LanguageToggle } from "@/components/LanguageToggle";
import { usePageScript, useVoice } from "@/lib/a11y";
import { assets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";

type DropStatus = "idle" | "analyzing";
type ChatMsg = { id: string; role: "ai" | "user"; text: string };

export default function StudyBuddyPage() {
  const { t, locale } = useI18n();
  const { speak } = useVoice();
  usePageScript(t.studyBuddy.pageSummary, true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dropStatus, setDropStatus] = useState<DropStatus>("idle");
  const [message, setMessage] = useState("");
  const [extra, setExtra] = useState<ChatMsg[]>([]);

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
      speak(`${t.studyBuddy.analysisComplete}. ${t.studyBuddy.problem}`);
    }, 2000);
  };

  const sendMessage = () => {
    const text = message.trim();
    if (!text) return;
    const reply =
      locale === "th"
        ? "ลองกดปุ่ม ลบ 5 หรือ หารด้วย 3 ด้านบนได้เลยนะ"
        : "Try the Subtract 5 or Divide by 3 buttons above!";
    setExtra((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text },
      { id: `a-${Date.now()}`, role: "ai", text: reply },
    ]);
    setMessage("");
    speak(reply);
  };

  const choose = (kind: "subtract" | "divide") => {
    const reply = kind === "subtract" ? t.studyBuddy.afterSubtract : t.studyBuddy.afterDivide;
    setExtra((prev) => [...prev, { id: `c-${Date.now()}`, role: "ai", text: reply }]);
    speak(reply);
  };

  return (
    <AppShell compact>
      <main className="relative z-10 flex h-full flex-col md:ml-64" role="main">
        <div className="flex items-center justify-between bg-surface-container-low/80 p-4 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-surface-dim bg-white">
              <Image
                src={assets.tigerCub}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <span className="font-headline-md text-[20px] font-bold text-primary">{t.brand}</span>
          </div>
          <LanguageToggle size="sm" />
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 overflow-hidden p-4 md:p-container-margin lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto pr-2 pb-20 lg:pb-0">
            <header className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg flex items-center gap-3 text-primary">
                  {t.studyBuddy.title}
                  <Icon name="stars" filled className="text-secondary-container" />
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                  {t.studyBuddy.subtitle}
                </p>
              </div>
              <div className="hidden md:block">
                <LanguageToggle />
              </div>
            </header>

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
              className={`group relative flex min-h-[280px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[32px] border-4 border-dashed p-8 shadow-sm shadow-primary/5 transition-all duration-300 ease-out ${
                dragging
                  ? "border-primary bg-primary-fixed/20"
                  : "border-primary-fixed bg-surface-container-lowest hover:border-primary/50 hover:bg-surface-container"
              } ${dragging || dropStatus === "analyzing" ? "" : "animate-soft-pulse"}`}
            >
              <div
                className={`relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-fixed shadow-inner ${
                  dropStatus === "analyzing" ? "text-tertiary-container" : "text-primary"
                }`}
              >
                <Icon
                  name={dropStatus === "analyzing" ? "check_circle" : "add_photo_alternate"}
                  className="text-[40px]"
                />
              </div>
              <h3 className="font-headline-md relative z-10 text-[22px] text-primary">
                {dropStatus === "analyzing" ? t.studyBuddy.analyzing : t.studyBuddy.dropTitle}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant relative z-10 mt-2 max-w-sm text-center">
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

            <div className="relative w-full overflow-hidden rounded-[24px] border-t-[6px] border-tertiary-container bg-surface-container-lowest p-6 shadow-[0_8px_30px_rgb(0,88,190,0.08)]">
              <div className="mb-4 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant">
                    <Icon name="document_scanner" />
                  </div>
                  <h4 className="font-headline-md text-[20px] text-on-surface">
                    {t.studyBuddy.analysisComplete}
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      speak(
                        `${t.studyBuddy.analysisComplete}. ${t.studyBuddy.problem}. ${t.studyBuddy.linear}. ${t.studyBuddy.isolation}`,
                      )
                    }
                    className="flex items-center gap-1 rounded-full border border-primary-fixed-dim/50 bg-primary-fixed/50 px-3 py-1.5 font-label-sm text-label-sm text-on-primary-fixed-variant hover:bg-primary-fixed focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <Icon name="volume_up" className="text-[16px]" /> {t.studyBuddy.audioMode}
                  </button>
                  <span className="rounded-full border border-surface-dim bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">
                    {t.studyBuddy.mathAlgebra}
                  </span>
                </div>
              </div>
              <div className="font-body-md mb-6 rounded-xl border border-surface-dim/50 bg-surface-container-low p-4 text-center text-lg text-primary/80 italic">
                &quot;{t.studyBuddy.problem}&quot;
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant text-xs tracking-wider uppercase">
                {t.studyBuddy.keyConcepts}
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="flex items-center gap-1 rounded-full bg-secondary-fixed px-4 py-2 font-label-md text-label-md text-on-secondary-fixed-variant">
                  <Icon name="functions" className="text-sm" /> {t.studyBuddy.linear}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-tertiary-fixed px-4 py-2 font-label-md text-label-md text-on-tertiary-fixed-variant">
                  <Icon name="calculate" className="text-sm" /> {t.studyBuddy.isolation}
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-4 flex h-[600px] w-full shrink-0 flex-col overflow-hidden rounded-[32px] border border-surface-dim bg-surface-container-lowest shadow-[0_12px_40px_rgb(0,88,190,0.12)] lg:mt-0 lg:h-auto lg:w-[420px]">
            <div className="flex shrink-0 items-center gap-4 bg-gradient-to-r from-primary-container to-primary px-6 py-5">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-white p-1 shadow-md">
                  <Image
                    src={assets.tigerGrad}
                    alt={t.studyBuddy.coachName}
                    width={56}
                    height={56}
                    className="h-full w-full rounded-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-headline-md text-[20px] font-bold text-white">
                  {t.studyBuddy.coachName}
                </h3>
                <p className="font-body-md flex items-center gap-1 text-[14px] text-primary-fixed opacity-90">
                  <Icon name="bolt" filled className="text-[16px]" /> {t.studyBuddy.online}
                </p>
              </div>
            </div>

            <div className="chat-scroll flex flex-1 flex-col gap-6 overflow-y-auto bg-surface p-6">
              <div className="flex max-w-[90%] gap-3">
                <Image
                  src={assets.tigerChat}
                  alt=""
                  width={32}
                  height={32}
                  className="mt-auto h-8 w-8 rounded-full object-cover"
                  unoptimized
                />
                <div className="rounded-[24px] rounded-bl-sm border border-surface-dim bg-white p-4">
                  <p>
                    {t.studyBuddy.welcome} 🐾
                  </p>
                  <p className="text-on-surface-variant mt-2">{t.studyBuddy.welcomeHint}</p>
                  <button
                    type="button"
                    className="mt-2 text-primary"
                    onClick={() => speak(`${t.studyBuddy.welcome} ${t.studyBuddy.welcomeHint}`)}
                  >
                    <Icon name="volume_up" className="text-[20px]" />
                  </button>
                </div>
              </div>

              <div className="max-w-[85%] self-end rounded-[24px] rounded-br-sm bg-primary p-4 text-white">
                <p>{t.studyBuddy.userMsg}</p>
              </div>

              <div className="flex max-w-[90%] gap-3">
                <Image
                  src={assets.tigerHelp}
                  alt=""
                  width={32}
                  height={32}
                  className="mt-auto h-8 w-8 rounded-full object-cover"
                  unoptimized
                />
                <div className="rounded-[24px] rounded-bl-sm border border-surface-dim bg-white p-4">
                  <p>{t.studyBuddy.coachReply1}</p>
                  <p className="mt-2">{t.studyBuddy.coachReply2}</p>
                  <div className="mt-3 rounded-xl border border-tertiary-fixed bg-tertiary-fixed/40 p-3 text-[15px]">
                    <p className="mb-1 font-bold text-on-tertiary-fixed-variant">
                      {t.studyBuddy.step1}
                    </p>
                    <p>{t.studyBuddy.step1q}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => choose("subtract")}
                      className="rounded-full border border-primary bg-white px-4 py-2 text-[13px] font-semibold text-primary hover:bg-primary hover:text-white"
                    >
                      {t.studyBuddy.subtract5}
                    </button>
                    <button
                      type="button"
                      onClick={() => choose("divide")}
                      className="rounded-full border border-outline-variant bg-white px-4 py-2 text-[13px] text-on-surface-variant hover:bg-surface-container"
                    >
                      {t.studyBuddy.divide3}
                    </button>
                  </div>
                </div>
              </div>

              {extra.map((msg) =>
                msg.role === "user" ? (
                  <div
                    key={msg.id}
                    className="max-w-[85%] self-end rounded-[24px] rounded-br-sm bg-primary p-4 text-white"
                  >
                    <p>{msg.text}</p>
                  </div>
                ) : (
                  <div key={msg.id} className="flex max-w-[90%] gap-3">
                    <Image
                      src={assets.tigerChat}
                      alt=""
                      width={32}
                      height={32}
                      className="mt-auto h-8 w-8 rounded-full object-cover"
                      unoptimized
                    />
                    <div className="rounded-[24px] rounded-bl-sm border border-surface-dim bg-white p-4">
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="shrink-0 border-t border-surface-dim bg-surface-container-lowest p-4">
              <div className="relative flex items-center">
                <button
                  type="button"
                  aria-label={t.a11y.fabLabel}
                  onClick={() => speak(t.voiceHelp)}
                  className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant hover:text-primary"
                >
                  <Icon name="mic" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  placeholder={t.studyBuddy.placeholder}
                  className="w-full rounded-full border-2 border-transparent bg-surface-container-low py-4 pr-14 pl-12 outline-none focus:border-primary focus:bg-white"
                />
                <button
                  type="button"
                  aria-label="Send"
                  onClick={sendMessage}
                  className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white"
                >
                  <Icon name="send" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-on-surface-variant/70">
                <Icon name="lock" className="text-[14px]" /> {t.studyBuddy.safe}
              </p>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
