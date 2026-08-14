"use client";

import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PageMain } from "@/components/PageMain";
import { usePageScript, useVoice } from "@/lib/a11y";
import { useBandwidth } from "@/lib/bandwidth";
import { useI18n } from "@/lib/i18n";
import { useTheme, type ThemeMode } from "@/lib/theme";

export default function SettingsPage() {
  const { t, locale } = useI18n();
  const { voiceMode, setVoiceMode, speak, listening } = useVoice();
  const { lowBandwidth, setLowBandwidth } = useBandwidth();
  const { theme, setTheme } = useTheme();
  usePageScript(
    `${t.settings.title}. ${t.settings.subtitle}. ${t.settings.theme}. ${t.settings.lowBandwidth}. ${t.voiceHelp}`,
    true,
  );

  const themes: Array<{ id: ThemeMode; label: string; icon: string }> = [
    { id: "light", label: t.settings.themeLight, icon: "light_mode" },
    { id: "dark", label: t.settings.themeDark, icon: "dark_mode" },
  ];

  return (
    <AppShell>
      <PageMain narrow>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary">
          {t.settings.title}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-10">
          {t.settings.subtitle}
        </p>

        <section className="cloud-shadow mb-6 rounded-[24px] bg-white p-6 md:p-8">
          <h2 className="font-headline-md text-[22px] text-on-surface mb-2">
            {t.settings.theme}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            {t.settings.themeHint}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((opt) => {
              const active = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    active
                      ? "border-primary bg-primary-fixed text-on-primary-fixed-variant"
                      : "border-outline-variant bg-surface-container-low text-on-surface"
                  }`}
                >
                  <Icon name={opt.icon} className="text-[22px]" />
                  <span className="font-semibold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="cloud-shadow mb-6 rounded-[24px] bg-white p-6 md:p-8">
          <h2 className="font-headline-md text-[22px] text-on-surface mb-2">
            {t.settings.language}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            {t.settings.languageHint}
          </p>
          <LanguageToggle />
          <p className="mt-3 font-label-sm text-label-sm text-on-surface-variant">
            {locale === "th" ? "กำลังใช้ภาษาไทย" : "Currently using English"}
          </p>
        </section>

        <section className="cloud-shadow mb-6 rounded-[24px] bg-white p-6 md:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-[22px] text-on-surface mb-2">
                {t.settings.voiceMode}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t.settings.voiceHint}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={voiceMode}
              onClick={() => setVoiceMode(!voiceMode)}
              className={`relative h-10 w-16 shrink-0 rounded-full transition-colors ${
                voiceMode ? "bg-primary" : "bg-surface-variant"
              }`}
            >
              <span
                className={`absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition-transform ${
                  voiceMode ? "translate-x-6" : ""
                }`}
              >
                <Icon name="mic" className="text-[18px] text-primary" />
              </span>
            </button>
          </div>
          {voiceMode && (
            <p className="mb-4 rounded-xl bg-secondary-fixed/40 px-4 py-3 font-label-md text-label-md text-on-secondary-fixed-variant">
              {listening ? t.a11y.listening : t.a11y.voiceOn}
            </p>
          )}
          <button
            type="button"
            onClick={() => speak(t.settings.testVoiceText)}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-label-md text-label-md text-on-primary"
          >
            <Icon name="volume_up" /> {t.settings.testVoice}
          </button>
        </section>

        <section className="cloud-shadow mb-6 rounded-[24px] bg-white p-6 md:p-8 low-bw:shadow-none">
          <div className="mb-2 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-[22px] text-on-surface mb-2">
                {t.settings.lowBandwidth}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t.settings.lowBandwidthHint}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={lowBandwidth}
              onClick={() => setLowBandwidth(!lowBandwidth)}
              className={`relative h-10 w-16 shrink-0 rounded-full transition-colors ${
                lowBandwidth ? "bg-primary" : "bg-surface-variant"
              }`}
            >
              <span
                className={`absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition-transform ${
                  lowBandwidth ? "translate-x-6" : ""
                }`}
              >
                <Icon name="speed" className="text-[18px] text-primary" />
              </span>
            </button>
          </div>
        </section>

        <section className="cloud-shadow rounded-[24px] bg-white p-6 md:p-8 low-bw:shadow-none">
          <h2 className="font-headline-md text-[22px] text-on-surface mb-3">
            {t.settings.commandsTitle}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap">
            {t.voiceHelp}
          </p>
          <ul className="mt-4 space-y-2 font-body-md text-body-md text-on-surface">
            {(locale === "th"
              ? [
                  "แดชบอร์ด / ภารกิจ / เพื่อนเรียน / การตั้งค่า",
                  "อ่านหน้า — อธิบายเนื้อหาทั้งหน้า",
                  "หยุด — หยุดพูด",
                  "ไทย / อังกฤษ — เปลี่ยนภาษา",
                  "ช่วยเหลือ — ฟังรายการคำสั่ง",
                ]
              : [
                  "dashboard / missions / study buddy / settings",
                  "read page — describe the whole screen",
                  "stop — stop speaking",
                  "Thai / English — switch language",
                  "help — list commands",
                ]
            ).map((line) => (
              <li key={line} className="flex items-start gap-2">
                <Icon name="mic" className="mt-0.5 text-primary text-[18px]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </PageMain>
    </AppShell>
  );
}
