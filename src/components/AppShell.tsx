"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { assets } from "@/lib/assets";
import { useAuth } from "@/lib/auth";
import { useAutosave } from "@/lib/autosave";
import { useBandwidth } from "@/lib/bandwidth";
import { useI18n } from "@/lib/i18n";
import { useNotices } from "@/lib/notices";
import { useTheme } from "@/lib/theme";
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
  const { user, isLoggedIn, isTeacher, openLogin, logout, requireAuth } = useAuth();
  const { lowBandwidth } = useBandwidth();
  const { theme, toggleTheme } = useTheme();
  const { status } = useAutosave();
  const { unread, setPanelOpen } = useNotices();

  const items = (
    isTeacher
      ? [
          { href: "/", label: t.nav.dashboard, icon: "dashboard", public: true },
          { href: "/classroom", label: t.navExtra.classroom, icon: "groups", public: false },
          { href: "/teacher/copilot", label: t.navExtra.copilot, icon: "psychology", public: false },
          { href: "/news", label: t.navExtra.news, icon: "newspaper", public: true },
          { href: "/settings", label: t.nav.settings, icon: "settings", public: true },
        ]
      : [
          { href: "/", label: t.nav.dashboard, icon: "dashboard", public: true },
          { href: "/classroom", label: t.navExtra.classroom, icon: "groups", public: false },
          { href: "/tutor", label: t.navExtra.tutor, icon: "photo_camera", public: false },
          { href: "/plan", label: t.navExtra.plan, icon: "school", public: false },
          { href: "/files", label: t.navExtra.files, icon: "description", public: false },
          { href: "/listen", label: t.navExtra.listen, icon: "hearing", public: false },
          { href: "/portfolio", label: t.navExtra.portfolio, icon: "folder_special", public: false },
          { href: "/news", label: t.navExtra.news, icon: "newspaper", public: true },
          { href: "/settings", label: t.nav.settings, icon: "settings", public: true },
        ]
  ) as Array<{ href: string; label: string; icon: string; public: boolean }>;

  const mobileItems = isTeacher
    ? [items[0], items[1], items[2], items[3], items[4]]
    : [items[0], items[1], items[2], items[7], items[8]];

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
    <div className="bg-background text-on-background relative min-h-dvh overflow-x-hidden font-body-md text-body-md">
      {!compact && !lowBandwidth && (
        <>
          <div className="blob-bg-1 pointer-events-none fixed inset-0 z-[-1]" />
          <div className="blob-bg-2 pointer-events-none fixed inset-0 z-[-1]" />
        </>
      )}

      <header className="sticky top-0 z-40 border-b border-outline-variant/50 bg-white/85 shadow-[0_8px_30px_-18px_rgba(30,79,158,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/75 dark:border-outline-variant/60 dark:bg-surface/90 dark:shadow-[0_8px_30px_-18px_rgba(0,0,0,0.55)]">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3 lg:px-6">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 transition hover:opacity-90"
            aria-label={t.brand}
          >
            {lowBandwidth ? (
              <span className="text-base font-bold text-primary sm:text-lg">{t.brand}</span>
            ) : (
              <Image
                src={assets.logo}
                alt={t.brand}
                width={220}
                height={140}
                priority
                className="h-10 w-auto object-contain sm:h-12 lg:h-[3.25rem] dark:brightness-110"
              />
            )}
            <span className="sr-only">{t.platform.tagline}</span>
          </Link>

          <div className="relative mx-1 hidden min-w-0 flex-1 md:block lg:mx-6">
            <Icon
              name="search"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="search"
              placeholder={t.platform.searchPlaceholder}
              className="w-full rounded-full border border-transparent bg-surface-container-low py-2.5 pr-4 pl-10 text-sm text-on-surface shadow-inner outline-none transition placeholder:text-on-surface-variant focus:border-primary/35 focus:bg-surface-container-lowest focus:shadow-[0_0_0_4px_rgba(30,79,158,0.12)] dark:focus:bg-surface-container-high dark:focus:shadow-[0_0_0_4px_rgba(91,141,239,0.2)]"
            />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t.settings.themeLight : t.settings.themeDark}
              title={theme === "dark" ? t.settings.themeLight : t.settings.themeDark}
              className="rounded-full p-2 text-primary hover:bg-surface-container"
            >
              <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} />
            </button>

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
              <div className="flex max-w-[42vw] items-center gap-1.5 rounded-full bg-surface-container-low py-1 pr-2 pl-1 sm:max-w-none sm:gap-2 sm:pr-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container shadow-sm sm:h-9 sm:w-9 sm:text-sm">
                  {user.initials}
                </div>
                <div className="hidden min-w-0 leading-tight md:block">
                  <div className="truncate text-sm font-semibold text-on-surface">{user.name}</div>
                  <div className="truncate text-[11px] text-on-surface-variant">
                    {user.role === "teacher" ? t.platform.roleTeacher : t.platform.roleStudent}
                    {saveLabel ? ` · ${saveLabel}` : ""}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full px-2 py-1 text-[11px] font-semibold text-on-surface-variant hover:bg-surface-container-high sm:text-xs"
                >
                  {t.platform.logout}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openLogin()}
                className="btn-cute rounded-full bg-primary px-3 py-2 text-xs font-semibold text-on-primary sm:px-4 sm:text-sm"
              >
                {t.platform.login}
              </button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="border-t border-surface-dim/40 px-3 py-2 md:hidden">
          <div className="relative">
            <Icon
              name="search"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="search"
              placeholder={t.platform.searchPlaceholder}
              className="w-full rounded-full bg-surface-container-low py-2 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <nav
          aria-label="Main"
          className="sticky top-[105px] hidden h-[calc(100dvh-105px)] w-56 shrink-0 flex-col overflow-y-auto border-r border-outline-variant/40 bg-white/70 px-2 py-5 backdrop-blur-md lg:flex lg:w-64 lg:px-3 dark:bg-surface/80"
        >
          <ul className="flex-1 space-y-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={go(item.href, item.public)}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all ${
                      active
                        ? "bg-primary-container text-on-primary-container shadow-[0_8px_20px_-10px_rgba(30,79,158,0.45)]"
                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                    }`}
                  >
                    <Icon name={item.icon} filled={active} />
                    <span className="flex-1 text-sm font-semibold">{item.label}</span>
                    {!item.public && (
                      <Icon
                        name="shield"
                        className={`text-[16px] ${active ? "opacity-80" : "opacity-40"}`}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-2xl border border-outline-variant/40 bg-surface-container-low p-4 dark:bg-surface-container">
            <p className="text-xs font-semibold text-on-surface-variant">
              {t.platform.readinessShort}
            </p>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-container-highest/60 dark:bg-surface-dim">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>
          </div>
        </nav>

        <div
          className={`min-w-0 flex-1 ${
            compact ? "h-[calc(100dvh-105px)] overflow-hidden lg:h-[calc(100dvh-73px)]" : "pb-24 lg:pb-8"
          }`}
        >
          {children}
        </div>
      </div>

      <nav className="safe-bottom fixed bottom-0 left-0 z-40 flex w-full justify-around border-t border-outline-variant/50 bg-white/92 px-1 py-1.5 shadow-[0_-10px_30px_-20px_rgba(30,79,158,0.25)] backdrop-blur-xl sm:px-2 sm:py-2 lg:hidden dark:bg-surface/95 low-bw:backdrop-blur-none">
        {mobileItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={go(item.href, item.public)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition ${
                active
                  ? "bg-primary-fixed text-primary dark:bg-primary-container dark:text-on-primary-container"
                  : "text-on-surface-variant"
              }`}
            >
              <Icon name={item.icon} filled={active} />
              <span className="w-full truncate text-center text-[9px] font-semibold sm:text-[10px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <VoiceFab />
    </div>
  );
}
