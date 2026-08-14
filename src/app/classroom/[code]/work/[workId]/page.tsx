"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/lib/auth";
import { useClassrooms } from "@/lib/classroom";
import { useI18n } from "@/lib/i18n";

function WorkReview() {
  const { t } = useI18n();
  const params = useParams<{ code: string; workId: string }>();
  const search = useSearchParams();
  const studentId = search.get("student") || "";
  const { user } = useAuth();
  const { getByCode, returnWork } = useClassrooms();

  const classroom = getByCode(String(params.code || ""));
  const assignment = classroom?.assignments.find((a) => a.id === params.workId);
  const submission = assignment?.submissions.find((s) => s.studentId === studentId);
  const isOwner = !!(user && classroom && classroom.teacherId === user.id);

  const [score, setScore] = useState(String(submission?.score ?? 80));
  const [feedback, setFeedback] = useState(submission?.feedback ?? "");

  const title = useMemo(
    () => (assignment && submission ? `${assignment.title} · ${submission.studentName}` : ""),
    [assignment, submission],
  );

  if (!classroom || !assignment || !submission || !isOwner) {
    return (
      <PageMain narrow>
        <p className="text-error">{t.classroom.notFound}</p>
        <Link href="/classroom" className="mt-3 inline-block text-primary underline">
          {t.classroom.title}
        </Link>
      </PageMain>
    );
  }

  return (
    <PageMain narrow>
      <Link
        href={`/classroom/${classroom.code}`}
        className="mb-4 inline-block text-sm text-primary underline"
      >
        ← {classroom.name}
      </Link>
      <h1 className="mb-2 text-2xl font-bold text-primary">{title}</h1>
      <p className="mb-4 text-sm text-on-surface-variant">{assignment.description}</p>
      <div className="mb-4 rounded-2xl bg-surface-container p-4 text-sm whitespace-pre-wrap">
        {submission.text || t.classroom.noSubmissions}
      </div>
      <label className="mb-3 block text-xs text-on-surface-variant">
        {t.classroom.score}
        <input
          type="number"
          min={0}
          max={100}
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-base"
        />
      </label>
      <label className="mb-4 block text-xs text-on-surface-variant">
        {t.classroom.feedback}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-base"
        />
      </label>
      <button
        type="button"
        onClick={() => {
          returnWork(
            classroom.id,
            assignment.id,
            submission.studentId,
            Number(score) || 0,
            feedback,
          );
        }}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary"
      >
        {t.classroom.returnWork}
      </button>
    </PageMain>
  );
}

export default function WorkPage() {
  return (
    <AppShell>
      <RequireAuth>
        <Suspense fallback={<PageMain narrow>…</PageMain>}>
          <WorkReview />
        </Suspense>
      </RequireAuth>
    </AppShell>
  );
}
