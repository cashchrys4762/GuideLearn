"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { usePageScript } from "@/lib/a11y";
import { useI18n } from "@/lib/i18n";
import type { NewsItem } from "@/lib/news";

type NewsResponse = {
  ok: boolean;
  items: NewsItem[];
  updatedAt: string;
  sources: string[];
  error?: string;
};

export default function NewsPage() {
  const { t, locale } = useI18n();
  usePageScript(`${t.tools.newsTitle}. ${t.tools.newsBody}`, true);

  const [data, setData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch(`/api/news?ts=${Date.now()}`, { cache: "no-store" });
      const json = (await res.json()) as NewsResponse;
      if (!res.ok || !json.ok) throw new Error(json.error || "โหลดข่าวไม่สำเร็จ");
      setData(json);
      setError(null);
      setLastFetch(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหลดข่าวไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(true), 60_000);
    return () => window.clearInterval(id);
  }, [load]);

  const categories = useMemo(() => {
    const set = new Set((data?.items ?? []).map((i) => i.category));
    return ["all", ...set];
  }, [data]);

  const items = useMemo(() => {
    const list = data?.items ?? [];
    if (filter === "all") return list;
    return list.filter((i) => i.category === filter);
  }, [data, filter]);

  const updatedLabel = lastFetch
    ? new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
        dateStyle: "medium",
        timeStyle: "medium",
      }).format(lastFetch)
    : "—";

  return (
    <AppShell>
      <PageMain>
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-3 py-1 font-label-sm text-label-sm text-on-tertiary-fixed-variant">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tertiary" />
              </span>
              {locale === "th" ? "อัปเดตเรียลไทม์" : "Live updates"}
            </div>
            <h1 className="text-balance text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {t.tools.newsTitle}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-on-surface-variant sm:text-base">
              {t.tools.newsBody}{" "}
              {locale === "th"
                ? "ดึงจาก Google News ที่รวมสื่อน่าเชื่อถือ เช่น มติชน ไทยรัฐ Bangkok Post และข่าวการศึกษา"
                : "Pulled via Google News aggregating credible outlets."}
            </p>
            <p className="mt-2 text-xs text-on-surface-variant">
              {locale === "th" ? "อัปเดตล่าสุด" : "Last updated"}: {updatedLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary sm:self-auto"
          >
            <Icon name="refresh" />
            {locale === "th" ? "รีเฟรช" : "Refresh"}
          </button>
        </header>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                filter === cat
                  ? "bg-primary text-on-primary"
                  : "bg-white text-on-surface-variant ring-1 ring-surface-dim"
              }`}
            >
              {cat === "all" ? (locale === "th" ? "ทั้งหมด" : "All") : cat}
            </button>
          ))}
        </div>

        {loading && !data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-3xl bg-white/80" />
            ))}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-2xl border border-error-container bg-error-container/40 px-4 py-3 text-sm text-on-error-container">
            {error}
          </div>
        )}

        {!loading && items.length === 0 && !error && (
          <p className="rounded-2xl bg-white p-6 text-on-surface-variant">
            {locale === "th" ? "ยังไม่มีข่าวในขณะนี้" : "No news right now."}
          </p>
        )}

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cloud-shadow flex h-full flex-col rounded-3xl bg-white p-4 transition-transform hover:-translate-y-0.5 sm:p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className="rounded-full bg-primary-fixed/70 px-2.5 py-1 text-[11px] font-bold text-on-primary-fixed-variant">
                    {item.category}
                  </span>
                  <Icon name="open_in_new" className="text-[18px] text-on-surface-variant" />
                </div>
                <h2 className="mb-3 line-clamp-3 flex-1 text-base font-semibold text-on-surface sm:text-lg">
                  {item.title}
                </h2>
                {item.summary && (
                  <p className="mb-3 line-clamp-2 text-sm text-on-surface-variant">{item.summary}</p>
                )}
                <div className="mt-auto space-y-1 border-t border-surface-dim pt-3 text-xs text-on-surface-variant">
                  <p className="flex items-center gap-1.5 font-semibold text-on-surface">
                    <Icon name="verified" className="text-[14px] text-primary" />
                    {item.source}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Icon name="schedule" className="text-[14px]" />
                    {item.publishedLabel}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {data?.sources?.length ? (
          <p className="mt-6 text-xs text-on-surface-variant">
            {locale === "th" ? "แหล่งข้อมูล" : "Sources"}: {data.sources.join(" · ")}
          </p>
        ) : null}
      </PageMain>
    </AppShell>
  );
}
