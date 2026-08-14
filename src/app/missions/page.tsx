"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { usePageScript, useVoice } from "@/lib/a11y";
import { assets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";

export default function MissionsPage() {
  const { t } = useI18n();
  const { speak } = useVoice();
  usePageScript(t.missions.pageSummary, true);

  const requirementDefs = useMemo(
    () => [
      { id: "transcripts", label: t.missions.req.transcripts, done: true },
      { id: "essay", label: t.missions.req.essay, done: true },
      { id: "mock-exam", label: t.missions.req.mockExam, done: false, urgent: true },
      { id: "letters", label: t.missions.req.letters, done: false },
      { id: "portfolio", label: t.missions.req.portfolio, done: true },
    ],
    [t],
  );

  const [doneMap, setDoneMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(requirementDefs.map((r) => [r.id, r.done])),
  );

  const requirements = requirementDefs.map((r) => ({
    ...r,
    done: doneMap[r.id] ?? r.done,
  }));
  const doneCount = requirements.filter((r) => r.done).length;

  const toggleRequirement = (id: string, label: string) => {
    setDoneMap((prev) => {
      const next = !(prev[id] ?? false);
      speak(next ? `${label}. ✓` : label);
      return { ...prev, [id]: next };
    });
  };

  const deadlineSummary = [
    `${t.missions.timeline.t1Date}. ${t.missions.timeline.t1Title}. ${t.missions.timeline.t1Desc}`,
    `${t.missions.timeline.t2Date}. ${t.missions.timeline.t2Title}. ${t.missions.timeline.t2Desc}`,
    `${t.missions.timeline.t3Date}. ${t.missions.timeline.t3Title}. ${t.missions.timeline.t3Desc}`,
  ].join(" ");

  return (
    <AppShell>
      <main
        className="w-full flex-1 px-container-margin pt-6 pb-32 md:ml-64 md:px-12 md:pt-12 md:pb-12"
        id="main-content"
        role="main"
      >
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 text-on-secondary-fixed">
              <Icon name="star" filled className="text-sm" />
              <span className="font-label-sm text-label-sm tracking-wider uppercase">
                {t.missions.targetGoal}
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary">
              {t.missions.faculty}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-2">
              <Icon name="school" />
              {t.missions.university}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="cloud-shadow relative h-32 w-full shrink-0 overflow-hidden rounded-[2rem] md:h-40 md:w-64">
              <Image
                src={assets.mountainPath}
                alt={t.missions.targetGoal}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
          </div>
        </div>

        <section className="mb-section-gap" aria-labelledby="admission-rounds-heading">
          <h2
            id="admission-rounds-heading"
            className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-3"
          >
            <Icon name="flag" filled className="text-primary" />
            {t.missions.admissionRounds}
          </h2>
          <div className="grid grid-cols-1 gap-base md:grid-cols-3 md:gap-gutter" role="list">
            {[
              {
                title: t.missions.portfolio,
                desc: t.missions.portfolioDesc,
                progress: 100,
                badge: `${t.missions.round} 1`,
                icon: "draw",
                bar: "bg-secondary-container",
                iconBg: "bg-secondary-fixed text-on-secondary-fixed",
                pctClass: "text-secondary-container",
              },
              {
                title: t.missions.quota,
                desc: t.missions.quotaDesc,
                progress: 45,
                badge: t.missions.current,
                icon: "menu_book",
                bar: "bg-primary-container",
                iconBg: "bg-primary-fixed text-on-primary-fixed",
                pctClass: "text-primary-container",
                current: true,
              },
              {
                title: t.missions.admission,
                desc: t.missions.admissionDesc,
                progress: 0,
                badge: `${t.missions.round} 3`,
                icon: "how_to_reg",
                bar: "bg-tertiary-container",
                iconBg: "bg-surface-variant text-on-surface-variant",
                pctClass: "text-tertiary-container",
                locked: true,
              },
            ].map((card) => (
              <div
                key={card.title}
                role="listitem"
                aria-label={`${card.title}, ${card.progress}%`}
                className={`cloud-shadow group relative overflow-hidden rounded-[24px] bg-surface-container-lowest transition-transform duration-300 hover:-translate-y-1 ${
                  card.current ? "border-2 border-primary" : ""
                } ${card.locked ? "opacity-70" : ""}`}
              >
                <div className={`h-2 w-full ${card.bar}`} />
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconBg}`}
                    >
                      <Icon name={card.icon} filled />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 font-label-sm text-label-sm ${
                        card.current
                          ? "bg-primary-container text-on-primary-container shadow-sm"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-background mb-1">
                    {card.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    {card.desc}
                  </p>
                  <div className="space-y-2" aria-hidden>
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant">
                        {card.locked ? t.missions.locked : t.missions.progress}
                      </span>
                      <span className={card.pctClass}>{card.progress}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container">
                      <div
                        className={`relative h-full rounded-full ${card.bar}`}
                        style={{ width: `${card.progress}%` }}
                      >
                        {card.current && (
                          <div className="absolute top-0 right-0 bottom-0 w-3 animate-pulse rounded-full bg-white/30" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-section-gap grid grid-cols-1 gap-gutter lg:grid-cols-2">
          <section
            className="cloud-shadow relative overflow-hidden rounded-[24px] bg-surface-container-lowest p-6 md:p-8"
            aria-labelledby="checklist-heading"
          >
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-tertiary-fixed/30 mix-blend-multiply blur-2xl" />
            <div className="relative z-10 mb-6 flex items-center justify-between">
              <h2
                id="checklist-heading"
                className="font-headline-md text-headline-md text-on-background flex items-center gap-3"
              >
                <Icon name="task_alt" filled className="text-tertiary" />
                {t.missions.requirements}
              </h2>
              <span className="rounded-full bg-tertiary-fixed px-3 py-1 font-label-sm text-label-sm text-on-tertiary-fixed">
                {t.missions.doneOf
                  .replace("{done}", String(doneCount))
                  .replace("{total}", String(requirements.length))}
              </span>
            </div>
            <div className="relative z-10 space-y-3" role="list">
              {requirements.map((item) => (
                <label
                  key={item.id}
                  role="listitem"
                  className={`kawaii-checkbox flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                    item.urgent && !item.done
                      ? "border-primary-fixed bg-primary-fixed/30 hover:bg-primary-fixed/50"
                      : "border-surface-container-high bg-surface hover:bg-surface-container"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={item.done}
                    aria-label={item.label}
                    onChange={() => toggleRequirement(item.id, item.label)}
                  />
                  <div
                    aria-hidden
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-surface-container-lowest transition-colors ${
                      item.urgent && !item.done ? "border-primary" : "border-outline-variant"
                    }`}
                  >
                    <Icon
                      name="check"
                      className="text-on-primary-container text-sm scale-50 opacity-0 transition-all duration-200"
                    />
                  </div>
                  <span
                    className={`font-body-md text-body-md text-on-background flex-1 ${
                      item.done ? "line-through opacity-60" : item.urgent ? "font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.urgent && !item.done && (
                    <span className="rounded-md bg-error-container px-2 py-1 font-label-sm text-label-sm text-on-error-container">
                      {t.missions.urgent}
                    </span>
                  )}
                </label>
              ))}
            </div>
            <button
              type="button"
              className="chunky-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-surface-variant px-6 py-4 font-label-md text-label-md text-on-surface-variant hover:bg-surface-dim"
            >
              <Icon name="add" /> {t.missions.addTask}
            </button>
          </section>

          <section
            className="cloud-shadow-lg rounded-[24px] bg-surface-container-lowest p-6 md:p-8"
            aria-labelledby="timeline-heading"
          >
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <h2
                id="timeline-heading"
                className="font-headline-md text-headline-md text-on-background flex items-center gap-3"
              >
                <Icon name="calendar_month" filled className="text-secondary-container" />
                {t.missions.deadlines}
              </h2>
              <button
                type="button"
                onClick={() => speak(deadlineSummary)}
                className="group flex items-center gap-2 rounded-full bg-primary-fixed/30 px-4 py-2 text-primary transition-colors hover:bg-primary-fixed/50"
              >
                <Icon name="record_voice_over" className="text-sm text-primary" />
                <span className="font-label-sm text-label-sm text-primary">
                  {t.missions.readDeadlines}
                </span>
              </button>
            </div>
            <div className="relative space-y-8 pl-6" role="list">
              <div className="absolute top-2 bottom-6 left-10 w-[4px] rounded-full bg-surface-container" />
              <div className="absolute top-2 left-10 h-1/3 w-[4px] rounded-full bg-secondary-container" />

              <div className="relative flex items-start gap-6" role="listitem">
                <div className="z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-secondary-container shadow-sm">
                  <Icon name="check" className="text-[16px] text-white" />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm mb-1 block text-secondary-container">
                    {t.missions.timeline.t1Date}
                  </span>
                  <h4 className="font-headline-md text-body-lg text-on-background mb-1">
                    {t.missions.timeline.t1Title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {t.missions.timeline.t1Desc}
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6" role="listitem">
                <div className="ring-primary-fixed z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary shadow-sm ring-4">
                  <Icon name="priority_high" className="animate-pulse text-[16px] text-white" />
                </div>
                <div className="w-full rounded-2xl border border-primary-fixed/50 bg-primary-fixed/20 p-4">
                  <span className="font-label-sm text-label-sm mb-1 block text-primary">
                    {t.missions.timeline.t2Date}
                  </span>
                  <h4 className="font-headline-md text-body-lg text-on-background mb-1">
                    {t.missions.timeline.t2Title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {t.missions.timeline.t2Desc}
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6 opacity-60" role="listitem">
                <div className="z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-surface-container-high shadow-sm" />
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mb-1 block">
                    {t.missions.timeline.t3Date}
                  </span>
                  <h4 className="font-headline-md text-body-lg text-on-background mb-1">
                    {t.missions.timeline.t3Title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {t.missions.timeline.t3Desc}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
