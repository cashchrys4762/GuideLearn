"use client";

import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { usePageScript } from "@/lib/a11y";
import { useI18n } from "@/lib/i18n";

export default function NewsPage() {
  const { t, locale } = useI18n();
  usePageScript(`${t.tools.newsTitle}. ${t.tools.newsBody}`, true);

  return (
    <AppShell>
      <main
        className="w-full flex-1 px-container-margin pt-6 pb-32 md:ml-64 md:px-12 md:pt-12 md:pb-12"
        id="main-content"
        role="main"
      >
        <header className="mb-8 max-w-3xl">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary">
            {t.tools.newsTitle}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {t.tools.newsBody}
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {t.tools.newsItems.map((item) => (
            <li
              key={item.title}
              className="cloud-shadow flex flex-col rounded-[24px] bg-white p-6 transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed/60 px-3 py-1 font-label-sm text-label-sm text-on-primary-fixed-variant">
                  <Icon name="label" className="text-[14px]" />
                  {item.cat}
                </span>
                <Icon name="newspaper" className="text-primary/40" />
              </div>
              <h2 className="font-headline-md text-[18px] text-on-surface mb-4 flex-1">
                {item.title}
              </h2>
              <div className="space-y-2 border-t border-surface-dim pt-4 font-label-sm text-label-sm text-on-surface-variant">
                <p className="flex items-center gap-2">
                  <Icon name="event" className="text-[16px] text-primary" />
                  {locale === "th" ? "เผยแพร่" : "Published"}: {item.date}
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="schedule" className="text-[16px] text-secondary-container" />
                  {locale === "th" ? "กำหนดสำคัญ" : "Deadline"}: {item.deadline}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </AppShell>
  );
}
