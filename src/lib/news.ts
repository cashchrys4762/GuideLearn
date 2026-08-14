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
  kind: "thai_edu" | "scholarship_open";
  url: string;
};

/** Thai education + scholarships currently open for applications */
const FEEDS: FeedSource[] = [
  {
    id: "gnews-thai-edu",
    label: "Google News",
    category: "การศึกษาไทย",
    kind: "thai_edu",
    url: "https://news.google.com/rss/search?q=%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2+OR+TCAS+OR+TGAT+OR+TPAT+OR+%E0%B8%A8%E0%B8%98.+OR+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2+%E0%B9%84%E0%B8%97%E0%B8%A2+when:21d&hl=th&gl=TH&ceid=TH:th",
  },
  {
    id: "gnews-tcas",
    label: "Google News",
    category: "รับเข้า / TCAS",
    kind: "thai_edu",
    url: "https://news.google.com/rss/search?q=TCAS+%E0%B9%84%E0%B8%97%E0%B8%A2+OR+%E0%B9%82%E0%B8%84%E0%B8%A7%E0%B8%95%E0%B8%B2+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2+OR+%E0%B9%81%E0%B8%AD%E0%B8%94%E0%B8%A1%E0%B8%B4%E0%B8%8A%E0%B8%8A%E0%B8%B1%E0%B8%99+%E0%B9%84%E0%B8%97%E0%B8%A2+when:21d&hl=th&gl=TH&ceid=TH:th",
  },
  {
    id: "gnews-schol-open",
    label: "Google News",
    category: "ทุนเปิดรับสมัคร",
    kind: "scholarship_open",
    url: "https://news.google.com/rss/search?q=%E0%B8%97%E0%B8%B8%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2+%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3+OR+%E0%B8%97%E0%B8%B8%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2+%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B9%8B%E0%B8%A2%E0%B8%A7+OR+scholarship+Thailand+apply+OR+%E0%B8%97%E0%B8%B8%E0%B8%99%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99+when:30d&hl=th&gl=TH&ceid=TH:th",
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
  "อว.",
  "mhesi",
  "กระทรวงศึกษา",
  "ศธ.",
  "สกอ.",
  "จุฬา",
  "ธรรมศาสตร์",
  "เกษตร",
  "มหิดล",
  "ศิลปากร",
  "เชียงใหม่",
  "ขอนแก่น",
  "สงขลา",
  "mytcas",
  "tcas",
  "dek-d",
  "แอดมิชชั่น",
  "สทศ",
  "niets",
];

const THAI_EDU = [
  "การศึกษาไทย",
  "ศธ.",
  "กระทรวงศึกษา",
  "ทปอ.",
  "tcas",
  "โควตา",
  "แอดมิชชั่น",
  "รับสมัคร",
  "สอบเข้า",
  "tgat",
  "tpat",
  "a-level",
  "o-net",
  "onet",
  "พอร์ตโฟลิโอ",
  "ปฏิทินสอบ",
  "ม.6",
  "ม.ปลาย",
  "นักเรียน",
  "มหาวิทยาลัย",
  "คณะ",
  "เปิดรับ",
  "รอบ 1",
  "รอบ 2",
  "รอบ 3",
  "รอบ 4",
  "ประเทศไทย",
  "ในไทย",
  "ของไทย",
];

const SCHOLARSHIP = ["ทุนการศึกษ", "ทุนเรียน", "scholarship", "ทุนเล่าเรียน", "ทุนสนับสนุน"];

const OPEN_APPLY = [
  "เปิดรับสมัคร",
  "รับสมัครแล้ว",
  "รับสมัครเดี๋ยวนี้",
  "เปิดรับ",
  "สมัครได้",
  "หมดเขต",
  "กำหนดรับสมัคร",
  "ระยะเวลารับสมัคร",
  "apply now",
  "applications open",
  "เปิดให้สมัคร",
  "รับใบสมัคร",
];

const BLOCK = [
  "ฆ่า",
  "ยิง",
  "อุบัติเหตุ",
  "อาชญากรรม",
  "ฉ้อโกง",
  "คอรัปชัน",
  "คอร์รัปชัน",
  "เลือกตั้ง",
  "พรรค",
  "ดารา",
  "บันเทิง",
  "ละคร",
  "คอนเสิร์ต",
  "ฟุตบอล",
  "หวย",
  "ราคาทอง",
  "หุ้น",
  "คริปโต",
  "bitcoin",
  "แผ่นดินไหว",
  "น้ำท่วม",
  "ไฟไหม้",
  "คดี",
  "ศาล",
  "จับกุม",
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

function haystack(source: string, title: string, summary: string) {
  return `${source} ${title} ${summary}`.toLowerCase();
}

function hits(hay: string, keys: string[]) {
  return keys.filter((k) => hay.includes(k.toLowerCase())).length;
}

function isLikelyCredible(source: string, title: string) {
  const hay = `${source} ${title}`.toLowerCase();
  return CREDIBLE.some((k) => hay.includes(k.toLowerCase()));
}

function isThaiEducationRelevant(hay: string) {
  // Prefer Thai-context education; Google News TH already biases locally
  return hits(hay, THAI_EDU) >= 1;
}

function isOpenScholarship(hay: string) {
  return hits(hay, SCHOLARSHIP) >= 1 && hits(hay, OPEN_APPLY) >= 1;
}

function shouldKeep(
  kind: FeedSource["kind"],
  source: string,
  title: string,
  summary: string,
) {
  const hay = haystack(source, title, summary);
  if (BLOCK.some((k) => hay.includes(k.toLowerCase()))) return false;

  if (kind === "scholarship_open") {
    return isOpenScholarship(hay) || (hits(hay, SCHOLARSHIP) >= 1 && /รับสมัคร|เปิดรับ|สมัคร/.test(hay));
  }

  // thai education path
  if (!isThaiEducationRelevant(hay)) return false;
  if (hits(hay, THAI_EDU) >= 2) return true;
  return hits(hay, THAI_EDU) >= 1 && isLikelyCredible(source, title);
}

function scoreItem(kind: FeedSource["kind"], source: string, title: string, summary: string) {
  const hay = haystack(source, title, summary);
  let score = hits(hay, THAI_EDU);
  if (isLikelyCredible(source, title)) score += 2;
  if (kind === "scholarship_open") {
    score += hits(hay, SCHOLARSHIP) * 2 + hits(hay, OPEN_APPLY) * 3;
  }
  if (/(tcas|โควตา|tgat|tpat|ศธ\.|การศึกษาไทย)/i.test(hay)) score += 2;
  return score;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("th-TH", {
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
    return (feed.items ?? [])
      .slice(0, 18)
      .map((item, idx) => {
        const rawTitle = item.title?.trim() || "Untitled";
        const publisher = extractSource(rawTitle, source.label);
        const publishedAt = item.isoDate || item.pubDate || new Date().toISOString();
        const summary = stripHtml(item.contentSnippet || item.content || item.summary || "");
        const title = cleanTitle(rawTitle);
        return {
          id: `${source.id}-${item.guid || item.link || idx}`,
          title,
          link: item.link || "#",
          source: publisher,
          publishedAt,
          publishedLabel: formatDate(publishedAt),
          summary: summary.slice(0, 180),
          category: source.category,
          _score: scoreItem(source.kind, publisher, title, summary),
          _keep: shouldKeep(source.kind, publisher, title, summary),
        };
      })
      .filter((item) => item._keep);
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
  const merged: Array<NewsItem & { _score: number; _keep: boolean }> = [];

  for (const result of settled) {
    if (result.status === "fulfilled") merged.push(...result.value);
  }

  const dedup = new Map<string, NewsItem & { _score: number; _keep: boolean }>();
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
    .slice(0, 12)
    .map(({ _score: _, _keep: __, ...rest }) => rest);

  return {
    items,
    updatedAt: new Date().toISOString(),
    sources: [
      "Google News (การศึกษาไทย)",
      "Google News (รับเข้า / TCAS)",
      "Google News (ทุนเปิดรับสมัคร)",
    ],
  };
}
