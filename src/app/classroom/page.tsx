"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript } from "@/lib/a11y";
import { useAuth } from "@/lib/auth";
import { useClassrooms } from "@/lib/classroom";
import { useI18n } from "@/lib/i18n";

export default function ClassroomHubPage() {
  const { t } = useI18n();
  const { user, isTeacher } = useAuth();
  const { createClass, myTeaching, myEnrolled, ready } = useClassrooms();
  usePageScript(`${t.classroom.title}. ${isTeacher ? t.classroom.bodyTeacher : t.classroom.bodyStudent}`, true);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const teaching = useMemo(
    () => (user ? myTeaching(user.id) : []),
    [user, myTeaching],
  );
  const enrolled = useMemo(
    () => (user ? myEnrolled(user.id) : []),
    [user, myEnrolled],
  );

  const onCreate = () => {
    if (!user) return;
    const cls = createClass({ name, subject, section, teacher: user });
    setShowCreate(false);
    setName("");
    setSubject("");
    setSection("");
    window.location.href = `/classroom/${cls.code}`;
  };

  return (
    <AppShell>
      <RequireAuth>
        <PageMain>
          <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:text-headline-lg mb-2 text-primary">
                {t.classroom.title}
              </h1>
              <p className="max-w-2xl text-on-surface-variant">
                {isTeacher ? t.classroom.bodyTeacher : t.classroom.bodyStudent}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {isTeacher ? (
                <button
                  type="button"
                  onClick={() => setShowCreate((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary"
                >
                  <Icon name="add" /> {t.classroom.create}
                </button>
              ) : (
                <Link
                  href="/classroom/join"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary"
                >
                  <Icon name="login" /> {t.classroom.join}
                </Link>
              )}
              {isTeacher && (
                <Link
                  href="/teacher/copilot"
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-white px-4 py-2.5 text-sm font-semibold text-primary"
                >
                  <Icon name="psychology" /> {t.navExtra.copilot}
                </Link>
              )}
            </div>
          </header>

          {isTeacher && showCreate && (
            <section className="mb-8 rounded-[24px] border border-outline-variant bg-white p-5 sm:p-6">
              <h2 className="mb-4 text-lg font-bold text-on-surface">{t.classroom.create}</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="block sm:col-span-1">
                  <span className="text-xs text-on-surface-variant">{t.classroom.className}</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-3 py-2.5 outline-none focus:border-primary"
                    placeholder="คณิตศาสตร์ ม.6"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-on-surface-variant">{t.classroom.subject}</span>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-3 py-2.5 outline-none focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-on-surface-variant">{t.classroom.section}</span>
                  <input
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-3 py-2.5 outline-none focus:border-primary"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={onCreate}
                className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary"
              >
                {t.classroom.create}
              </button>
            </section>
          )}

          {!ready ? (
            <p className="text-on-surface-variant">…</p>
          ) : isTeacher ? (
            teaching.length === 0 ? (
              <p className="rounded-2xl bg-surface-container p-6 text-on-surface-variant">
                {t.classroom.emptyTeacher}
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {teaching.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/classroom/${c.code}`}
                      className="block rounded-[20px] border border-outline-variant bg-white p-5 transition hover:border-primary"
                    >
                      <div className="mb-1 text-xs font-semibold tracking-wide text-primary uppercase">
                        {c.subject}
                      </div>
                      <h3 className="text-lg font-bold text-on-surface">{c.name}</h3>
                      <p className="text-sm text-on-surface-variant">{c.section}</p>
                      <p className="mt-3 font-mono text-sm text-tertiary">
                        {t.classroom.joinCode}: {c.code}
                      </p>
                      <p className="mt-1 text-xs text-on-surface-variant">
                        {c.members.length} {t.classroom.members} · {c.assignments.length}{" "}
                        {t.classroom.assignments}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )
          ) : enrolled.length === 0 ? (
            <div className="rounded-2xl bg-surface-container p-6">
              <p className="mb-3 text-on-surface-variant">{t.classroom.emptyStudent}</p>
              <p className="mb-4 text-sm text-tertiary">{t.classroom.demoCode}</p>
              <Link
                href="/classroom/join?code=KLM4NP"
                className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
              >
                {t.classroom.join}
              </Link>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {enrolled.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/classroom/${c.code}`}
                    className="block rounded-[20px] border border-outline-variant bg-white p-5 transition hover:border-primary"
                  >
                    <div className="mb-1 text-xs font-semibold text-primary">{c.subject}</div>
                    <h3 className="text-lg font-bold">{c.name}</h3>
                    <p className="text-sm text-on-surface-variant">{c.teacherName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
