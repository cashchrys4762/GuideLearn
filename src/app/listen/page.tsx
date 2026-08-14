"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript } from "@/lib/a11y";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";

type Msg = { id: string; role: "ai" | "user"; text: string };

export default function ListenPage() {
  const { t, locale } = useI18n();
  const { triggerSave } = useAutosave();
  usePageScript(
    `${t.tools.listenTitle}. ${t.tools.listenBody}. ${t.tools.listenDisclaimer}`,
    true,
  );

  const welcome =
    locale === "th"
      ? "สวัสดี ฉันพร้อมรับฟัง คุณอยากเล่าเรื่องอะไรเกี่ยวกับการเรียนวันนี้ไหม?"
      : "Hi — I'm here to listen. Want to talk about what's on your mind with studying today?";

  const replyFor = (text: string) =>
    locale === "th"
      ? `ขอบคุณที่เล่าให้ฟังเรื่อง “${text.slice(0, 40)}${text.length > 40 ? "…" : ""}” หายใจลึก ๆ แล้วค่อย ๆ จัดลำดับสิ่งที่ทำได้วันนี้ทีละอย่างนะ`
      : `Thanks for sharing about “${text.slice(0, 40)}${text.length > 40 ? "…" : ""}”. Take a breath — let's pick one small next step you can finish today.`;

  const [messages, setMessages] = useState<Msg[]>([
    { id: "welcome", role: "ai", text: welcome },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = replyFor(text);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text },
      { id: `a-${Date.now()}`, role: "ai", text: reply },
    ]);
    setInput("");
    triggerSave();
  };

  return (
    <AppShell>
      <RequireAuth>
        <main
          className="w-full flex-1 px-container-margin pt-6 pb-32 md:ml-64 md:px-12 md:pt-12 md:pb-12"
          id="main-content"
          role="main"
        >
          <header className="mb-6 max-w-3xl">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary">
              {t.tools.listenTitle}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              {t.tools.listenBody}
            </p>
            <p className="flex items-start gap-2 rounded-2xl bg-secondary-fixed/50 px-4 py-3 font-label-md text-label-md text-on-secondary-fixed-variant">
              <Icon name="info" className="mt-0.5 shrink-0 text-secondary-container" />
              {t.tools.listenDisclaimer}
            </p>
          </header>

          <div className="cloud-shadow mx-auto flex max-w-2xl flex-col overflow-hidden rounded-[24px] border border-surface-dim bg-white">
            <div className="flex items-center gap-3 border-b border-surface-dim bg-gradient-to-r from-[#5b4dff]/15 to-primary-fixed/40 px-5 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <Icon name="hearing" />
              </div>
              <div>
                <p className="font-headline-md text-[18px] text-on-surface">
                  {t.navExtra.listen}
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  {t.platform.private}
                </p>
              </div>
            </div>

            <div className="flex max-h-[420px] min-h-[320px] flex-col gap-4 overflow-y-auto bg-surface p-5">
              {messages.map((msg) =>
                msg.role === "user" ? (
                  <div
                    key={msg.id}
                    className="max-w-[85%] self-end rounded-[24px] rounded-br-sm bg-primary p-4 text-white"
                  >
                    <p className="font-body-md text-body-md">{msg.text}</p>
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    className="max-w-[90%] rounded-[24px] rounded-bl-sm border border-surface-dim bg-white p-4"
                  >
                    <p className="font-body-md text-body-md text-on-surface">{msg.text}</p>
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-surface-dim bg-white p-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder={
                    locale === "th" ? "พิมพ์สิ่งที่อยากระบาย…" : "Type what's on your mind…"
                  }
                  className="w-full rounded-full border-2 border-transparent bg-surface-container-low py-4 pr-14 pl-5 outline-none focus:border-primary focus:bg-white"
                />
                <button
                  type="button"
                  aria-label="Send"
                  onClick={send}
                  className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white"
                >
                  <Icon name="send" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </RequireAuth>
    </AppShell>
  );
}
