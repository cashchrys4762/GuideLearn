"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { Icon } from "./Icon";
import { LanguageToggle } from "./LanguageToggle";
import { VoiceFab } from "./VoiceFab";

type AppShellProps = {
  children: React.ReactNode;
  compact?: boolean;
};

export function AppShell({ children, compact = false }: AppShellProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { href: "/", label: t.nav.dashboard, icon: "dashboard", mobileLabel: t.nav.dashboard },
    { href: "/missions", label: t.nav.missions, icon: "rocket_launch", mobileLabel: t.nav.missions },
    {
      href: "/study-buddy",
      label: t.nav.studyBuddy,
      icon: "smart_toy",
      mobileLabel: t.nav.coach,
    },
    {
      href: "/notebook",
      label: t.nav.notebook,
      icon: "book",
      mobileLabel: t.nav.notebook,
      desktopOnly: true,
    },
    { href: "/settings", label: t.nav.settings, icon: "settings", mobileLabel: t.nav.settings },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={`bg-background text-on-background relative min-h-screen overflow-x-hidden font-body-md text-body-md ${
        compact ? "overflow-hidden" : "flex flex-col md:flex-row"
      }`}
    >
      {!compact && (
        <>
          <div className="blob-bg-1 pointer-events-none fixed inset-0 z-[-1]" />
          <div className="blob-bg-2 pointer-events-none fixed inset-0 z-[-1]" />
        </>
      )}

      <nav
        aria-label="Main"
        className="border-r-0 shadow-primary/10 fixed top-0 left-0 z-50 hidden h-screen w-64 flex-col rounded-r-lg bg-surface-container-low py-8 shadow-sm md:flex"
      >
        <div className="mb-8 flex flex-col items-center px-6 text-center">
          <Image
            src={assets.tigerHoodie}
            alt={t.brand}
            width={96}
            height={96}
            className="mb-4 h-24 w-24 rounded-full object-cover"
            unoptimized
          />
          <h2 className="font-headline-md text-headline-md text-primary">{t.hiLearner}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t.readyToday}</p>
          <div
            aria-label={t.goalReadiness}
            className="mt-4 inline-block rounded-full bg-primary px-4 py-2 font-label-md text-label-md text-on-primary shadow-sm"
          >
            {t.goalReadiness}
          </div>
          <LanguageToggle className="mt-4" />
        </div>

        <ul className="flex-1 space-y-2" role="menu">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`mx-2 flex items-center gap-4 rounded-full px-4 py-3 transition-all duration-300 ${
                    active
                      ? "bg-primary-container text-on-primary-container scale-[0.98] hover:shadow-md"
                      : "text-on-surface-variant hover:scale-105 hover:bg-surface-container-high"
                  }`}
                >
                  <Icon name={item.icon} filled={active} />
                  <span className="font-label-md text-label-md">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-surface-variant/30 px-2 pt-4">
          <Link
            href="/help"
            className="text-on-surface-variant hover:bg-surface-container-high flex items-center gap-4 rounded-full px-4 py-3 transition-all duration-300 hover:scale-105"
          >
            <Icon name="help_outline" />
            <span className="font-label-md text-label-md">{t.nav.help}</span>
          </Link>
        </div>
      </nav>

      {!compact && (
        <nav
          aria-label="Mobile top"
          className="docked full-width flat no shadows sticky top-0 z-40 mx-auto flex w-full max-w-7xl items-center justify-between bg-background/80 px-container-margin py-4 backdrop-blur-md md:hidden"
        >
          <div className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
            {t.brand}
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle size="sm" />
            <Icon name="notifications" className="text-primary" />
            <Image
              src={assets.studentAvatar}
              alt=""
              width={40}
              height={40}
              className="border-primary h-10 w-10 rounded-full border-2 object-cover"
              unoptimized
            />
          </div>
        </nav>
      )}

      <div className={compact ? "h-screen" : "flex-1"}>{children}</div>

      <nav
        aria-label="Mobile bottom"
        className="flat no shadows fixed bottom-0 left-0 z-40 flex w-full items-center justify-around rounded-t-3xl border-t-0 bg-surface-container-low px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-lg md:hidden"
      >
        {navItems
          .filter((item) => !("desktopOnly" in item && item.desktopOnly))
          .slice(0, 4)
          .map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center p-2 transition-colors ${
                  active
                    ? "scale-95 font-bold text-primary"
                    : "text-on-surface-variant font-medium hover:text-primary"
                }`}
              >
                <div
                  className={`mb-1 px-4 py-1 ${
                    active ? "rounded-full bg-primary-container text-on-primary-container" : ""
                  }`}
                >
                  <Icon name={item.icon} filled={active} />
                </div>
                <span className={`font-label-sm text-label-sm ${active ? "text-primary" : ""}`}>
                  {item.mobileLabel}
                </span>
              </Link>
            );
          })}
      </nav>

      <VoiceFab />
    </div>
  );
}
