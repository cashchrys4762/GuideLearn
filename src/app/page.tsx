"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { usePageScript } from "@/lib/a11y";
import { assets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";

export default function DashboardPage() {
  const { t, locale } = useI18n();
  const [done, setDone] = useState<Record<string, boolean>>({});
  usePageScript(t.dashboard.pageSummary, true);

  const activities = useMemo(
    () => [
      {
        id: "calc",
        subject: t.dashboard.activities.calc.subject,
        subjectClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
        title: t.dashboard.activities.calc.title,
        due: t.dashboard.dueToday,
        time: `45 ${t.dashboard.mins}`,
      },
      {
        id: "essay",
        subject: t.dashboard.activities.essay.subject,
        subjectClass: "bg-primary-fixed text-on-primary-fixed-variant",
        title: t.dashboard.activities.essay.title,
        time: `30 ${t.dashboard.mins}`,
      },
      {
        id: "portfolio",
        subject: t.dashboard.activities.portfolio.subject,
        subjectClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
        title: t.dashboard.activities.portfolio.title,
        time: `15 ${t.dashboard.mins}`,
      },
    ],
    [t],
  );

  const stats = [
    {
      value: locale === "th" ? "7 วัน" : "7 Days",
      label: t.dashboard.streak,
      icon: "local_fire_department",
      border: "border-secondary-container",
      iconBg: "bg-secondary-fixed text-secondary-container",
      hover: "from-secondary-fixed/30",
    },
    {
      value: locale === "th" ? "3 ชม. 45 น." : "3h 45m",
      label: t.dashboard.weeklyTime,
      icon: "schedule",
      border: "border-primary",
      iconBg: "bg-primary-fixed text-primary",
      hover: "from-primary-fixed/30",
    },
    {
      value: locale === "th" ? "18 รายการ" : "18 Items",
      label: t.dashboard.completed,
      icon: "task_alt",
      border: "border-tertiary",
      iconBg: "bg-tertiary-fixed text-tertiary",
      hover: "from-tertiary-fixed/30",
    },
    {
      value: "68%",
      label: t.dashboard.readiness,
      icon: "flag",
      border: "border-tertiary-container",
      iconBg: "bg-tertiary-fixed-dim text-on-tertiary-fixed-variant",
      hover: "from-tertiary-fixed-dim/30",
    },
  ];

  return (
    <AppShell>
      <main
        className="mx-auto w-full max-w-[1400px] flex-1 p-container-margin pb-24 md:ml-64 md:p-10 md:pb-10"
        role="main"
      >
        <div className="cloud-shadow relative mb-10 flex flex-col items-center gap-8 overflow-hidden rounded-[2rem] border border-white bg-gradient-to-r from-primary-fixed to-secondary-fixed p-8 md:flex-row md:items-start md:p-12">
          <div className="z-10 flex-1 text-center md:text-left">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-on-primary-fixed-variant">
              {t.dashboard.greeting}
              {locale === "th" && (
                <span className="mt-1 block text-2xl font-normal opacity-70">
                  {t.dashboard.greetingEn}
                </span>
              )}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-lg opacity-90">
              {t.dashboard.bannerBody}
            </p>
            <Link
              href="/missions"
              className="mx-auto flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-md text-label-md text-on-primary shadow-[0_4px_0_0_rgba(0,0,0,0.1)] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)] focus:ring-4 focus:ring-primary-fixed focus:outline-none md:mx-0"
            >
              <Icon name="play_arrow" filled />
              {t.dashboard.startMission}
            </Link>
          </div>
          <div className="relative z-10 h-48 w-48 shrink-0 md:h-64 md:w-64" aria-hidden>
            <Image
              src={assets.tigerBounce}
              alt=""
              fill
              className="animate-bounce object-contain drop-shadow-xl"
              style={{ animationDuration: "3s" }}
              unoptimized
            />
            <div className="double-stack-shadow absolute -top-4 -left-8 rotate-[-5deg] rounded-2xl bg-gradient-to-br from-white to-background p-3">
              <Icon name="lightbulb" className="text-secondary-container text-3xl" />
            </div>
          </div>
          <div className="pointer-events-none absolute top-[-50px] right-[-50px] h-64 w-64 rounded-full bg-white opacity-20 blur-2xl" />
          <div className="pointer-events-none absolute bottom-[-50px] left-[-50px] h-48 w-48 rounded-full bg-primary-fixed-dim opacity-40 blur-xl" />
        </div>

        <div
          aria-label={t.dashboard.readiness}
          className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              tabIndex={0}
              aria-label={`${stat.value} ${stat.label}`}
              className={`cloud-shadow group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-t-8 bg-white p-6 text-center transition-transform duration-300 hover:scale-105 ${stat.border}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${stat.hover} to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
              />
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg}`}
                aria-hidden
              >
                <Icon name={stat.icon} className="text-2xl" filled />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{stat.value}</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <section aria-labelledby="upcoming-heading">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2
                id="upcoming-heading"
                className="font-headline-md text-headline-md text-on-surface"
              >
                {t.dashboard.upcoming}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t.dashboard.upcomingSub}
              </p>
            </div>
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 font-label-md text-label-md text-primary shadow-sm hover:underline focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {t.dashboard.viewAll}
            </button>
          </div>

          <div className="space-y-4" role="list">
            {activities.map((task) => {
              const checked = !!done[task.id];
              return (
                <div
                  key={task.id}
                  role="listitem"
                  className="cloud-shadow group flex items-center gap-4 rounded-[24px] bg-white p-4 transition-colors duration-200 hover:bg-surface-container-low md:gap-6 md:p-6"
                >
                  <button
                    type="button"
                    aria-pressed={checked}
                    aria-label={task.title}
                    onClick={() => setDone((prev) => ({ ...prev, [task.id]: !prev[task.id] }))}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-primary-fixed focus:outline-none ${
                      checked
                        ? "border-primary bg-primary-fixed text-primary"
                        : "border-outline-variant text-transparent hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Icon name="check" />
                  </button>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block rounded-full px-3 py-1 font-label-sm text-label-sm ${task.subjectClass}`}
                      >
                        {task.subject}
                      </span>
                      {"due" in task && task.due && (
                        <span className="text-error flex items-center gap-1 font-label-sm text-label-sm">
                          <Icon name="schedule" className="text-sm" /> {task.due}
                        </span>
                      )}
                    </div>
                    <h4
                      className={`font-body-lg text-body-lg text-on-surface font-semibold transition-colors group-hover:text-primary ${
                        checked ? "line-through opacity-60" : ""
                      }`}
                    >
                      {task.title}
                    </h4>
                  </div>
                  <div className="text-on-surface-variant hidden items-center gap-2 md:flex">
                    <Icon name="timer" className="text-sm" />
                    <span className="font-label-sm text-label-sm">{task.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
