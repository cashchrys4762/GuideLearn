"use client";

import { useVoice } from "@/lib/a11y";
import { useI18n } from "@/lib/i18n";
import { Icon } from "./Icon";

export function VoiceFab() {
  const { t } = useI18n();
  const { voiceMode, listening, speaking, toggleVoiceMode, announcement } = useVoice();

  return (
    <>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      <button
        type="button"
        id="accessibility-fab"
        aria-label={t.a11y.fabLabel}
        aria-pressed={voiceMode}
        onClick={toggleVoiceMode}
        className={`cloud-shadow fixed right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105 focus:ring-4 focus:outline-none bottom-24 md:bottom-10 ${
          voiceMode
            ? "voice-pulse bg-secondary text-on-secondary focus:ring-secondary"
            : "bg-secondary-container text-on-secondary-container focus:ring-secondary"
        }`}
      >
        <Icon name={listening || speaking ? "graphic_eq" : "mic"} className="text-3xl" filled />
        {voiceMode && (
          <span
            id="voice-active-indicator"
            className="absolute top-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"
            aria-hidden
          />
        )}
      </button>
      {voiceMode && (
        <div className="fixed right-6 bottom-44 z-50 max-w-[220px] rounded-2xl bg-inverse-surface px-3 py-2 font-label-sm text-label-sm text-inverse-on-surface shadow-lg md:bottom-28">
          {listening ? t.a11y.listening : speaking ? t.a11y.readPage : t.a11y.voiceMode}
        </div>
      )}
    </>
  );
}
