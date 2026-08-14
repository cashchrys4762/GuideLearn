"use client";

import Image from "next/image";
import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { assets } from "@/lib/assets";

type DropStatus = "idle" | "analyzing";

export default function StudyBuddyPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dropStatus, setDropStatus] = useState<DropStatus>("idle");
  const [message, setMessage] = useState("");

  const preventDefaults = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setDropStatus("analyzing");
    window.setTimeout(() => setDropStatus("idle"), 2000);
  };

  return (
    <AppShell compact>
      <main className="relative z-10 flex h-full flex-col md:ml-64">
        <div className="flex items-center justify-between bg-surface-container-low/80 p-4 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-surface-dim bg-white">
              <Image
                src={assets.tigerCub}
                alt="GuideLearn tiger cub"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <span className="font-headline-md text-[20px] font-bold text-primary">GuideLearn</span>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 overflow-hidden p-4 md:p-container-margin lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto pr-2 pb-20 lg:pb-0">
            <header className="mb-2">
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg flex items-center gap-3 text-primary">
                Let&apos;s tackle this together!
                <Icon name="stars" filled className="text-secondary-container" />
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                Stuck on a tricky problem? Snap a photo of your homework and drop it here. Toby the
                AI Coach will help you break it down step-by-step.
              </p>
            </header>

            <div
              role="button"
              tabIndex={0}
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
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-secondary-fixed/40 blur-2xl transition-all group-hover:bg-secondary-fixed/60" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-tertiary-fixed/40 blur-2xl transition-all group-hover:bg-tertiary-fixed/60" />
              <div
                className={`relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-fixed shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 ${
                  dropStatus === "analyzing" ? "text-tertiary-container" : "text-primary"
                }`}
              >
                <Icon
                  name={dropStatus === "analyzing" ? "check_circle" : "add_photo_alternate"}
                  className="text-[40px]"
                />
              </div>
              <h3 className="font-headline-md relative z-10 text-[22px] text-primary">
                {dropStatus === "analyzing"
                  ? "File analyzing..."
                  : "Drop your homework photo here"}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant relative z-10 mt-2 max-w-sm text-center">
                or click to browse your device. We accept JPG, PNG, and PDF files.
              </p>
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            <div className="relative mt-4 flex flex-col gap-4 opacity-90 transition-opacity hover:opacity-100">
              <div className="absolute -top-8 left-1/2 hidden h-8 w-0.5 bg-surface-dim lg:block" />
              <div className="relative w-full overflow-hidden rounded-[24px] border-t-[6px] border-tertiary-container bg-surface-container-lowest p-6 shadow-[0_8px_30px_rgb(0,88,190,0.08)]">
                <div className="absolute top-0 right-0 -z-0 h-32 w-32 rounded-bl-[100px] bg-tertiary-fixed/20" />
                <div className="relative z-10 mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant">
                      <Icon name="document_scanner" />
                    </div>
                    <h4 className="font-headline-md text-[20px] text-on-surface">
                      Analysis Complete
                    </h4>
                  </div>
                  <span className="rounded-full border border-surface-dim bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">
                    Math - Algebra
                  </span>
                </div>
                <div className="font-body-md mb-6 rounded-xl border border-surface-dim/50 bg-surface-container-low p-4 text-center text-lg text-primary/80 italic">
                  &quot;Solve for x: 3x + 5 = 20&quot;
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-label-md text-label-md text-on-surface-variant text-xs tracking-wider uppercase">
                    Key Concepts Identified
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 rounded-full border border-secondary-fixed-dim/30 bg-secondary-fixed px-4 py-2 font-label-md text-label-md text-on-secondary-fixed-variant shadow-sm">
                      <Icon name="functions" className="text-sm" /> Linear Equations
                    </span>
                    <span className="flex items-center gap-1 rounded-full border border-tertiary-fixed-dim/30 bg-tertiary-fixed px-4 py-2 font-label-md text-label-md text-on-tertiary-fixed-variant shadow-sm">
                      <Icon name="calculate" className="text-sm" /> Variable Isolation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-4 flex h-[600px] w-full shrink-0 flex-col overflow-hidden rounded-[32px] border border-surface-dim bg-surface-container-lowest shadow-[0_12px_40px_rgb(0,88,190,0.12)] lg:mt-0 lg:h-auto lg:w-[420px]">
            <div className="relative flex shrink-0 items-center gap-4 overflow-hidden bg-gradient-to-r from-primary-container to-primary px-6 py-5 text-on-primary-container shadow-sm">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl" />
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-white p-1 shadow-md">
                  <Image
                    src={assets.tigerGrad}
                    alt="Coach Toby mascot"
                    width={56}
                    height={56}
                    className="h-full w-full rounded-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-headline-md text-[20px] font-bold text-white">Coach Toby</h3>
                <p className="font-body-md flex items-center gap-1 text-[14px] text-primary-fixed opacity-90">
                  <Icon name="bolt" filled className="text-[16px]" /> Online &amp; ready to help
                </p>
              </div>
            </div>

            <div className="chat-scroll flex flex-1 flex-col gap-6 overflow-y-auto bg-surface p-6">
              <div className="relative flex max-w-[90%] gap-3">
                <div className="mt-auto flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white bg-primary-fixed shadow-sm">
                  <Image
                    src={assets.tigerChat}
                    alt="Coach Toby"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="font-body-md text-body-md text-on-surface relative rounded-[24px] rounded-bl-sm border border-surface-dim bg-white p-4 shadow-[0_4px_15px_rgb(0,0,0,0.03)]">
                  <p>Hi there! I&apos;m Coach Toby. Ready to crush some homework? 🐾</p>
                  <p className="text-on-surface-variant mt-2">
                    Just drop a photo of the problem you&apos;re working on in the box on the left,
                    and we&apos;ll figure it out step-by-step!
                  </p>
                </div>
              </div>

              <div className="relative flex max-w-[85%] gap-3 self-end">
                <div className="font-body-md text-body-md rounded-[24px] rounded-br-sm bg-primary p-4 text-left text-white shadow-[0_4px_15px_rgb(0,88,190,0.2)]">
                  <p>I just uploaded a math problem. I&apos;m stuck on how to isolate &apos;x&apos;.</p>
                </div>
              </div>

              <div className="relative flex max-w-[90%] gap-3">
                <div className="mt-auto flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white bg-primary-fixed shadow-sm">
                  <Image
                    src={assets.tigerHelp}
                    alt="Coach Toby"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="font-body-md text-body-md text-on-surface rounded-[24px] rounded-bl-sm border border-surface-dim bg-gradient-to-b from-white to-surface-container-low p-4 shadow-[0_4px_15px_rgb(0,0,0,0.03)]">
                  <p>Great job uploading that! I see it perfectly.</p>
                  <p className="mt-2">
                    The problem is <strong>3x + 5 = 20</strong>.
                  </p>
                  <div className="mt-3 rounded-xl border border-tertiary-fixed bg-tertiary-fixed/40 p-3 text-[15px]">
                    <p className="mb-1 font-bold text-on-tertiary-fixed-variant">Step 1:</p>
                    <p>
                      Our goal is to get &apos;x&apos; all by itself. What do you think we should do
                      with that +5 first?
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-primary bg-white px-4 py-2 font-label-sm text-[13px] text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
                    >
                      Subtract 5
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-outline-variant bg-white px-4 py-2 font-label-sm text-[13px] text-on-surface-variant shadow-sm transition-colors hover:bg-surface-container"
                    >
                      Divide by 3
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-surface-dim bg-surface-container-lowest p-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your answer here..."
                  className="font-body-md text-body-md text-on-surface w-full rounded-full border-2 border-transparent bg-surface-container-low py-4 pr-14 pl-5 shadow-inner outline-none transition-all focus:border-primary focus:bg-white focus:ring-0"
                />
                <button
                  type="button"
                  aria-label="Send message"
                  className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-105 hover:bg-surface-tint active:scale-95"
                >
                  <Icon name="send" />
                </button>
              </div>
              <div className="mt-2 text-center">
                <span className="font-label-sm flex items-center justify-center gap-1 text-[11px] text-on-surface-variant/70">
                  <Icon name="lock" className="text-[14px]" /> Safe &amp; Private Space
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
