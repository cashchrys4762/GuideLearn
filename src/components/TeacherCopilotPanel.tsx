"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { useAutosave } from "@/lib/autosave";
import {
  type Classroom,
  type CopilotInsightStudent,
  buildCopilotInsights,
} from "@/lib/classroom";

type SoftSkill = { name: string; score: number };

type CopilotStudent = {
  id: string;
  name: string;
  nickname: string;
  age: number;
  avatar: string;
  mathScore: number;
  aiScore: number;
  softSkills: SoftSkill[];
  strengths: string[];
  weaknesses: string[];
  notes: string;
  evaluated: boolean;
  /** True when profile came from a classroom roster (not manual-only). */
  fromClass?: boolean;
};

const STORAGE = "guidelearn-copilot-students-v2";

const emptySoftSkills: SoftSkill[] = [
  { name: "การคิดเชิงวิเคราะห์", score: 0 },
  { name: "การทำงานร่วมกัน", score: 0 },
  { name: "ความคิดสร้างสรรค์", score: 0 },
  { name: "การสื่อสาร", score: 0 },
];

const AVATARS = ["🧑‍🎓", "👦🏻", "👧🏻", "🧒🏻", "👨🏻‍🎓", "👩🏻‍🎓"];

/** Seeded assessments aligned with demo classroom roster + work status. */
const DEMO_PROFILES: Record<string, Omit<CopilotStudent, "id" | "fromClass">> = {
  "stu-demo-1": {
    name: "กุลธิดา ใจดี",
    nickname: "น้องฟ้า",
    age: 17,
    avatar: "👩🏻‍🎓",
    mathScore: 82,
    aiScore: 74,
    softSkills: [
      { name: "การคิดเชิงวิเคราะห์", score: 85 },
      { name: "การทำงานร่วมกัน", score: 78 },
      { name: "ความคิดสร้างสรรค์", score: 70 },
      { name: "การสื่อสาร", score: 72 },
    ],
    strengths: ["คิดวิเคราะห์เก่ง", "ขยันทบทวน"],
    weaknesses: ["ยังมีงานค้าง ควรติดตามกำหนดส่ง"],
    notes: "เรียนดีโดยรวม แต่ยังมีงานที่ยังไม่ส่ง — คุยเรื่องการจัดการเวลา",
    evaluated: true,
  },
  "stu-demo-2": {
    name: "ณัฐพล สุขใจ",
    nickname: "น้องต้น",
    age: 17,
    avatar: "👨🏻‍🎓",
    mathScore: 48,
    aiScore: 40,
    softSkills: [
      { name: "การคิดเชิงวิเคราะห์", score: 45 },
      { name: "การทำงานร่วมกัน", score: 55 },
      { name: "ความคิดสร้างสรรค์", score: 50 },
      { name: "การสื่อสาร", score: 42 },
    ],
    strengths: ["พยายามถามเมื่อไม่เข้าใจ"],
    weaknesses: ["งานค้างหลายชิ้น", "ต้องการติวเพิ่ม"],
    notes: "ควรติดตามใกล้ชิด — นัดคุยและช่วยวางแผนส่งงาน",
    evaluated: true,
  },
  "stu-demo-3": {
    name: "พิมพ์ใจ รุ่งเรือง",
    nickname: "น้องพิมพ์",
    age: 17,
    avatar: "👧🏻",
    mathScore: 94,
    aiScore: 88,
    softSkills: [
      { name: "การคิดเชิงวิเคราะห์", score: 92 },
      { name: "การทำงานร่วมกัน", score: 86 },
      { name: "ความคิดสร้างสรรค์", score: 80 },
      { name: "การสื่อสาร", score: 84 },
    ],
    strengths: ["ส่งงานครบ", "คะแนนสูง", "อธิบายขั้นตอนชัด"],
    weaknesses: ["อาจท้าทายด้วยงานเสริมเพิ่มเติม"],
    notes: "ไปได้ดี — พิจารณางานท้าทายหรือให้ช่วยเพื่อนที่ต้องการติดตาม",
    evaluated: true,
  },
};

function splitList(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function loadStored(): CopilotStudent[] {
  try {
    const raw = window.localStorage.getItem(STORAGE);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CopilotStudent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function stubFromRoster(id: string, name: string): CopilotStudent {
  const demo = DEMO_PROFILES[id];
  if (demo) return { id, ...demo, fromClass: true };
  return {
    id,
    name,
    nickname: "-",
    age: 15,
    avatar: AVATARS[0]!,
    mathScore: 0,
    aiScore: 0,
    softSkills: emptySoftSkills.map((s) => ({ ...s, score: 0 })),
    strengths: [],
    weaknesses: [],
    notes: "ยังไม่มีผลการประเมิน",
    evaluated: false,
    fromClass: true,
  };
}

/** Merge classroom roster with saved assessments so IDs/names stay in sync. */
function mergeWithRoster(stored: CopilotStudent[], classes: Classroom[]): CopilotStudent[] {
  const byId = new Map(stored.map((s) => [s.id, s]));
  const rosterIds = new Set<string>();
  const merged: CopilotStudent[] = [];

  for (const cls of classes) {
    for (const m of cls.members) {
      if (rosterIds.has(m.id)) continue;
      rosterIds.add(m.id);
      const existing = byId.get(m.id);
      const seed = stubFromRoster(m.id, m.name);
      if (existing) {
        const keepDemoScores =
          !existing.evaluated && DEMO_PROFILES[m.id] ? DEMO_PROFILES[m.id]! : null;
        merged.push({
          ...seed,
          ...existing,
          ...(keepDemoScores ?? {}),
          id: m.id,
          name: existing.evaluated
            ? existing.name?.trim() || m.name
            : seed.name || m.name,
          fromClass: true,
          evaluated: existing.evaluated || Boolean(keepDemoScores?.evaluated),
        });
        byId.delete(m.id);
      } else {
        merged.push(seed);
      }
    }
  }

  for (const extra of byId.values()) {
    if (!rosterIds.has(extra.id)) {
      merged.push({ ...extra, fromClass: false });
    }
  }

  return merged;
}

function ScoreBar({ title, score, icon }: { title: string; score: number; icon: string }) {
  return (
    <div className="rounded-2xl border border-outline-variant/70 bg-surface-container-low p-5">
      <p className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
        <Icon name={icon} className="text-[18px] text-primary" />
        {title}
      </p>
      <p className="mt-2 text-3xl font-black text-primary">{score}%</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-[#f4a231]"
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="mb-1 block text-xs font-semibold text-on-surface-variant">{children}</label>;
}

const inputClass =
  "w-full rounded-xl border border-outline-variant bg-white px-3 py-2.5 text-sm text-on-surface outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_rgba(33,112,228,0.12)]";

type Props = {
  classes: Classroom[];
  focusStudentId?: string | null;
  onFocusHandled?: () => void;
};

export function TeacherCopilotPanel({ classes, focusStudentId, onFocusHandled }: Props) {
  const { triggerSave } = useAutosave();
  const [students, setStudents] = useState<CopilotStudent[]>([]);
  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState<CopilotStudent | null>(null);

  const [formName, setFormName] = useState("");
  const [formNickname, setFormNickname] = useState("");
  const [formAge, setFormAge] = useState(15);
  const [formAvatar, setFormAvatar] = useState(AVATARS[0]!);
  const [formMath, setFormMath] = useState(0);
  const [formAi, setFormAi] = useState(0);
  const [formStrength, setFormStrength] = useState("");
  const [formWeakness, setFormWeakness] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formSoftSkills, setFormSoftSkills] = useState<SoftSkill[]>(emptySoftSkills);

  const insightsById = useMemo(() => {
    const map = new Map<string, CopilotInsightStudent>();
    for (const s of buildCopilotInsights(classes).students) map.set(s.id, s);
    return map;
  }, [classes]);

  useEffect(() => {
    const merged = mergeWithRoster(loadStored(), classes);
    setStudents(merged);
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(merged));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [classes]);

  useEffect(() => {
    if (!focusStudentId || !ready) return;
    if (students.some((s) => s.id === focusStudentId)) {
      setSelectedId(focusStudentId);
      setIsAdding(false);
      setEditing(null);
      onFocusHandled?.();
      document.getElementById("copilot-assess")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [focusStudentId, ready, students, onFocusHandled]);

  const selected = students.find((s) => s.id === selectedId) ?? null;
  const selectedInsight = selected ? insightsById.get(selected.id) : undefined;

  const persist = (next: CopilotStudent[]) => {
    setStudents(next);
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    triggerSave();
  };

  const resetForm = () => {
    setFormName("");
    setFormNickname("");
    setFormAge(15);
    setFormAvatar(AVATARS[0]!);
    setFormMath(0);
    setFormAi(0);
    setFormStrength("");
    setFormWeakness("");
    setFormNotes("");
    setFormSoftSkills(emptySoftSkills.map((s) => ({ ...s, score: 0 })));
  };

  const openAddForm = () => {
    resetForm();
    setEditing(null);
    setSelectedId(null);
    setIsAdding(true);
  };

  const openEditForm = (student: CopilotStudent) => {
    setEditing(student);
    setFormName(student.name);
    setFormNickname(student.nickname);
    setFormAge(student.age);
    setFormAvatar(student.avatar);
    setFormMath(student.mathScore);
    setFormAi(student.aiScore);
    setFormStrength(student.strengths.join(", "));
    setFormWeakness(student.weaknesses.join(", "));
    setFormNotes(student.notes === "ยังไม่มีผลการประเมิน" ? "" : student.notes);
    setFormSoftSkills(student.softSkills.map((s) => ({ ...s })));
    setSelectedId(null);
    setIsAdding(true);
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    const student: CopilotStudent = {
      id: `stu-${Date.now()}`,
      name: formName.trim(),
      nickname: formNickname.trim() || "-",
      age: formAge,
      avatar: formAvatar,
      mathScore: 0,
      aiScore: 0,
      softSkills: emptySoftSkills.map((s) => ({ ...s, score: 0 })),
      strengths: [],
      weaknesses: [],
      notes: "ยังไม่มีผลการประเมิน",
      evaluated: false,
      fromClass: false,
    };
    persist([student, ...students]);
    setIsAdding(false);
    resetForm();
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!editing || !formName.trim()) return;
    const evaluated =
      formMath > 0 || formAi > 0 || formSoftSkills.some((s) => s.score > 0);
    const updated: CopilotStudent = {
      ...editing,
      name: formName.trim(),
      nickname: formNickname.trim() || "-",
      age: formAge,
      avatar: formAvatar,
      mathScore: formMath,
      aiScore: formAi,
      softSkills: formSoftSkills,
      strengths: splitList(formStrength),
      weaknesses: splitList(formWeakness),
      notes: formNotes.trim() || (evaluated ? "ไม่มีบันทึกเพิ่มเติม" : "ยังไม่มีผลการประเมิน"),
      evaluated,
    };
    persist(students.map((s) => (s.id === editing.id ? updated : s)));
    setEditing(null);
    setIsAdding(false);
    setSelectedId(updated.id);
    resetForm();
  };

  const handleDelete = (student: CopilotStudent) => {
    if (student.fromClass) {
      window.alert(
        "นักเรียนคนนี้อยู่ในชั้นเรียนแล้ว — ไม่สามารถลบจาก Co-pilot ได้ จัดการสมาชิกที่หน้าชั้นเรียน",
      );
      return;
    }
    const ok = window.confirm(
      `ต้องการลบข้อมูลของ "${student.name}" ใช่หรือไม่?\nข้อมูลและผลการประเมินจะถูกลบ`,
    );
    if (!ok) return;
    persist(students.filter((s) => s.id !== student.id));
    setSelectedId(null);
  };

  const updateSoftSkill = (index: number, score: number) => {
    setFormSoftSkills((prev) =>
      prev.map((skill, i) => (i === index ? { ...skill, score } : skill)),
    );
  };

  if (!ready) return null;

  const form = (
    <form
      onSubmit={editing ? handleEdit : handleAdd}
      className="mt-5 space-y-5 rounded-[22px] border border-outline-variant bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-on-surface">
            {editing ? "แก้ไขข้อมูลนักเรียน" : "เพิ่มข้อมูลนักเรียน"}
          </h3>
          <p className="mt-1 text-xs text-on-surface-variant">ข้อมูลสามารถแก้ไขได้ภายหลัง</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsAdding(false);
            setEditing(null);
          }}
          className="rounded-full bg-surface-container p-2 hover:bg-surface-container-high"
          aria-label="ปิดฟอร์ม"
        >
          <Icon name="close" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel>ชื่อ-นามสกุล</FieldLabel>
          <input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="เช่น กุลธิดา ใจดี"
            className={inputClass}
            required
          />
        </div>
        <div>
          <FieldLabel>ชื่อเล่น</FieldLabel>
          <input
            value={formNickname}
            onChange={(e) => setFormNickname(e.target.value)}
            placeholder="เช่น น้องฟ้า"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>อายุ</FieldLabel>
          <input
            type="number"
            min={1}
            max={30}
            value={formAge}
            onChange={(e) => setFormAge(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>ไอคอนนักเรียน</FieldLabel>
          <select
            value={formAvatar}
            onChange={(e) => setFormAvatar(e.target.value)}
            className={inputClass}
          >
            {AVATARS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!editing && (
        <div className="rounded-2xl border border-primary/20 bg-primary-fixed/40 p-4">
          <p className="text-sm font-bold text-primary">สถานะการประเมิน</p>
          <p className="mt-1 text-xs text-on-surface-variant">
            นักเรียนใหม่เริ่มที่ 0 คะแนน จนกว่าจะมีข้อมูลจากการเรียนรู้หรือแบบประเมิน
          </p>
        </div>
      )}

      {editing && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-primary-fixed/35 p-4">
              <FieldLabel>ผลการเรียนวิชาการ</FieldLabel>
              <input
                type="number"
                min={0}
                max={100}
                value={formMath}
                onChange={(e) => setFormMath(Number(e.target.value))}
                className={inputClass}
              />
              <p className="mt-1 text-xs text-on-surface-variant">
                {formMath === 0 ? "ยังไม่มีผลการประเมิน" : `${formMath}%`}
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-fixed/50 p-4">
              <FieldLabel>AI & Technology</FieldLabel>
              <input
                type="number"
                min={0}
                max={100}
                value={formAi}
                onChange={(e) => setFormAi(Number(e.target.value))}
                className={inputClass}
              />
              <p className="mt-1 text-xs text-on-surface-variant">
                {formAi === 0 ? "ยังไม่มีผลการประเมิน" : `${formAi}%`}
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-on-surface">ทักษะ Soft Skills</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {formSoftSkills.map((skill, index) => (
                <div key={skill.name} className="rounded-xl bg-surface-container-low p-4">
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span>{skill.name}</span>
                    <span>{skill.score === 0 ? "ยังไม่ประเมิน" : `${skill.score}%`}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={skill.score}
                    onChange={(e) => updateSoftSkill(index, Number(e.target.value))}
                    className="w-full accent-[var(--color-primary)]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>จุดเด่น (คั่นด้วย ,)</FieldLabel>
              <input
                value={formStrength}
                onChange={(e) => setFormStrength(e.target.value)}
                className={inputClass}
                placeholder="เช่น คิดวิเคราะห์เก่ง, ขยัน"
              />
            </div>
            <div>
              <FieldLabel>จุดที่ต้องพัฒนา (คั่นด้วย ,)</FieldLabel>
              <input
                value={formWeakness}
                onChange={(e) => setFormWeakness(e.target.value)}
                className={inputClass}
                placeholder="เช่น การสื่อสาร, การจัดการเวลา"
              />
            </div>
          </div>

          <div>
            <FieldLabel>บันทึกเพิ่มเติม</FieldLabel>
            <textarea
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              className={`${inputClass} min-h-[100px]`}
              placeholder="บันทึกข้อมูลเพิ่มเติมเกี่ยวกับนักเรียน..."
            />
          </div>
        </>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => {
            setIsAdding(false);
            setEditing(null);
          }}
          className="rounded-full border border-outline-variant px-5 py-2.5 text-sm font-semibold"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="btn-cute rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-on-primary"
        >
          {editing ? "บันทึกการแก้ไข" : "เพิ่มนักเรียน"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6" id="copilot-assess">
      <section className="cloud-shadow rounded-[24px] border border-white/80 bg-gradient-to-r from-secondary-fixed/50 via-white to-primary-fixed/50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Icon name="psychology" className="text-primary text-[28px]" filled />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-primary sm:text-2xl">
                วิเคราะห์ศักยภาพนักเรียน
              </h2>
              <p className="text-xs text-on-surface-variant sm:text-sm">
                รายชื่อผูกกับชั้นเรียน · ประเมินทักษะ และดูจุดเด่น/จุดที่ควรพัฒนา
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={isAdding ? () => { setIsAdding(false); setEditing(null); } : openAddForm}
            className="btn-cute inline-flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-on-primary"
          >
            <Icon name={isAdding ? "close" : "person_add"} />
            {isAdding ? "ปิดฟอร์ม" : "เพิ่มนักเรียน"}
          </button>
        </div>
        {isAdding && form}
      </section>

      {selected ? (
        <section className="cloud-shadow space-y-6 rounded-[24px] border border-white/80 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-surface-container-low text-4xl">
                {selected.avatar}
              </div>
              <div>
                <h3 className="text-xl font-black text-on-surface sm:text-2xl">{selected.name}</h3>
                <p className="text-xs text-on-surface-variant">
                  ชื่อเล่น {selected.nickname} · อายุ {selected.age} ปี
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openEditForm(selected)}
                className="rounded-full bg-primary-fixed px-4 py-2 text-sm font-bold text-on-primary-fixed-variant"
              >
                แก้ไข
              </button>
              {!selected.fromClass && (
                <button
                  type="button"
                  onClick={() => handleDelete(selected)}
                  className="rounded-full bg-error-container px-4 py-2 text-sm font-bold text-on-error-container"
                >
                  ลบ
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-full bg-surface-container px-4 py-2 text-sm font-bold"
              >
                กลับ
              </button>
            </div>
          </div>

          {selectedInsight && (
            <div
              className={`rounded-2xl px-4 py-3 text-sm ${
                selectedInsight.missing > 0 || selectedInsight.progress < 50
                  ? "bg-error-container/40"
                  : selectedInsight.progress >= 75
                    ? "bg-tertiary-fixed/50"
                    : "bg-surface-container-low"
              }`}
            >
              <p className="font-bold text-on-surface">สถานะจากชั้นเรียน</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                {selectedInsight.classes.join(", ")} · ส่งงานแล้ว {selectedInsight.progress}% ·
                งานค้าง {selectedInsight.missing} · ส่งแล้ว {selectedInsight.turnedIn}
              </p>
            </div>
          )}

          {!selected.evaluated ? (
            <div className="rounded-2xl border border-primary/20 bg-primary-fixed/30 p-6 text-center">
              <Icon name="assignment" className="mx-auto mb-2 text-[36px] text-primary" />
              <h4 className="font-extrabold text-on-surface">ยังไม่มีผลการประเมิน</h4>
              <p className="mx-auto mt-1 max-w-md text-xs text-on-surface-variant">
                กดแก้ไขเพื่อใส่คะแนนและวิเคราะห์จุดเด่น/จุดที่ต้องพัฒนา
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <ScoreBar title="ผลการเรียนวิชาการ" score={selected.mathScore} icon="school" />
                <ScoreBar title="AI & Technology" score={selected.aiScore} icon="smart_toy" />
              </div>

              <div className="rounded-2xl bg-surface-container-low p-5">
                <h4 className="mb-4 font-bold text-on-surface">Soft Skills</h4>
                <div className="space-y-4">
                  {selected.softSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex justify-between text-xs font-semibold">
                        <span>{skill.name}</span>
                        <span>{skill.score}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-secondary-container"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-tertiary-fixed/50 p-4">
                  <h4 className="mb-2 font-bold text-tertiary">จุดเด่น</h4>
                  {selected.strengths.length ? (
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      {selected.strengths.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-on-surface-variant">ยังไม่มีข้อมูล</p>
                  )}
                </div>
                <div className="rounded-2xl bg-secondary-fixed/45 p-4">
                  <h4 className="mb-2 font-bold text-secondary">จุดที่ต้องพัฒนา</h4>
                  {selected.weaknesses.length ? (
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      {selected.weaknesses.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-on-surface-variant">ยังไม่มีข้อมูล</p>
                  )}
                </div>
              </div>

              {selected.notes && (
                <div className="rounded-2xl border border-outline-variant bg-white p-4">
                  <h4 className="mb-1 text-sm font-bold">บันทึกครู</h4>
                  <p className="text-sm text-on-surface-variant whitespace-pre-wrap">{selected.notes}</p>
                </div>
              )}
            </>
          )}
        </section>
      ) : students.length === 0 ? (
        <section className="cloud-shadow rounded-[24px] border border-dashed border-outline-variant bg-white p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed text-3xl">
            🧑‍🎓
          </div>
          <h3 className="text-xl font-extrabold text-on-surface">ยังไม่มีข้อมูลนักเรียน</h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            สร้างชั้นเรียนแล้วให้นักเรียนเข้า หรือกด “เพิ่มนักเรียน” เพื่อบันทึกและประเมินศักยภาพ
          </p>
          <button
            type="button"
            onClick={openAddForm}
            className="btn-cute mt-5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-on-primary"
          >
            เพิ่มนักเรียนคนแรก
          </button>
        </section>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => {
            const insight = insightsById.get(student.id);
            return (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedId(student.id)}
                className="card-lift cloud-shadow rounded-[22px] border border-white/80 bg-white p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-low text-3xl">
                    {student.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-extrabold text-on-surface">{student.name}</h3>
                    <p className="text-xs text-on-surface-variant">{student.nickname}</p>
                  </div>
                </div>
                {insight && (
                  <p className="mt-3 text-[11px] text-on-surface-variant">
                    {insight.classes[0] ?? "ชั้นเรียน"} · ส่งงาน {insight.progress}%
                    {insight.missing > 0 ? ` · ค้าง ${insight.missing}` : ""}
                  </p>
                )}
                <div className="mt-3 border-t border-surface-dim pt-3">
                  {!student.evaluated ? (
                    <span className="inline-flex rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold text-on-primary-fixed-variant">
                      ยังไม่ประเมิน
                    </span>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-on-surface-variant">วิชาการ</p>
                        <p className="font-extrabold text-primary">{student.mathScore}%</p>
                      </div>
                      <div>
                        <p className="text-on-surface-variant">AI</p>
                        <p className="font-extrabold text-secondary">{student.aiScore}%</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-xs font-bold text-primary">ดูประวัติและรายละเอียด →</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
