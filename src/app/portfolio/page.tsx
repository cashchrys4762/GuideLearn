"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { PageMain } from "@/components/PageMain";
import { RequireAuth } from "@/components/RequireAuth";
import { usePageScript } from "@/lib/a11y";
import { useAutosave } from "@/lib/autosave";
import { useI18n } from "@/lib/i18n";

type Work = { id: string; title: string; category: string };

export default function PortfolioPage() {
  const { t, locale } = useI18n();
  const { triggerSave } = useAutosave();
  usePageScript(`${t.tools.portfolioTitle}. ${t.tools.portfolioBody}`, true);

  const initialWorks: Work[] =
    locale === "th"
      ? [
          { id: "w1", title: "แอปติดตามการบ้าน", category: "โปรเจกต์" },
          { id: "w2", title: "อาสาติวคณิต ม.ต้น", category: "บริการสังคม" },
          { id: "w3", title: "รางวัลโอลิมปิกวิทยาการคอมพิวเตอร์", category: "รางวัล" },
          { id: "w4", title: "ชมรมหุ่นยนต์ — หัวหน้าทีม", category: "ภาวะผู้นำ" },
        ]
      : [
          { id: "w1", title: "Homework tracker app", category: "Project" },
          { id: "w2", title: "Volunteer math tutoring", category: "Service" },
          { id: "w3", title: "CS olympiad award", category: "Award" },
          { id: "w4", title: "Robotics club — team lead", category: "Leadership" },
        ];

  const [works, setWorks] = useState<Work[]>(initialWorks);
  const [reflection, setReflection] = useState("");
  const progress = 68;

  const addWork = () => {
    const title =
      locale === "th" ? `ผลงานใหม่ ${works.length + 1}` : `New work ${works.length + 1}`;
    const category = locale === "th" ? "อื่น ๆ" : "Other";
    setWorks((prev) => [
      ...prev,
      { id: `w-${Date.now()}`, title, category },
    ]);
    triggerSave();
  };

  return (
    <AppShell>
      <RequireAuth>
        <PageMain id="main-content">
          <header className="mb-8 max-w-3xl">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary">
              {t.tools.portfolioTitle}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t.tools.portfolioBody}
            </p>
          </header>

          <section className="cloud-shadow mb-8 rounded-[24px] bg-white p-6 md:p-8">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-headline-md text-[20px] text-on-surface">
                {t.tools.readiness}
              </h2>
              <span className="font-headline-md text-primary">{progress}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-[#f4a231]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 font-label-sm text-label-sm text-on-surface-variant">
              {t.platform.readinessShort}
            </p>
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {t.navExtra.portfolio}
              </h2>
              <button
                type="button"
                onClick={addWork}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-label-md text-label-md text-on-primary"
              >
                <Icon name="add" />
                {locale === "th" ? "เพิ่มผลงาน" : "Add work"}
              </button>
            </div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {works.map((work) => (
                <li
                  key={work.id}
                  className="cloud-shadow flex items-start gap-4 rounded-[24px] bg-white p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
                    <Icon name="folder_special" />
                  </div>
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-secondary-fixed/60 px-3 py-1 font-label-sm text-label-sm text-on-secondary-fixed-variant">
                      {work.category}
                    </span>
                    <p className="font-headline-md text-[18px] text-on-surface">{work.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="cloud-shadow rounded-[24px] bg-white p-6 md:p-8">
            <h2 className="font-headline-md text-[20px] text-on-surface mb-2">
              {locale === "th" ? "การสะท้อนคิด" : "Reflection"}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              {locale === "th"
                ? "เขียนสิ่งที่เรียนรู้จากกิจกรรมเหล่านี้ และเหตุผลที่สำคัญต่อเป้าหมายคณะ"
                : "Note what you learned from these activities and why they matter for your faculty goal."}
            </p>
            <textarea
              value={reflection}
              onChange={(e) => {
                setReflection(e.target.value);
                triggerSave();
              }}
              rows={5}
              placeholder={
                locale === "th"
                  ? "เช่น โปรเจกต์นี้สอนให้ฉันแก้ปัญหาเป็นระบบ…"
                  : "e.g. This project taught me to debug systematically…"
              }
              className="w-full rounded-2xl border-2 border-surface-dim bg-surface-container-low p-4 font-body-md text-body-md text-on-surface outline-none focus:border-primary focus:bg-white"
            />
          </section>
        </PageMain>
      </RequireAuth>
    </AppShell>
  );
}
