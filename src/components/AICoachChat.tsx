"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";
import { Icon } from "./Icon";

export function AICoachChat() {
  const { t, locale } = useI18n();
  const { isLoggedIn, openLogin } = useAuth();
  const { triggerSave } = useAutosave();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: t.platform.coachWelcome },
  ]);

  const openCoach = () => {
    if (!isLoggedIn) {
      openLogin("/");
      return;
    }
    setOpen(true);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply =
      locale === "th"
        ? "ลองแบ่งงานใหญ่เป็นขั้นเล็ก ๆ นะ — วันนี้เริ่มจากวิชาที่ใกล้กำหนดส่งก่อน แล้วค่อยทบทวน 25 นาที พัก 5 นาที"
        : "Let's break it down — start with the nearest deadline, then do a 25-minute focus block and a 5-minute break.";
    setMsgs((m) => [...m, { role: "user", text }, { role: "ai", text: reply }]);
    setInput("");
    triggerSave();
  };

  return (
    <>
      <button
        type="button"
        onClick={openCoach}
        aria-label={t.platform.coachFab}
        className="safe-fab fixed right-3 bottom-[9.5rem] z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5b4dff] to-primary px-3 py-2.5 text-sm text-white shadow-lg sm:right-5 sm:px-4 sm:py-3 lg:right-6 lg:bottom-28"
      >
        <Icon name="smart_toy" filled />
        <span className="hidden font-label-md text-label-md sm:inline">{t.platform.coachFab}</span>
      </button>

      {open && (
        <div className="safe-fab fixed right-3 bottom-[13.5rem] z-[60] flex h-[min(420px,55dvh)] w-[min(100%-1.5rem,380px)] flex-col overflow-hidden rounded-[28px] border border-surface-dim bg-white shadow-2xl sm:right-5 lg:right-6 lg:bottom-24 lg:h-[420px]">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#5b4dff] to-primary px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Icon name="smart_toy" filled />
              <span className="font-label-md text-label-md">{t.platform.coachTitle}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <Icon name="close" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={`${i}-${m.text.slice(0, 12)}`}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-surface-container text-on-surface"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-surface-dim p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t.platform.coachPlaceholder}
              className="flex-1 rounded-full bg-surface-container-low px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={send}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
            >
              <Icon name="send" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
