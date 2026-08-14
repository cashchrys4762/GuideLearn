"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { TeacherCopilotPanel } from "@/components/TeacherCopilotPanel";
import { usePageScript } from "@/lib/a11y";
import { useAuth } from "@/lib/auth";
import { buildCopilotInsights, useClassrooms } from "@/lib/classroom";
import { useI18n } from "@/lib/i18n";

export default function TeacherCopilotPage() {
  const { t, locale } = useI18n();
  const { user, isTeacher } = useAuth();
  const { myTeaching } = useClassrooms();
  const [focusStudentId, setFocusStudentId] = useState<string | null>(null);

  const classes = useMemo(
    () => (user ? myTeaching(user.id) : []),
    [user, myTeaching],
  );
  const insights = useMemo(() => buildCopilotInsights(classes), [classes]);
  const clearFocus = useCallback(() => setFocusStudentId(null), []);

  usePageScript(
    `${t.classroom.copilotTitle}. ${locale === "th" ? insights.summaryTh : insights.summaryEn}`,
    true,
  );

  return (
    <AppShell>
      <RequireAuth>
        <PageMain>
          {!isTeacher ? (
            <p className="rounded-2xl bg-error-container p-4 text-on-error-container">
              {t.classroom.teacherOnly}
            </p>
          ) : (
            <>
              <header className="mb-6 max-w-3xl sm:mb-8">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-sm font-semibold text-on-primary-fixed-variant">
                  <Icon name="psychology" /> Teacher Co-pilot
                </div>
                <h1 className="mb-2 text-2xl font-bold text-primary sm:text-3xl">
                  {t.classroom.copilotTitle}
                </h1>
                <p className="text-on-surface-variant">{t.classroom.copilotBody}</p>
              </header>

              <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-4">
                {[
                  { label: t.classroom.title, value: insights.classCount },
                  { label: t.classroom.members, value: insights.studentCount },
                  { label: t.classroom.assignments, value: insights.totalAssignments },
                  { label: t.classroom.turnInRate, value: `${insights.turnInRate}%` },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="card-lift cloud-shadow rounded-[20px] border border-white/80 bg-white p-4"
                  >
                    <div className="text-xs text-on-surface-variant">{s.label}</div>
                    <div className="mt-1 text-2xl font-bold text-primary">{s.value}</div>
                  </div>
                ))}
              </div>

              <section className="mb-8 rounded-[24px] bg-primary p-5 text-on-primary shadow-[0_14px_32px_-16px_rgba(30,79,158,0.5)] sm:p-6">
                <h2 className="mb-2 text-lg font-bold text-on-primary">{t.classroom.advise}</h2>
                <p className="text-base leading-relaxed text-on-primary/95">
                  {locale === "th" ? insights.summaryTh : insights.summaryEn}
                </p>
              </section>

              {(insights.atRisk.length > 0 || insights.thriving.length > 0) && (
                <div className="mb-8 grid gap-6 lg:grid-cols-2">
                  <section className="rounded-[20px] border border-outline-variant bg-white p-5">
                    <h2 className="mb-4 text-lg font-bold text-error">{t.classroom.copilotAtRisk}</h2>
                    {insights.atRisk.length === 0 ? (
                      <p className="text-sm text-on-surface-variant">—</p>
                    ) : (
                      <ul className="space-y-3">
                        {insights.atRisk.slice(0, 5).map((s) => (
                          <li key={s.id}>
                            <button
                              type="button"
                              onClick={() => setFocusStudentId(s.id)}
                              className="w-full rounded-xl bg-error-container/40 px-3 py-3 text-left text-sm transition hover:bg-error-container/60"
                            >
                              <div className="font-semibold">{s.name}</div>
                              <div className="text-xs text-on-surface-variant">
                                {s.classes.join(", ")} · ส่งงาน {s.progress}% · ค้าง {s.missing}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                  <section className="rounded-[20px] border border-outline-variant bg-white p-5">
                    <h2 className="mb-4 text-lg font-bold text-tertiary">
                      {t.classroom.copilotThriving}
                    </h2>
                    {insights.thriving.length === 0 ? (
                      <p className="text-sm text-on-surface-variant">—</p>
                    ) : (
                      <ul className="space-y-3">
                        {insights.thriving.slice(0, 5).map((s) => (
                          <li key={s.id}>
                            <button
                              type="button"
                              onClick={() => setFocusStudentId(s.id)}
                              className="w-full rounded-xl bg-tertiary-fixed/50 px-3 py-3 text-left text-sm transition hover:bg-tertiary-fixed/80"
                            >
                              <div className="font-semibold">{s.name}</div>
                              <div className="text-xs text-on-surface-variant">
                                {s.classes.join(", ")} · ส่งงาน {s.progress}%
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </div>
              )}

              <TeacherCopilotPanel
                classes={classes}
                focusStudentId={focusStudentId}
                onFocusHandled={clearFocus}
              />

              <div className="mt-8">
                <Link href="/classroom" className="text-sm font-semibold text-primary underline">
                  {t.classroom.openClass}
                </Link>
              </div>
            </>
          )}
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
