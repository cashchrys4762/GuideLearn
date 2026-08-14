import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function NotebookPage() {
  return (
    <AppShell>
      <main className="flex min-h-[60vh] flex-1 flex-col items-center justify-center px-container-margin pb-24 md:ml-64 md:pb-10">
        <h1 className="font-headline-md text-headline-md text-primary mb-2">Notebook</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-center">
          This page is coming soon.
        </p>
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-3 font-label-md text-label-md text-on-primary shadow-sm transition-opacity hover:opacity-90"
        >
          Back to Dashboard
        </Link>
      </main>
    </AppShell>
  );
}
