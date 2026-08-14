"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { TeacherTeachSchedule } from "@/components/TeacherTeachSchedule";
import { usePageScript } from "@/lib/a11y";
import { assets } from "@/lib/assets";
import { useAuth } from "@/lib/auth";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";

type Activity = {
  id: string;
  title: string;
  type: "study" | "exam" | "deadline";
  done: boolean;
};

export default function DashboardPage() {
  const { t } = useI18n();
  const { isLoggedIn, isTeacher, openLogin, requireAuth } = useAuth();
  const { triggerSave, status } = useAutosave();
  usePageScript(
    isTeacher
      ? `${t.dashboard.pageSummary}. ${t.dash.teachScheduleTitle}. ${t.dash.teachScheduleSub}`
      : t.dashboard.pageSummary,
    true,
  );

  const [activities, setActivities] = useState<Activity[]>([
    { id: "a1", title: t.dash.act1, type: "study", done: false },
    { id: "a2", title: t.dash.act2, type: "exam", done: false },
    { id: "a3", title: t.dash.act3, type: "deadline", done: false },
  ]);

  const doneCount = activities.filter((a) => a.done).length;

  const toggle = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)),
    );
    triggerSave();
  };

  const addActivity = () => {
    if (!requireAuth("/")) return;
    setActivities((prev) => [
      ...prev,
      {
        id: `n-${Date.now()}`,
        title: t.dash.newActivity,
        type: "study",
        done: false,
      },
    ]);
    triggerSave();
  };

  const typeLabel = {
    study: t.dash.typeStudy,
    exam: t.dash.typeExam,
    deadline: t.dash.typeDeadline,
  };
  const typeClass = {
    study: "bg-primary-fixed text-on-primary-fixed-variant",
    exam: "bg-secondary-fixed text-on-secondary-fixed-variant",
    deadline: "bg-error-container text-on-error-container",
  };

  return (
    <AppShell>
      <PageMain>
        {/* Welcome banner */}
        <section className="hero-shine fade-up relative mb-6 overflow-hidden rounded-[1.75rem] p-5 text-white shadow-[0_20px_50px_-24px_rgba(0,88,190,0.55)] sm:mb-8 sm:rounded-[2.25rem] sm:p-8 md:p-10">
          <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 font-label-md text-label-md text-white/90 backdrop-blur-sm">
                {t.dash.todayQuestion}
              </p>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:text-headline-lg mb-3 drop-shadow-sm">
                {t.dashboard.greeting}
              </h1>
              <p className="mb-6 max-w-xl text-white/90">{t.dash.aiTip}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/classroom"
                  onClick={(e) => {
                    if (!requireAuth("/classroom")) e.preventDefault();
                  }}
                  className="btn-cute inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-label-md text-label-md text-primary"
                >
                  <Icon name="groups" /> {t.navExtra.classroom}
                </Link>
                {isTeacher ? (
                  <Link
                    href="/teacher/copilot"
                    onClick={(e) => {
                      if (!requireAuth("/teacher/copilot")) e.preventDefault();
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/15 px-5 py-3 font-label-md text-label-md text-white backdrop-blur-sm transition hover:bg-white/25"
                  >
                    <Icon name="psychology" /> {t.navExtra.copilot}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/tutor"
                      onClick={(e) => {
                        if (!requireAuth("/tutor")) e.preventDefault();
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/15 px-5 py-3 font-label-md text-label-md text-white backdrop-blur-sm transition hover:bg-white/25 low-bw:backdrop-blur-none"
                    >
                      <Icon name="photo_camera" /> {t.dash.ctaTutor}
                    </Link>
                    <Link
                      href="/plan"
                      onClick={(e) => {
                        if (!requireAuth("/plan")) e.preventDefault();
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/15 px-5 py-3 font-label-md text-label-md text-white transition hover:bg-white/25"
                    >
                      <Icon name="school" /> {t.dash.ctaPlan}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <Image
              src={assets.logo}
              alt={t.brand}
              width={280}
              height={180}
              priority
              className="brand-hero-img mx-auto h-28 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)] sm:h-36 lg:mx-0 lg:h-44"
            />
          </div>
        </section>

        {status !== "idle" && (
          <p className="mb-4 font-label-sm text-label-sm text-tertiary">
            {status === "saving" ? t.platform.saving : t.platform.saved}
          </p>
        )}

        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            {
              icon: "local_fire_department",
              value: "7",
              label: t.dashboard.streak,
              sub: t.dash.streakBest,
              color: "border-orange-400",
              bg: "bg-orange-50 text-orange-600",
            },
            {
              icon: "schedule",
              value: "3h 45m",
              label: t.dashboard.weeklyTime,
              sub: t.dash.weeklyGoal,
              color: "border-primary",
              bg: "bg-primary-fixed text-primary",
            },
            {
              icon: "task_alt",
              value: String(18 + doneCount),
              label: t.dashboard.completed,
              sub: t.dash.vsLastWeek,
              color: "border-tertiary",
              bg: "bg-tertiary-fixed text-tertiary",
            },
            {
              icon: "flag",
              value: "68%",
              label: t.dashboard.readiness,
              sub: t.dash.readinessUp,
              color: "border-sky-400",
              bg: "bg-sky-50 text-sky-600",
            },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`card-lift cloud-shadow fade-up fade-up-delay-${Math.min(i + 1, 3)} rounded-[1.35rem] border border-white/80 border-t-4 bg-white/95 p-5 ${s.color}`}
            >
              <div className={`mb-3 inline-flex rounded-full p-2 ${s.bg}`}>
                <Icon name={s.icon} filled />
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">{s.value}</div>
              <div className="font-label-md text-label-md text-on-surface">{s.label}</div>
              <div className="mt-1 font-label-sm text-[11px] text-on-surface-variant">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Schedule — teacher timetable vs student activities */}
        {isTeacher ? (
          <TeacherTeachSchedule />
        ) : (
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {t.dash.scheduleTitle}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t.dash.scheduleSub}
              </p>
            </div>
            <button
              type="button"
              onClick={addActivity}
              className="btn-cute inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 font-label-md text-label-md text-on-primary"
            >
              <Icon name="add" /> {t.platform.addActivity}
            </button>
          </div>

          {!isLoggedIn && (
            <p className="mb-3 rounded-2xl bg-secondary-fixed/40 px-4 py-3 font-label-md text-on-secondary-fixed-variant">
              {t.platform.toolsLocked}{" "}
              <button type="button" className="underline" onClick={() => openLogin()}>
                {t.platform.login}
              </button>
            </p>
          )}

          <div className="space-y-3">
            {activities.map((a) => (
              <div
                key={a.id}
                className="card-lift cloud-shadow flex items-center gap-4 rounded-[1.35rem] border border-white/80 bg-white/95 p-4 md:p-5"
              >
                <button
                  type="button"
                  aria-pressed={a.done}
                  onClick={() => toggle(a.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    a.done
                      ? "border-tertiary bg-tertiary text-white"
                      : "border-outline-variant text-transparent hover:border-primary"
                  }`}
                >
                  <Icon name="check" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-label-sm text-[11px] ${typeClass[a.type]}`}
                    >
                      {typeLabel[a.type]}
                    </span>
                    <Icon name="notifications_active" className="text-sm text-on-surface-variant" />
                  </div>
                  <p
                    className={`font-body-lg text-[16px] font-semibold ${
                      a.done ? "text-on-surface-variant line-through" : "text-on-surface"
                    }`}
                  >
                    {a.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        <p className="mt-8 font-label-sm text-label-sm text-on-surface-variant">
          {t.platform.xpHint}
        </p>
      </PageMain>
    </AppShell>
  );
}
