import Parser from "rss-parser";

export type NewsItem = {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string;
  publishedLabel: string;
  summary: string;
  category: string;
};

type FeedSource = {
  id: string;
  label: string;
  category: string;
  url: string;
};

const FEEDS: FeedSource[] = [
  {
    id: "gnews-edu",
    label: "Google News",
    category: "การศึกษา",
    url: "https://news.google.com/rss/search?q=%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2+OR+TCAS+OR+%E0%B8%97%E0%B8%B8%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2&hl=th&gl=TH&ceid=TH:th",
  },
  {
    id: "gnews-uni",
    label: "Google News",
    category: "มหาวิทยาลัย",
    url: "https://news.google.com/rss/search?q=%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2+%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3+OR+%E0%B8%84%E0%B8%93%E0%B8%B0&hl=th&gl=TH&ceid=TH:th",
  },
  {
    id: "gnews-schol",
    label: "Google News",
    category: "ทุนการศึกษา",
    url: "https://news.google.com/rss/search?q=%E0%B8%97%E0%B8%B8%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2+OR+scholarship+Thailand&hl=th&gl=TH&ceid=TH:th",
  },
];

const CREDIBLE = [
  "มติชน",
  "ไทยรัฐ",
  "thairath",
  "bangkok post",
  "nation",
  "ประชาชาติ",
  "ไทยพีบีเอส",
  "thai pbs",
  "bbc",
  "reuters",
  "อว.",
  "mhesi",
  "กระทรวง",
  "มหาวิทยาลัย",
  "จุฬา",
  "ธรรมศาสตร์",
  "เกษตร",
  "มหิดล",
  "mytcas",
  "tcas",
  "dek-d",
  "แอดมิชชั่น",
  "ทุน",
];

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSource(title: string, fallback: string) {
  const parts = title.split(/\s[-–—]\s/);
  if (parts.length > 1) return parts[parts.length - 1]!.trim();
  return fallback;
}

function cleanTitle(title: string) {
  return title.replace(/\s[-–—]\s[^-–—]+$/, "").trim();
}

function isLikelyCredible(source: string, title: string) {
  const hay = `${source} ${title}`.toLowerCase();
  return CREDIBLE.some((k) => hay.includes(k.toLowerCase()));
}

function formatDate(iso: string, locale: "th" | "en") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

async function fetchFeed(source: FeedSource) {
  const parser = new Parser({
    timeout: 12000,
    headers: {
      "User-Agent": "GuideLearnBot/1.0 (+https://guide-learn-zeta.vercel.app)",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "GuideLearnBot/1.0 (+https://guide-learn-zeta.vercel.app)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Feed ${source.id} HTTP ${res.status}`);
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    return (feed.items ?? []).slice(0, 12).map((item, idx) => {
      const rawTitle = item.title?.trim() || "Untitled";
      const publisher = extractSource(rawTitle, source.label);
      const publishedAt = item.isoDate || item.pubDate || new Date().toISOString();
      const summary = stripHtml(item.contentSnippet || item.content || item.summary || "");
      return {
        id: `${source.id}-${item.guid || item.link || idx}`,
        title: cleanTitle(rawTitle),
        link: item.link || "#",
        source: publisher,
        publishedAt,
        publishedLabel: formatDate(publishedAt, "th"),
        summary: summary.slice(0, 180),
        category: source.category,
        _score: isLikelyCredible(publisher, rawTitle) ? 2 : 1,
      };
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function getEducationNews(): Promise<{
  items: NewsItem[];
  updatedAt: string;
  sources: string[];
}> {
  const settled = await Promise.allSettled(FEEDS.map((f) => fetchFeed(f)));
  const merged: Array<NewsItem & { _score: number }> = [];

  for (const result of settled) {
    if (result.status === "fulfilled") merged.push(...result.value);
  }

  const dedup = new Map<string, NewsItem & { _score: number }>();
  for (const item of merged) {
    const key = item.title.toLowerCase().slice(0, 80);
    const prev = dedup.get(key);
    if (!prev || item._score > prev._score) dedup.set(key, item);
  }

  const items = [...dedup.values()]
    .sort((a, b) => {
      if (b._score !== a._score) return b._score - a._score;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 24)
    .map(({ _score: _, ...rest }) => rest);

  return {
    items,
    updatedAt: new Date().toISOString(),
    sources: ["Google News (การศึกษา)", "Google News (มหาวิทยาลัย)", "Google News (ทุนการศึกษา)"],
  };
}
