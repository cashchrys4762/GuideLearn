"use client";

import { useEffect, useMemo, useState } from "react";

type InAppKind = "line" | "instagram" | "facebook" | null;

function detectInApp(): InAppKind {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  if (/Line\//i.test(ua)) return "line";
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return "facebook";
  return null;
}

function cleanTrackingParams() {
  try {
    const url = new URL(window.location.href);
    const drop = ["fbclid", "igshid", "fb_action_ids", "fb_action_types", "mibextid"];
    let changed = false;
    for (const key of drop) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    }
    if (changed) {
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  } catch {
    /* ignore */
  }
}

function externalBrowserUrl(href: string) {
  try {
    const url = new URL(href);
    // LINE opens the system browser when this flag is present.
    url.searchParams.set("openExternalBrowser", "1");
    return url.toString();
  } catch {
    return href;
  }
}

function androidChromeIntent(href: string) {
  try {
    const url = new URL(href);
    const hostPath = `${url.host}${url.pathname}${url.search}${url.hash}`;
    return `intent://${hostPath}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(href)};end`;
  } catch {
    return href;
  }
}

/**
 * Soften LINE / Instagram / Facebook in-app browsers:
 * - LINE: auto-request system browser via openExternalBrowser=1
 * - Instagram/Facebook: show a clear CTA to open in Chrome/Safari
 */
export function InAppBrowserGate() {
  const [kind, setKind] = useState<InAppKind>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    cleanTrackingParams();
    const detected = detectInApp();
    setKind(detected);

    if (detected === "line") {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get("openExternalBrowser") !== "1") {
          url.searchParams.set("openExternalBrowser", "1");
          window.location.replace(url.toString());
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  const openExternal = () => {
    const href = window.location.href;
    const ua = navigator.userAgent || "";
    if (/Android/i.test(ua)) {
      window.location.href = androidChromeIntent(externalBrowserUrl(href));
      return;
    }
    // iOS: copy hint — open in Safari via openExternalBrowser-style URL when possible
    window.open(externalBrowserUrl(href), "_blank", "noopener,noreferrer");
  };

  const label = useMemo(() => {
    if (kind === "line") return "LINE";
    if (kind === "instagram") return "Instagram";
    if (kind === "facebook") return "Facebook";
    return "";
  }, [kind]);

  if (!kind || dismissed) return null;
  // LINE usually redirects itself; still show fallback if it stays in-app.
  if (kind === "line") return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] border-b border-primary/20 bg-primary px-4 py-3 text-on-primary shadow-lg">
      <div className="mx-auto flex max-w-3xl items-start gap-3">
        <div className="min-w-0 flex-1 text-sm leading-snug">
          <p className="font-semibold">เปิดในเบราว์เซอร์เพื่อใช้งานได้เต็มที่</p>
          <p className="mt-0.5 opacity-90">
            เบราว์เซอร์ใน {label} อาจโหลด GuideLearn ไม่สมบูรณ์ — กดปุ่มด้านขวาเพื่อเปิด Chrome/Safari
          </p>
        </div>
        <button
          type="button"
          onClick={openExternal}
          className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-bold text-primary"
        >
          เปิดเบราว์เซอร์
        </button>
        <button
          type="button"
          aria-label="ปิด"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-full px-2 py-2 text-sm opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
