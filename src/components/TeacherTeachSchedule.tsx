"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/lib/auth";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";

export type TeachPeriod = {
  id: string;
  day: number; // 0 = Sun … 6 = Sat
  start: string; // HH:MM
  end: string;
  subject: string;
  room: string;
  className: string;
};

const STORAGE = "guidelearn-teach-schedule-v1";

function seedPeriods(): TeachPeriod[] {
  return [
    {
      id: "p1",
      day: 1,
      start: "08:30",
      end: "09:20",
      subject: "คณิตศาสตร์ ม.6",
      room: "ห้อง 6/1",
      className: "KLM4NP",
    },
    {
      id: "p2",
      day: 1,
      start: "10:30",
      end: "11:20",
      subject: "คณิตศาสตร์ ม.5",
      room: "ห้อง 5/2",
      className: "",
    },
    {
      id: "p3",
      day: 3,
      start: "13:00",
      end: "13:50",
      subject: "คณิตศาสตร์ ม.6",
      room: "ห้อง 6/1",
      className: "KLM4NP",
    },
    {
      id: "p4",
      day: 5,
      start: "09:30",
      end: "10:20",
      subject: "ติวโควตา",
      room: "ห้องประชุม A",
      className: "",
    },
  ];
}

function loadPeriods(teacherId: string): TeachPeriod[] {
  try {
    const raw = window.localStorage.getItem(`${STORAGE}:${teacherId}`);
    if (raw) {
      const parsed = JSON.parse(raw) as TeachPeriod[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* ignore */
  }
  return seedPeriods();
}

function savePeriods(teacherId: string, periods: TeachPeriod[]) {
  try {
    window.localStorage.setItem(`${STORAGE}:${teacherId}`, JSON.stringify(periods));
  } catch {
    /* ignore */
  }
}

function startOfWeek(d: Date) {
  const x = new Date(d);
  const day = x.getDay();
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - day);
  return x;
}

export function TeacherTeachSchedule() {
  const { t, locale } = useI18n();
  const { user, requireAuth } = useAuth();
  const { triggerSave } = useAutosave();
  const [periods, setPeriods] = useState<TeachPeriod[]>([]);
  const [ready, setReady] = useState(false);
  const [weekAnchor, setWeekAnchor] = useState(() => startOfWeek(new Date()));
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDay());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    day: new Date().getDay(),
    start: "08:30",
    end: "09:20",
    subject: "",
    room: "",
    className: "",
  });

  useEffect(() => {
    if (!user) {
      setPeriods(seedPeriods());
      setReady(true);
      return;
    }
    setPeriods(loadPeriods(user.id));
    setReady(true);
  }, [user]);

  const dayNames = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
      weekday: "short",
    });
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(2024, 0, 7 + i); // Sunday-based week
      return fmt.format(d);
    });
  }, [locale]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekAnchor);
      d.setDate(weekAnchor.getDate() + i);
      return d;
    });
  }, [weekAnchor]);

  const todayKey = useMemo(() => {
    const n = new Date();
    return `${n.getFullYear()}-${n.getMonth()}-${n.getDate()}`;
  }, []);

  const dayPeriods = useMemo(
    () =>
      periods
        .filter((p) => p.day === selectedDay)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [periods, selectedDay],
  );

  const persist = (next: TeachPeriod[]) => {
    setPeriods(next);
    if (user) savePeriods(user.id, next);
    triggerSave();
  };

  const addPeriod = () => {
    if (!requireAuth("/")) return;
    if (!form.subject.trim()) return;
    const period: TeachPeriod = {
      id: `p-${Date.now()}`,
      day: form.day,
      start: form.start,
      end: form.end,
      subject: form.subject.trim(),
      room: form.room.trim(),
      className: form.className.trim(),
    };
    persist([...periods, period]);
    setShowForm(false);
    setForm((f) => ({ ...f, subject: "", room: "", className: "" }));
    setSelectedDay(period.day);
  };

  const removePeriod = (id: string) => {
    persist(periods.filter((p) => p.id !== id));
  };

  const shiftWeek = (dir: -1 | 1) => {
    const next = new Date(weekAnchor);
    next.setDate(next.getDate() + dir * 7);
    setWeekAnchor(next);
  };

  if (!ready) return null;

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {t.dash.teachScheduleTitle}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {t.dash.teachScheduleSub}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!requireAuth("/")) return;
            setForm((f) => ({ ...f, day: selectedDay }));
            setShowForm((v) => !v);
          }}
          className="inline-flex items-center gap-1 self-start rounded-full bg-primary px-4 py-2 font-label-md text-label-md text-on-primary"
        >
          <Icon name="add" /> {t.dash.addPeriod}
        </button>
      </div>

      {/* Week calendar */}
      <div className="mb-5 rounded-[24px] border border-outline-variant bg-white p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => shiftWeek(-1)}
            className="rounded-full p-2 hover:bg-surface-container"
            aria-label="Previous week"
          >
            <Icon name="chevron_left" />
          </button>
          <div className="text-center">
            <div className="text-sm font-bold text-primary">{t.dash.calendarWeek}</div>
            <div className="text-xs text-on-surface-variant">
              {new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
                day: "numeric",
                month: "short",
              }).format(weekDays[0])}{" "}
              –{" "}
              {new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(weekDays[6])}
            </div>
          </div>
          <button
            type="button"
            onClick={() => shiftWeek(1)}
            className="rounded-full p-2 hover:bg-surface-container"
            aria-label="Next week"
          >
            <Icon name="chevron_right" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekDays.map((d, i) => {
            const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            const isToday = key === todayKey;
            const count = periods.filter((p) => p.day === i).length;
            const selected = selectedDay === i;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDay(i)}
                className={`rounded-2xl px-1 py-2 text-center transition sm:py-3 ${
                  selected
                    ? "bg-primary text-white"
                    : isToday
                      ? "bg-primary-fixed text-on-primary-fixed-variant"
                      : "bg-surface-container-low hover:bg-surface-container"
                }`}
              >
                <div className="text-[10px] font-semibold sm:text-xs">{dayNames[i]}</div>
                <div className="text-base font-bold sm:text-lg">{d.getDate()}</div>
                <div
                  className={`mx-auto mt-1 h-1.5 w-1.5 rounded-full ${
                    count > 0
                      ? selected
                        ? "bg-white"
                        : "bg-primary"
                      : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {showForm && (
        <div className="mb-5 space-y-3 rounded-[20px] border border-dashed border-outline-variant bg-white p-4 sm:p-5">
          <h3 className="font-semibold text-on-surface">{t.dash.addPeriod}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block text-xs text-on-surface-variant">
              {t.dash.periodDay}
              <select
                value={form.day}
                onChange={(e) => setForm((f) => ({ ...f, day: Number(e.target.value) }))}
                className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
              >
                {dayNames.map((name, i) => (
                  <option key={name} value={i}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-on-surface-variant">
              {t.dash.periodStart}
              <input
                type="time"
                value={form.start}
                onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs text-on-surface-variant">
              {t.dash.periodEnd}
              <input
                type="time"
                value={form.end}
                onChange={(e) => setForm((f) => ({ ...f, end: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs text-on-surface-variant sm:col-span-2">
              {t.dash.periodSubject}
              <input
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
                placeholder="คณิตศาสตร์ ม.6"
              />
            </label>
            <label className="block text-xs text-on-surface-variant">
              {t.dash.periodRoom}
              <input
                value={form.room}
                onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
                placeholder="ห้อง 6/1"
              />
            </label>
            <label className="block text-xs text-on-surface-variant sm:col-span-2 lg:col-span-3">
              {t.dash.periodClass}
              <input
                value={form.className}
                onChange={(e) => setForm((f) => ({ ...f, className: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
                placeholder="KLM4NP"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addPeriod}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
            >
              {t.dash.addPeriod}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold"
            >
              {t.dash.cancelPeriod}
            </button>
          </div>
        </div>
      )}

      {/* Period list for selected day */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-on-surface">
          {t.dash.periodsFor} {dayNames[selectedDay]}
        </h3>
        {dayPeriods.length === 0 ? (
          <p className="rounded-2xl bg-surface-container p-5 text-sm text-on-surface-variant">
            {t.dash.noPeriods}
          </p>
        ) : (
          dayPeriods.map((p) => (
            <div
              key={p.id}
              className="cloud-shadow flex items-start gap-3 rounded-2xl bg-white p-4 sm:items-center sm:gap-4 md:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                <Icon name="school" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 font-mono text-xs font-semibold text-primary">
                  {p.start} – {p.end}
                </div>
                <p className="font-semibold text-on-surface">{p.subject}</p>
                <p className="text-sm text-on-surface-variant">
                  {[p.room, p.className].filter(Boolean).join(" · ") || "—"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removePeriod(p.id)}
                className="rounded-full p-2 text-error hover:bg-error-container"
                aria-label={t.dash.removePeriod}
              >
                <Icon name="delete" />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
