"use client";

import Image from "next/image";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { assets } from "@/lib/assets";

const initialRequirements = [
  { id: "transcripts", label: "Submit High School Transcripts", done: true },
  { id: "essay", label: "Complete Personal Essay", done: true },
  { id: "mock-exam", label: "Take Mock Math Exam", done: false, urgent: true },
  { id: "letters", label: "Prepare Recommendation Letters", done: false },
  { id: "portfolio", label: "Finalize Activity Portfolio Log", done: true },
];

export default function MissionsPage() {
  const [requirements, setRequirements] = useState(initialRequirements);
  const doneCount = requirements.filter((r) => r.done).length;

  const toggleRequirement = (id: string) => {
    setRequirements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  };

  return (
    <AppShell>
      <main className="w-full flex-1 px-container-margin pt-6 pb-32 md:ml-64 md:px-12 md:pt-12 md:pb-12">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 text-on-secondary-fixed">
              <Icon name="star" filled className="text-sm" />
              <span className="font-label-sm text-label-sm tracking-wider uppercase">
                Target Goal
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-2 text-primary">
              Computer Science Faculty
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-2">
              <Icon name="school" />
              Top Tier University
            </p>
          </div>
          <div className="cloud-shadow relative h-32 w-full shrink-0 overflow-hidden rounded-[2rem] md:h-40 md:w-64">
            <Image
              src={assets.mountainPath}
              alt="Mountain path towards a goal"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
        </div>

        <section className="mb-section-gap">
          <h2 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-3">
            <Icon name="flag" filled className="text-primary" />
            Admission Rounds
          </h2>
          <div className="grid grid-cols-1 gap-base md:grid-cols-3 md:gap-gutter">
            <div className="cloud-shadow group relative overflow-hidden rounded-[24px] bg-surface-container-lowest transition-transform duration-300 hover:-translate-y-1">
              <div className="h-2 w-full bg-secondary-container" />
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                    <Icon name="draw" filled />
                  </div>
                  <span className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">
                    Round 1
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-1">
                  Portfolio
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Showcase your best projects.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Progress</span>
                    <span className="text-secondary-container">100%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container">
                    <div className="h-full w-full rounded-full bg-secondary-container" />
                  </div>
                </div>
              </div>
            </div>

            <div className="cloud-shadow group relative overflow-hidden rounded-[24px] border-2 border-primary bg-surface-container-lowest transition-transform duration-300 hover:-translate-y-1">
              <div className="h-2 w-full bg-primary-container" />
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed">
                    <Icon name="menu_book" filled />
                  </div>
                  <span className="rounded-full bg-primary-container px-3 py-1 font-label-sm text-label-sm text-on-primary-container shadow-sm">
                    Current
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-1">Quota</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Written exams and interviews.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Progress</span>
                    <span className="text-primary-container">45%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container">
                    <div className="relative h-full w-[45%] rounded-full bg-primary-container">
                      <div className="absolute top-0 right-0 bottom-0 w-3 animate-pulse rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cloud-shadow group relative overflow-hidden rounded-[24px] bg-surface-container-lowest opacity-70 transition-transform duration-300 hover:-translate-y-1">
              <div className="h-2 w-full bg-tertiary-container" />
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant">
                    <Icon name="how_to_reg" filled />
                  </div>
                  <span className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">
                    Round 3
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-1">
                  Admission
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Final national selection test.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Locked</span>
                    <span className="text-tertiary-container">0%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container">
                    <div className="h-full w-0 rounded-full bg-tertiary-container" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-section-gap grid grid-cols-1 gap-gutter lg:grid-cols-2">
          <section className="cloud-shadow relative overflow-hidden rounded-[24px] bg-surface-container-lowest p-6 md:p-8">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-tertiary-fixed/30 mix-blend-multiply blur-2xl" />
            <div className="relative z-10 mb-6 flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-on-background flex items-center gap-3">
                <Icon name="task_alt" filled className="text-tertiary" />
                Requirements
              </h2>
              <span className="rounded-full bg-tertiary-fixed px-3 py-1 font-label-sm text-label-sm text-on-tertiary-fixed">
                {doneCount} of {requirements.length} Done
              </span>
            </div>
            <div className="relative z-10 space-y-3">
              {requirements.map((item) => (
                <label
                  key={item.id}
                  className={`kawaii-checkbox flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                    item.urgent && !item.done
                      ? "border-primary-fixed bg-primary-fixed/30 hover:bg-primary-fixed/50"
                      : "border-surface-container-high bg-surface hover:bg-surface-container"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={item.done}
                    onChange={() => toggleRequirement(item.id)}
                  />
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-surface-container-lowest transition-colors ${
                      item.urgent && !item.done ? "border-primary" : "border-outline-variant"
                    }`}
                  >
                    <Icon
                      name="check"
                      className="text-on-primary-container text-sm scale-50 opacity-0 transition-all duration-200"
                    />
                  </div>
                  <span
                    className={`font-body-md text-body-md text-on-background flex-1 ${
                      item.done
                        ? "line-through opacity-60"
                        : item.urgent
                          ? "font-semibold"
                          : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.urgent && !item.done && (
                    <span className="rounded-md bg-error-container px-2 py-1 font-label-sm text-label-sm text-on-error-container">
                      Urgent
                    </span>
                  )}
                </label>
              ))}
            </div>
            <button
              type="button"
              className="chunky-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-surface-variant px-6 py-4 font-label-md text-label-md text-on-surface-variant hover:bg-surface-dim"
            >
              <Icon name="add" /> Add Custom Task
            </button>
          </section>

          <section className="cloud-shadow-lg rounded-[24px] bg-surface-container-lowest p-6 md:p-8">
            <h2 className="font-headline-md text-headline-md text-on-background mb-8 flex items-center gap-3">
              <Icon name="calendar_month" filled className="text-secondary-container" />
              Upcoming Deadlines
            </h2>
            <div className="relative space-y-8 pl-6">
              <div className="absolute top-2 bottom-6 left-10 w-[4px] rounded-full bg-surface-container" />
              <div className="absolute top-2 left-10 h-1/3 w-[4px] rounded-full bg-secondary-container" />

              <div className="relative flex items-start gap-6">
                <div className="z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-secondary-container shadow-sm">
                  <Icon name="check" className="text-[16px] text-white" />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm mb-1 block text-secondary-container">
                    Oct 15, 2023
                  </span>
                  <h4 className="font-headline-md text-body-lg text-on-background mb-1">
                    Portfolio Submission
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    All documents uploaded.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="ring-primary-fixed z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary shadow-sm ring-4">
                  <Icon name="priority_high" className="animate-pulse text-[16px] text-white" />
                </div>
                <div className="w-full rounded-2xl border border-primary-fixed/50 bg-primary-fixed/20 p-4">
                  <span className="font-label-sm text-label-sm mb-1 block text-primary">
                    Nov 20, 2023
                  </span>
                  <h4 className="font-headline-md text-body-lg text-on-background mb-1">
                    Quota Registration
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Pay fees and select test center.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6 opacity-60">
                <div className="z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-surface-container-high shadow-sm" />
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mb-1 block">
                    Dec 05, 2023
                  </span>
                  <h4 className="font-headline-md text-body-lg text-on-background mb-1">
                    Written Exam
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Mathematics and Logic test.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
