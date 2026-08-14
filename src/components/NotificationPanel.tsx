"use client";

import { useI18n } from "@/lib/i18n";
import { useNotices } from "@/lib/notices";
import { Icon } from "./Icon";

export function NotificationPanel() {
  const { locale, t } = useI18n();
  const { notices, panelOpen, setPanelOpen, markRead, markAllRead, unread } = useNotices();
  if (!panelOpen) return null;

  const kindColor = {
    study: "bg-primary-fixed text-primary",
    deadline: "bg-error-container text-on-error-container",
    news: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  } as const;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[70] bg-black/20"
        aria-label="Close notifications"
        onClick={() => setPanelOpen(false)}
      />
      <aside className="fixed top-0 right-0 z-[71] flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-dim px-5 py-4">
          <div>
            <h2 className="font-headline-md text-[22px] text-on-surface">
              {t.platform.notifications}
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {unread} unread
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="rounded-full p-2 hover:bg-surface-container"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {notices.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => markRead(n.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                n.read
                  ? "border-surface-dim bg-surface"
                  : "border-primary-fixed bg-primary-fixed/20"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 font-label-sm text-[11px] ${kindColor[n.kind]}`}
                >
                  {n.kind}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{n.time}</span>
              </div>
              <p className="font-body-lg text-[16px] font-semibold text-on-surface">
                {locale === "th" ? n.titleTh : n.title}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {locale === "th" ? n.bodyTh : n.body}
              </p>
            </button>
          ))}
        </div>
        <div className="flex gap-2 border-t border-surface-dim p-4">
          <button
            type="button"
            onClick={markAllRead}
            className="flex-1 rounded-full bg-surface-container py-3 font-label-md text-label-md"
          >
            {t.platform.markAllRead}
          </button>
          <a
            href="/plan"
            className="flex-1 rounded-full bg-primary py-3 text-center font-label-md text-label-md text-on-primary"
            onClick={() => setPanelOpen(false)}
          >
            {t.platform.openCalendar}
          </a>
        </div>
      </aside>
    </>
  );
}
