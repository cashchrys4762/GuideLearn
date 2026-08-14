"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Notice = {
  id: string;
  kind: "study" | "deadline" | "news";
  title: string;
  titleTh: string;
  body: string;
  bodyTh: string;
  read: boolean;
  time: string;
};

const seed: Notice[] = [
  {
    id: "n1",
    kind: "study",
    title: "Calculus review starts soon",
    titleTh: "ใกล้ถึงเวลาทบทวน Calculus",
    body: "Starts today at 17:30",
    bodyTh: "เริ่มวันนี้ 17:30 น.",
    read: false,
    time: "10m",
  },
  {
    id: "n2",
    kind: "deadline",
    title: "Portfolio due in 4 days",
    titleTh: "เหลือ 4 วันก่อนส่ง Portfolio",
    body: "Due 18 Aug 23:59",
    bodyTh: "กำหนดส่ง 18 ส.ค. 23:59",
    read: false,
    time: "1h",
  },
  {
    id: "n3",
    kind: "news",
    title: "New AI competition open",
    titleTh: "การแข่งขัน AI เปิดรับสมัครใหม่",
    body: "Registration is open now",
    bodyTh: "เปิดรับสมัครแล้ว",
    read: false,
    time: "3h",
  },
];

type NoticeContextValue = {
  notices: Notice[];
  unread: number;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const NoticeContext = createContext<NoticeContextValue | null>(null);

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState(seed);
  const [panelOpen, setPanelOpen] = useState(false);

  const markRead = useCallback((id: string) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo(
    () => ({
      notices,
      unread: notices.filter((n) => !n.read).length,
      panelOpen,
      setPanelOpen,
      markRead,
      markAllRead,
    }),
    [notices, panelOpen, markRead, markAllRead],
  );

  return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>;
}

export function useNotices() {
  const ctx = useContext(NoticeContext);
  if (!ctx) throw new Error("useNotices must be used within NoticeProvider");
  return ctx;
}
