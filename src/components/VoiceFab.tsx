"use client";

import { useVoice } from "@/lib/a11y";
import { useI18n } from "@/lib/i18n";
import { Icon } from "./Icon";

export function VoiceFab() {
  const { t } = useI18n();
  const { voiceMode, listening, speaking, toggleVoiceMode, announcement, lastHeard } =
    useVoice();

  const status = !voiceMode
    ? null
    : speaking
      ? t.a11y.readPage
      : listening
        ? lastHeard
          ? `${t.a11y.listening} “${lastHeard}”`
          : t.a11y.listening
        : t.a11y.voiceMode;

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
        className={`cloud-shadow safe-fab fixed right-[clamp(0.75rem,3vw,1.5rem)] z-50 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105 focus:ring-4 focus:outline-none sm:h-14 sm:w-14 lg:h-16 lg:w-16 bottom-[calc(var(--app-bottom-nav-h)+0.75rem)] lg:bottom-8 ${
          voiceMode
            ? "voice-pulse bg-secondary text-on-secondary focus:ring-secondary"
            : "bg-secondary-container text-on-secondary-container focus:ring-secondary"
        }`}
      >
        <Icon name={listening || speaking ? "graphic_eq" : "mic"} className="text-2xl sm:text-3xl" filled />
        {voiceMode && (
          <span
            className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
            aria-hidden
          />
        )}
      </button>
      {voiceMode && status && (
        <div className="safe-fab fixed right-[clamp(0.75rem,3vw,1.5rem)] bottom-[calc(var(--app-bottom-nav-h)+4.75rem)] z-50 max-w-[min(260px,72vw)] rounded-2xl bg-inverse-surface px-3 py-2 text-xs text-inverse-on-surface shadow-lg lg:bottom-28">
          <p className="font-semibold">{status}</p>
          {listening && !speaking && (
            <p className="mt-1 opacity-80">{t.a11y.helpCommands}</p>
          )}
        </div>
      )}
    </>
  );
}
