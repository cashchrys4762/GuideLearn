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
          <h2 className="font-headline-md mb-2 text-[22px] text-on-surface">
            {t.settings.theme}
          </h2>
          <p className="font-body-md text-body-md mb-4 text-on-surface-variant">
            {t.settings.themeHint}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((opt) => {
              const active = theme === opt.id;
              const isDarkOpt = opt.id === "dark";
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  aria-pressed={active}
                  className={`flex flex-col overflow-hidden rounded-2xl border text-left transition ${
                    active
                      ? "border-primary ring-2 ring-primary/35"
                      : "border-outline-variant hover:border-primary/40"
                  }`}
                >
                  <div
                    className={`flex h-14 items-center justify-center ${
                      isDarkOpt
                        ? "bg-[#121a2b] text-[#7ba3f5]"
                        : "bg-[#f7f4ee] text-[#1e4f9e]"
                    }`}
                    aria-hidden
                  >
                    <Icon name={opt.icon} className="text-[28px]" />
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-2.5 ${
                      active
                        ? "bg-primary-fixed text-on-primary-fixed-variant"
                        : "bg-surface-container-low text-on-surface"
                    }`}
                  >
                    <Icon name={opt.icon} className="text-[18px]" />
                    <span className="font-semibold">{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="cloud-shadow mb-6 rounded-[24px] bg-white p-6 md:p-8">
          <h2 className="font-headline-md mb-2 text-[22px] text-on-surface">
            {t.settings.language}
          </h2>
          <p className="font-body-md text-body-md mb-4 text-on-surface-variant">
            {t.settings.languageHint}
          </p>
          <LanguageToggle />
          <p className="font-label-sm text-label-sm mt-3 text-on-surface-variant">
            {locale === "th" ? "กำลังใช้ภาษาไทย" : "Currently using English"}
          </p>
        </section>

        <section className="cloud-shadow mb-6 rounded-[24px] bg-white p-6 md:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-headline-md mb-2 text-[22px] text-on-surface">
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
                className={`switch-knob absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition-transform ${
                  voiceMode ? "translate-x-6" : ""
                }`}
              >
                <Icon name="mic" className="text-[18px] text-primary" />
              </span>
            </button>
          </div>
          {voiceMode && (
            <p className="font-label-md text-label-md mb-4 rounded-xl bg-secondary-fixed/40 px-4 py-3 text-on-secondary-fixed-variant">
              {listening ? t.a11y.listening : t.a11y.voiceOn}
            </p>
          )}
          <button
            type="button"
            onClick={() => speak(t.settings.testVoiceText)}
            className="font-label-md text-label-md flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-on-primary"
          >
            <Icon name="volume_up" /> {t.settings.testVoice}
          </button>
        </section>

        <section className="cloud-shadow mb-6 rounded-[24px] bg-white p-6 md:p-8 low-bw:shadow-none">
          <div className="mb-2 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-headline-md mb-2 text-[22px] text-on-surface">
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
                className={`switch-knob absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition-transform ${
                  lowBandwidth ? "translate-x-6" : ""
                }`}
              >
                <Icon name="speed" className="text-[18px] text-primary" />
              </span>
            </button>
          </div>
        </section>

        <section className="cloud-shadow rounded-[24px] bg-white p-6 md:p-8 low-bw:shadow-none">
          <h2 className="font-headline-md mb-3 text-[22px] text-on-surface">
            {t.settings.commandsTitle}
          </h2>
          <p className="font-body-md text-body-md whitespace-pre-wrap text-on-surface-variant">
            {t.voiceHelp}
          </p>
          <ul className="font-body-md text-body-md mt-4 space-y-2 text-on-surface">
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
                <Icon name="mic" className="mt-0.5 text-[18px] text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </PageMain>
    </AppShell>
  );
}
