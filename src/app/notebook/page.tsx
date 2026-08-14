"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageMain } from "@/components/PageMain";
import { usePageScript } from "@/lib/a11y";
import { useI18n } from "@/lib/i18n";

export default function NotebookPage() {
  const { t } = useI18n();
  usePageScript(t.placeholders.notebook, true);

  return (
    <AppShell>
      <PageMain narrow className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-headline-md text-headline-md text-primary mb-3">{t.nav.notebook}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          {t.placeholders.notebook}
        </p>
        <Link href="/" className="rounded-full bg-primary px-5 py-3 font-label-md text-on-primary">
          {t.placeholders.backHome}
        </Link>
      </PageMain>
    </AppShell>
  );
}
