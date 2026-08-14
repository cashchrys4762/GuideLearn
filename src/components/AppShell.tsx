"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { assets } from "@/lib/assets";
import { useAuth } from "@/lib/auth";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";
import { useNotices } from "@/lib/notices";
import { Icon } from "./Icon";
import { LanguageToggle } from "./LanguageToggle";
import { VoiceFab } from "./VoiceFab";

type AppShellProps = {
  children: React.ReactNode;
  compact?: boolean;
};

export function AppShell({ children, compact = false }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();
  const { user, isLoggedIn, openLogin, logout, requireAuth } = useAuth();
  const { status } = useAutosave();
  const { unread, setPanelOpen } = useNotices();

  const items = [
    { href: "/", label: t.nav.dashboard, icon: "dashboard", public: true },
    { href: "/tutor", label: t.navExtra.tutor, icon: "photo_camera", public: false },
    { href: "/plan", label: t.navExtra.plan, icon: "school", public: false },
    { href: "/files", label: t.navExtra.files, icon: "description", public: false },
    { href: "/listen", label: t.navExtra.listen, icon: "hearing", public: false },
    { href: "/portfolio", label: t.navExtra.portfolio, icon: "folder_special", public: false },
    { href: "/news", label: t.navExtra.news, icon: "newspaper", public: true },
    { href: "/settings", label: t.nav.settings, icon: "settings", public: true },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const go = (href: string, isPublic: boolean) => (e: React.MouseEvent) => {
    if (!isPublic && !requireAuth(href)) {
      e.preventDefault();
      return;
    }
    router.push(href);
  };

  const saveLabel =
    status === "saving"
      ? t.platform.saving
      : status === "saved"
        ? t.platform.saved
        : null;

  return (
    <div className="bg-background text-on-background relative min-h-screen overflow-x-hidden font-body-md text-body-md">
      {!compact && (
        <>
          <div className="blob-bg-1 pointer-events-none fixed inset-0 z-[-1]" />
          <div className="blob-bg-2 pointer-events-none fixed inset-0 z-[-1]" />
        </>
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-surface-dim/60 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 md:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src={assets.tigerHoodie}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
              unoptimized
            />
            <div className="hidden sm:block">
              <div className="font-headline-md text-[18px] leading-tight font-bold text-primary">
                {t.brand}
              </div>
              <div className="font-label-sm text-[11px] text-on-surface-variant">
                {t.platform.tagline}
              </div>
            </div>
          </Link>

          <div className="relative mx-2 hidden min-w-0 flex-1 md:block lg:mx-8">
            <Icon
              name="search"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="search"
              placeholder={t.platform.searchPlaceholder}
              className="w-full rounded-full border border-transparent bg-surface-container-low py-2.5 pr-4 pl-10 outline-none focus:border-primary focus:bg-white"
            />
          </div>

          <LanguageToggle size="sm" className="hidden sm:flex" />

          <button
            type="button"
            aria-label={t.platform.notifications}
            onClick={() => setPanelOpen(true)}
            className="relative rounded-full p-2 hover:bg-surface-container"
          >
            <Icon name="notifications" className="text-primary" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>

          {isLoggedIn && user ? (
            <div className="flex items-center gap-2 rounded-full bg-surface-container-low py-1 pr-3 pl-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {user.initials}
              </div>
              <div className="hidden leading-tight md:block">
                <div className="font-label-md text-label-md text-on-surface">{user.name}</div>
                {saveLabel && (
                  <div className="font-label-sm text-[11px] text-tertiary">{saveLabel}</div>
                )}
              </div>
              <button
                type="button"
                onClick={logout}
                className="ml-1 rounded-full px-2 py-1 font-label-sm text-label-sm text-on-surface-variant hover:bg-white"
              >
                {t.platform.logout}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openLogin()}
              className="rounded-full bg-primary px-4 py-2 font-label-md text-label-md text-on-primary"
            >
              {t.platform.login}
            </button>
          )}
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        {/* Side nav desktop */}
        <nav
          aria-label="Main"
          className="sticky top-[73px] hidden h-[calc(100vh-73px)] w-64 shrink-0 flex-col overflow-y-auto border-r border-surface-dim/40 bg-surface-container-low/80 px-3 py-6 md:flex"
        >
          <ul className="flex-1 space-y-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={go(item.href, item.public)}
                    className={`flex items-center gap-3 rounded-full px-3 py-2.5 transition-all ${
                      active
                        ? "bg-primary-container text-on-primary-container shadow-sm"
                        : "text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <Icon name={item.icon} filled={active} />
                    <span className="font-label-md text-label-md flex-1">{item.label}</span>
                    {!item.public && (
                      <Icon name="shield" className="text-[16px] opacity-70" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#5b4dff]/15 to-primary-fixed p-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {t.platform.readinessShort}
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/70">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
          </div>
        </nav>

        <div className={`min-w-0 flex-1 ${compact ? "h-[calc(100vh-73px)] overflow-hidden" : "pb-24 md:pb-8"}`}>
          {children}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 z-40 flex w-full justify-around border-t border-surface-dim bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        {[items[0], items[1], items[2], items[6], items[7]].map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={go(item.href, item.public)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
                active ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              <Icon name={item.icon} filled={active} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <VoiceFab />
    </div>
  );
}
