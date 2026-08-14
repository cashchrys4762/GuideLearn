"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript } from "@/lib/a11y";
import { useAuth } from "@/lib/auth";
import { useClassrooms } from "@/lib/classroom";
import { useI18n } from "@/lib/i18n";

function JoinForm() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { joinClass } = useClassrooms();
  const router = useRouter();
  const params = useSearchParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const q = params.get("code") || params.get("c");
    if (q) setCode(q.toUpperCase());
  }, [params]);

  usePageScript(`${t.classroom.join}. ${t.classroom.demoCode}`, true);

  const submit = () => {
    if (!user) return;
    const res = joinClass(code, user);
    if (!res.ok) {
      setError(t.classroom.notFound);
      setOk(false);
      return;
    }
    setOk(true);
    setError(null);
    router.push(`/classroom/${res.classroom.code}`);
  };

  return (
    <PageMain narrow>
      <h1 className="mb-2 text-2xl font-bold text-primary sm:text-3xl">{t.classroom.join}</h1>
      <p className="mb-6 text-on-surface-variant">{t.classroom.bodyStudent}</p>
      <label className="mb-4 block">
        <span className="text-xs text-on-surface-variant">{t.classroom.joinCode}</span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="mt-1 w-full rounded-2xl border border-outline-variant bg-white px-4 py-3 font-mono text-lg tracking-widest outline-none focus:border-primary"
          placeholder="KLM4NP"
          maxLength={8}
        />
      </label>
      <p className="mb-4 text-sm text-tertiary">{t.classroom.demoCode}</p>
      {error && <p className="mb-3 text-sm text-error">{error}</p>}
      {ok && <p className="mb-3 text-sm text-tertiary">{t.classroom.joinSuccess}</p>}
      <button
        type="button"
        onClick={submit}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary"
      >
        <Icon name="login" /> {t.classroom.join}
      </button>
    </PageMain>
  );
}

export default function JoinClassPage() {
  return (
    <AppShell>
      <RequireAuth>
        <Suspense fallback={<PageMain narrow>…</PageMain>}>
          <JoinForm />
        </Suspense>
      </RequireAuth>
    </AppShell>
  );
}
