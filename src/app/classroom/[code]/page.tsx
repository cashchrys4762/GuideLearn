"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript } from "@/lib/a11y";
import { useAuth } from "@/lib/auth";
import { useClassrooms } from "@/lib/classroom";
import { useI18n } from "@/lib/i18n";

export default function ClassDetailPage() {
  const params = useParams<{ code: string }>();
  const code = String(params.code || "");
  const { t, locale } = useI18n();
  const { user, isTeacher } = useAuth();
  const {
    getByCode,
    joinUrl,
    addMaterial,
    addAssignment,
    submitWork,
  } = useClassrooms();

  const classroom = getByCode(code);
  const isOwner = !!(user && classroom && classroom.teacherId === user.id);
  const isMember = !!(
    user &&
    classroom &&
    (classroom.teacherId === user.id || classroom.members.some((m) => m.id === user.id))
  );

  usePageScript(
    classroom
      ? `${classroom.name}. ${classroom.subject}. ${t.classroom.assignments}`
      : t.classroom.notFound,
    true,
  );

  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  const [matTitle, setMatTitle] = useState("");
  const [matUrl, setMatUrl] = useState("");
  const [matType, setMatType] = useState<"file" | "link">("link");
  const [workTitle, setWorkTitle] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const link = useMemo(() => (classroom ? joinUrl(classroom.code) : ""), [classroom, joinUrl]);

  const copy = async (kind: "code" | "link") => {
    if (!classroom) return;
    const text = kind === "code" ? classroom.code : link;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  const statusLabel = (s: string) =>
    s === "turned_in"
      ? t.classroom.statusTurnedIn
      : s === "returned"
        ? t.classroom.statusReturned
        : t.classroom.statusAssigned;

  if (!classroom) {
    return (
      <AppShell>
        <RequireAuth>
          <PageMain narrow>
            <p className="text-error">{t.classroom.notFound}</p>
            <Link href="/classroom" className="mt-4 inline-block text-primary underline">
              {t.classroom.title}
            </Link>
          </PageMain>
        </RequireAuth>
      </AppShell>
    );
  }

  if (user && !isMember && !isOwner) {
    return (
      <AppShell>
        <RequireAuth>
          <PageMain narrow>
            <h1 className="mb-2 text-2xl font-bold">{classroom.name}</h1>
            <p className="mb-4 text-on-surface-variant">
              {classroom.teacherName} · {classroom.code}
            </p>
            <Link
              href={`/classroom/join?code=${classroom.code}`}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
            >
              {t.classroom.join}
            </Link>
          </PageMain>
        </RequireAuth>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <RequireAuth>
        <PageMain>
          <header className="mb-6 border-b border-surface-dim pb-5">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              {classroom.subject}
              {classroom.section ? ` · ${classroom.section}` : ""}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-on-surface sm:text-3xl">{classroom.name}</h1>
            <p className="text-sm text-on-surface-variant">{classroom.teacherName}</p>

            {isOwner && (
              <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-surface-container p-4 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="font-mono text-lg font-bold tracking-widest text-primary">
                  {classroom.code}
                </div>
                <button
                  type="button"
                  onClick={() => void copy("code")}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold"
                >
                  {copied === "code" ? t.classroom.copied : t.classroom.copyCode}
                </button>
                <button
                  type="button"
                  onClick={() => void copy("link")}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold"
                >
                  {copied === "link" ? t.classroom.copied : t.classroom.copyLink}
                </button>
                <span className="truncate text-xs text-on-surface-variant sm:max-w-xs">{link}</span>
              </div>
            )}
          </header>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold">{t.classroom.assignments}</h2>
              </div>

              {isOwner && (
                <div className="mb-6 space-y-3 rounded-[20px] border border-dashed border-outline-variant bg-white p-4">
                  <h3 className="font-semibold">{t.classroom.addWork}</h3>
                  <input
                    value={workTitle}
                    onChange={(e) => setWorkTitle(e.target.value)}
                    placeholder={t.classroom.workTitle}
                    className="w-full rounded-xl border border-outline-variant px-3 py-2 outline-none focus:border-primary"
                  />
                  <textarea
                    value={workDesc}
                    onChange={(e) => setWorkDesc(e.target.value)}
                    placeholder={t.classroom.workDesc}
                    rows={3}
                    className="w-full rounded-xl border border-outline-variant px-3 py-2 outline-none focus:border-primary"
                  />
                  <label className="block text-xs text-on-surface-variant">
                    {t.classroom.dueDate}
                    <input
                      type="date"
                      value={dueAt}
                      onChange={(e) => setDueAt(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      addAssignment(classroom.id, {
                        title: workTitle,
                        description: workDesc,
                        dueAt: dueAt
                          ? new Date(dueAt).toISOString()
                          : new Date(Date.now() + 7 * 86400000).toISOString(),
                      });
                      setWorkTitle("");
                      setWorkDesc("");
                      setDueAt("");
                    }}
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
                  >
                    {t.classroom.addWork}
                  </button>
                </div>
              )}

              <ul className="space-y-4">
                {classroom.assignments.map((a) => {
                  const mine = user
                    ? a.submissions.find((s) => s.studentId === user.id)
                    : undefined;
                  const turned = a.submissions.filter((s) => s.status !== "assigned").length;
                  return (
                    <li
                      key={a.id}
                      className="rounded-[20px] border border-outline-variant bg-white p-4 sm:p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold sm:text-lg">{a.title}</h3>
                          <p className="mt-1 text-sm text-on-surface-variant">{a.description}</p>
                          <p className="mt-2 text-xs text-on-surface-variant">
                            {t.classroom.dueDate}:{" "}
                            {new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
                              dateStyle: "medium",
                            }).format(new Date(a.dueAt))}
                          </p>
                        </div>
                        {isOwner && (
                          <span className="rounded-full bg-surface-container px-2.5 py-1 text-xs font-semibold">
                            {turned}/{a.submissions.length}
                          </span>
                        )}
                      </div>

                      {isOwner ? (
                        <div className="mt-4 space-y-2 border-t border-surface-dim pt-3">
                          <p className="text-sm font-semibold">{t.classroom.studentWork}</p>
                          {a.submissions.length === 0 && (
                            <p className="text-sm text-on-surface-variant">{t.classroom.noSubmissions}</p>
                          )}
                          {a.submissions.map((s) => (
                            <Link
                              key={s.studentId}
                              href={`/classroom/${classroom.code}/work/${a.id}?student=${s.studentId}`}
                              className="flex items-center justify-between gap-2 rounded-xl bg-surface-container-low px-3 py-2 text-sm hover:bg-surface-container"
                            >
                              <span>{s.studentName}</span>
                              <span className="text-xs font-semibold text-primary">
                                {statusLabel(s.status)}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-4 space-y-2 border-t border-surface-dim pt-3">
                          <p className="text-sm font-semibold">
                            {t.classroom.yourWork}
                            {mine ? ` · ${statusLabel(mine.status)}` : ""}
                          </p>
                          {mine?.feedback && (
                            <p className="rounded-xl bg-tertiary-fixed/50 px-3 py-2 text-sm">
                              {t.classroom.feedback}: {mine.feedback}
                              {typeof mine.score === "number" ? ` · ${mine.score}` : ""}
                            </p>
                          )}
                          <textarea
                            value={drafts[a.id] ?? mine?.text ?? ""}
                            onChange={(e) =>
                              setDrafts((d) => ({ ...d, [a.id]: e.target.value }))
                            }
                            rows={3}
                            className="w-full rounded-xl border border-outline-variant px-3 py-2 text-sm outline-none focus:border-primary"
                            placeholder={t.classroom.yourWork}
                          />
                          <button
                            type="button"
                            disabled={!user}
                            onClick={() => {
                              if (!user) return;
                              submitWork(
                                classroom.id,
                                a.id,
                                user,
                                drafts[a.id] ?? mine?.text ?? "",
                              );
                            }}
                            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
                          >
                            {t.classroom.submit}
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <aside className="space-y-6">
              <section className="rounded-[20px] border border-outline-variant bg-white p-4 sm:p-5">
                <h2 className="mb-3 text-lg font-bold">{t.classroom.materials}</h2>
                {isOwner && (
                  <div className="mb-4 space-y-2 rounded-xl bg-surface-container-low p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMatType("link")}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          matType === "link" ? "bg-primary text-white" : "bg-white"
                        }`}
                      >
                        {t.classroom.materialLink}
                      </button>
                      <button
                        type="button"
                        onClick={() => setMatType("file")}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          matType === "file" ? "bg-primary text-white" : "bg-white"
                        }`}
                      >
                        {t.classroom.materialFile}
                      </button>
                    </div>
                    <input
                      value={matTitle}
                      onChange={(e) => setMatTitle(e.target.value)}
                      placeholder={t.classroom.materialTitle}
                      className="w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
                    />
                    <input
                      value={matUrl}
                      onChange={(e) => setMatUrl(e.target.value)}
                      placeholder={t.classroom.materialUrl}
                      className="w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!matTitle.trim()) return;
                        addMaterial(classroom.id, {
                          title: matTitle,
                          type: matType,
                          url: matUrl || "#",
                        });
                        setMatTitle("");
                        setMatUrl("");
                      }}
                      className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary"
                    >
                      {t.classroom.addMaterial}
                    </button>
                  </div>
                )}
                <ul className="space-y-2">
                  {classroom.materials.map((m) => (
                    <li key={m.id}>
                      <a
                        href={m.url}
                        target={m.url.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-surface-container-low"
                      >
                        <Icon name={m.type === "link" ? "link" : "description"} />
                        <span className="min-w-0 flex-1 truncate font-medium">{m.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[20px] border border-outline-variant bg-white p-4 sm:p-5">
                <h2 className="mb-3 text-lg font-bold">{t.classroom.members}</h2>
                <ul className="space-y-2">
                  {classroom.members.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-surface-container-low px-3 py-2 text-sm"
                    >
                      <span>{m.name}</span>
                      {isTeacher && isOwner && (
                        <span className="text-xs text-on-surface-variant">{m.progress}%</span>
                      )}
                    </li>
                  ))}
                  {classroom.members.length === 0 && (
                    <li className="text-sm text-on-surface-variant">{t.classroom.emptyStudent}</li>
                  )}
                </ul>
              </section>
            </aside>
          </div>
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
