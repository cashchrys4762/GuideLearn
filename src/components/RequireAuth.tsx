"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Icon } from "@/components/Icon";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, openLogin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    if (!isLoggedIn) openLogin(pathname);
  }, [isLoggedIn, openLogin, pathname]);

  if (isLoggedIn) return <>{children}</>;

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center p-8 text-center">
      <Icon name="shield" className="mb-3 text-4xl text-primary" />
      <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
        {t.platform.needLogin}
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
        {t.platform.toolsLocked}
      </p>
      <button
        type="button"
        onClick={() => openLogin(pathname)}
        className="rounded-full bg-primary px-6 py-3 font-label-md text-on-primary"
      >
        {t.platform.login}
      </button>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="mt-3 font-label-md text-primary"
      >
        {t.placeholders.backHome}
      </button>
    </div>
  );
}
