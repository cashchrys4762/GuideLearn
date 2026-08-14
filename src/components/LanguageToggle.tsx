"use client";

import { useI18n } from "@/lib/i18n";

type Props = {
  size?: "sm" | "md";
  className?: string;
};

export function LanguageToggle({ size = "md", className = "" }: Props) {
  const { locale, setLocale, t } = useI18n();
  const pad = size === "sm" ? "px-2 py-0.5" : "px-3 py-1";

  return (
    <div
      role="group"
      aria-label={t.lang.switchTo}
      className={`flex gap-1 rounded-full bg-surface-variant p-1 ${className}`}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        aria-label="English"
        onClick={() => setLocale("en")}
        className={`${pad} rounded-full font-label-sm text-label-sm transition-all ${
          locale === "en"
            ? "lang-pill-active bg-white text-on-surface shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container-high"
        }`}
      >
        {t.lang.en}
      </button>
      <button
        type="button"
        aria-pressed={locale === "th"}
        aria-label="ไทย"
        onClick={() => setLocale("th")}
        className={`${pad} rounded-full font-label-sm text-label-sm transition-all ${
          locale === "th"
            ? "lang-pill-active bg-white text-on-surface shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container-high"
        }`}
      >
        {t.lang.th}
      </button>
    </div>
  );
}
