"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "./auth";

export type Material = {
  id: string;
  title: string;
  type: "file" | "link";
  url: string;
  createdAt: string;
};

export type SubmissionStatus = "assigned" | "turned_in" | "returned";

export type SubmissionKind = "text" | "link" | "file";

export type Submission = {
  studentId: string;
  studentName: string;
  status: SubmissionStatus;
  kind: SubmissionKind;
  text: string;
  linkUrl?: string;
  fileName?: string;
  turnedInAt?: string;
  score?: number;
  feedback?: string;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  dueAt: string;
  createdAt: string;
  attachments: Material[];
  submissions: Submission[];
};

export type ClassMember = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  /** 0–100 synthetic readiness for Teacher Co-pilot */
  progress: number;
};

export type Classroom = {
  id: string;
  code: string;
  name: string;
  subject: string;
  section: string;
  teacherId: string;
  teacherName: string;
  createdAt: string;
  materials: Material[];
  assignments: Assignment[];
  members: ClassMember[];
};

type ClassroomContextValue = {
  classes: Classroom[];
  ready: boolean;
  createClass: (input: {
    name: string;
    subject: string;
    section: string;
    teacher: User;
  }) => Classroom;
  joinClass: (code: string, student: User) => { ok: true; classroom: Classroom } | { ok: false; error: string };
  getByCode: (code: string) => Classroom | undefined;
  getById: (id: string) => Classroom | undefined;
  myTeaching: (teacherId: string) => Classroom[];
  myEnrolled: (studentId: string) => Classroom[];
  addMaterial: (classId: string, material: Omit<Material, "id" | "createdAt">) => void;
  addAssignment: (
    classId: string,
    input: { title: string; description: string; dueAt: string; attachments?: Material[] },
  ) => Assignment | null;
  submitWork: (
    classId: string,
    assignmentId: string,
    student: User,
    payload: {
      kind: SubmissionKind;
      text: string;
      linkUrl?: string;
      fileName?: string;
    },
  ) => void;
  returnWork: (
    classId: string,
    assignmentId: string,
    studentId: string,
    score: number,
    feedback: string,
  ) => void;
  joinUrl: (code: string) => string;
};

const STORAGE = "guidelearn-classrooms-v1";
const ClassroomContext = createContext<ClassroomContextValue | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function seedClasses(): Classroom[] {
  const now = new Date().toISOString();
  const dueSoon = new Date(Date.now() + 5 * 86400000).toISOString();
  const dueLater = new Date(Date.now() + 12 * 86400000).toISOString();
  return [
    {
      id: "cls-demo-math",
      code: "KLM4NP",
      name: "คณิตศาสตร์ ม.6",
      subject: "คณิตศาสตร์",
      section: "ห้อง 6/1",
      teacherId: "teacher-demo",
      teacherName: "ครูสมชาย",
      createdAt: now,
      materials: [
        {
          id: "mat-1",
          title: "สรุปแคลคูลัสเบื้องต้น (PDF)",
          type: "file",
          url: "#",
          createdAt: now,
        },
        {
          id: "mat-2",
          title: "วิดีโอทบทวนสมการเชิงเส้น",
          type: "link",
          url: "https://www.youtube.com/results?search_query=linear+equations+thai",
          createdAt: now,
        },
      ],
      members: [
        {
          id: "stu-demo-1",
          name: "กุลธิดา",
          email: "kulthida@guidelearn.app",
          joinedAt: now,
          progress: 78,
        },
        {
          id: "stu-demo-2",
          name: "ณัฐพล",
          email: "nattapon@guidelearn.app",
          joinedAt: now,
          progress: 42,
        },
        {
          id: "stu-demo-3",
          name: "พิมพ์ใจ",
          email: "pimjai@guidelearn.app",
          joinedAt: now,
          progress: 91,
        },
      ],
      assignments: [
        {
          id: "asg-1",
          title: "แบบฝึกหัดอินทิกรัล",
          description: "ทำข้อ 1–10 จากใบงาน และอธิบายขั้นตอนสั้นๆ",
          dueAt: dueSoon,
          createdAt: now,
          attachments: [],
          submissions: [
            {
              studentId: "stu-demo-1",
              studentName: "กุลธิดา",
              status: "turned_in",
              kind: "text",
              text: "ส่งครบ 10 ข้อแล้ว ขอ feedback จุดที่ใช้สูตรผิดได้ไหมครับ/ค่ะ",
              turnedInAt: now,
            },
            {
              studentId: "stu-demo-2",
              studentName: "ณัฐพล",
              status: "assigned",
              kind: "text",
              text: "",
            },
            {
              studentId: "stu-demo-3",
              studentName: "พิมพ์ใจ",
              status: "returned",
              kind: "file",
              text: "ส่งครบแล้ว",
              fileName: "integral-hw.pdf",
              turnedInAt: now,
              score: 95,
              feedback: "ดีมาก อธิบายขั้นตอนชัด",
            },
          ],
        },
        {
          id: "asg-2",
          title: "สรุปบทความโจทย์โควตา",
          description: "สรุปแนวโจทย์คณิตโควตา 1 หน้า แล้วแนบลิงก์อ้างอิง",
          dueAt: dueLater,
          createdAt: now,
          attachments: [],
          submissions: [
            {
              studentId: "stu-demo-1",
              studentName: "กุลธิดา",
              status: "assigned",
              kind: "text",
              text: "",
            },
            {
              studentId: "stu-demo-2",
              studentName: "ณัฐพล",
              status: "assigned",
              kind: "text",
              text: "",
            },
            {
              studentId: "stu-demo-3",
              studentName: "พิมพ์ใจ",
              status: "turned_in",
              kind: "link",
              text: "สรุปเรียบร้อย",
              linkUrl: "https://example.com/notes",
              turnedInAt: now,
            },
          ],
        },
      ],
    },
  ];
}

export function ClassroomProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE);
      if (raw) {
        const parsed = JSON.parse(raw) as Classroom[];
        const normalized = (Array.isArray(parsed) && parsed.length ? parsed : seedClasses()).map(
          (c) => ({
            ...c,
            assignments: c.assignments.map((a) => ({
              ...a,
              submissions: a.submissions.map((s) => ({
                ...s,
                kind: s.kind ?? "text",
              })),
            })),
          }),
        );
        setClasses(normalized);
      } else {
        const seeded = seedClasses();
        setClasses(seeded);
        window.localStorage.setItem(STORAGE, JSON.stringify(seeded));
      }
    } catch {
      setClasses(seedClasses());
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Classroom[]) => {
    setClasses(next);
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(next));
    } catch {
      /* quota / private mode */
    }
  }, []);

  const createClass = useCallback(
    (input: { name: string; subject: string; section: string; teacher: User }) => {
      let code = makeCode();
      while (classes.some((c) => c.code === code)) code = makeCode();
      const classroom: Classroom = {
        id: uid("cls"),
        code,
        name: input.name.trim() || "ชั้นเรียนใหม่",
        subject: input.subject.trim() || "ทั่วไป",
        section: input.section.trim() || "",
        teacherId: input.teacher.id,
        teacherName: input.teacher.name,
        createdAt: new Date().toISOString(),
        materials: [],
        assignments: [],
        members: [],
      };
      persist([classroom, ...classes]);
      return classroom;
    },
    [classes, persist],
  );

  const joinClass = useCallback(
    (rawCode: string, student: User) => {
      const code = rawCode.trim().toUpperCase();
      const target = classes.find((c) => c.code === code);
      if (!target) return { ok: false as const, error: "not_found" };
      if (target.teacherId === student.id) return { ok: false as const, error: "is_teacher" };
      if (target.members.some((m) => m.id === student.id || m.email === student.email)) {
        return { ok: true as const, classroom: target };
      }
      const member: ClassMember = {
        id: student.id,
        name: student.name,
        email: student.email,
        joinedAt: new Date().toISOString(),
        progress: 35,
      };
      const next = classes.map((c) => {
        if (c.id !== target.id) return c;
        const assignments = c.assignments.map((a) => ({
          ...a,
          submissions: [
            ...a.submissions,
            {
              studentId: student.id,
              studentName: student.name,
              status: "assigned" as const,
              kind: "text" as const,
              text: "",
            },
          ],
        }));
        return { ...c, members: [...c.members, member], assignments };
      });
      persist(next);
      return { ok: true as const, classroom: next.find((c) => c.id === target.id)! };
    },
    [classes, persist],
  );

  const getByCode = useCallback(
    (code: string) => classes.find((c) => c.code.toUpperCase() === code.trim().toUpperCase()),
    [classes],
  );

  const getById = useCallback((id: string) => classes.find((c) => c.id === id), [classes]);

  const myTeaching = useCallback(
    (teacherId: string) => classes.filter((c) => c.teacherId === teacherId),
    [classes],
  );

  const myEnrolled = useCallback(
    (studentId: string) =>
      classes.filter(
        (c) => c.members.some((m) => m.id === studentId) && c.teacherId !== studentId,
      ),
    [classes],
  );

  const addMaterial = useCallback(
    (classId: string, material: Omit<Material, "id" | "createdAt">) => {
      persist(
        classes.map((c) =>
          c.id !== classId
            ? c
            : {
                ...c,
                materials: [
                  {
                    ...material,
                    id: uid("mat"),
                    createdAt: new Date().toISOString(),
                  },
                  ...c.materials,
                ],
              },
        ),
      );
    },
    [classes, persist],
  );

  const addAssignment = useCallback(
    (
      classId: string,
      input: { title: string; description: string; dueAt: string; attachments?: Material[] },
    ) => {
      const cls = classes.find((c) => c.id === classId);
      if (!cls) return null;
      const assignment: Assignment = {
        id: uid("asg"),
        title: input.title.trim() || "งานใหม่",
        description: input.description.trim(),
        dueAt: input.dueAt || new Date(Date.now() + 7 * 86400000).toISOString(),
        createdAt: new Date().toISOString(),
        attachments: input.attachments ?? [],
        submissions: cls.members.map((m) => ({
          studentId: m.id,
          studentName: m.name,
          status: "assigned" as const,
          kind: "text" as const,
          text: "",
        })),
      };
      persist(
        classes.map((c) =>
          c.id !== classId ? c : { ...c, assignments: [assignment, ...c.assignments] },
        ),
      );
      return assignment;
    },
    [classes, persist],
  );

  const submitWork = useCallback(
    (
      classId: string,
      assignmentId: string,
      student: User,
      payload: {
        kind: SubmissionKind;
        text: string;
        linkUrl?: string;
        fileName?: string;
      },
    ) => {
      persist(
        classes.map((c) => {
          if (c.id !== classId) return c;
          return {
            ...c,
            assignments: c.assignments.map((a) => {
              if (a.id !== assignmentId) return a;
              const nextSub = {
                studentId: student.id,
                studentName: student.name,
                status: "turned_in" as const,
                kind: payload.kind,
                text: payload.text,
                linkUrl: payload.linkUrl,
                fileName: payload.fileName,
                turnedInAt: new Date().toISOString(),
              };
              const exists = a.submissions.some((s) => s.studentId === student.id);
              const submissions = exists
                ? a.submissions.map((s) =>
                    s.studentId === student.id
                      ? {
                          ...s,
                          ...nextSub,
                          score: s.score,
                          feedback: s.feedback,
                        }
                      : s,
                  )
                : [...a.submissions, nextSub];
              return { ...a, submissions };
            }),
            members: c.members.map((m) =>
              m.id === student.id
                ? { ...m, progress: Math.min(100, m.progress + 8) }
                : m,
            ),
          };
        }),
      );
    },
    [classes, persist],
  );

  const returnWork = useCallback(
    (classId: string, assignmentId: string, studentId: string, score: number, feedback: string) => {
      persist(
        classes.map((c) => {
          if (c.id !== classId) return c;
          return {
            ...c,
            assignments: c.assignments.map((a) => {
              if (a.id !== assignmentId) return a;
              return {
                ...a,
                submissions: a.submissions.map((s) =>
                  s.studentId === studentId
                    ? {
                        ...s,
                        status: "returned" as const,
                        score,
                        feedback,
                      }
                    : s,
                ),
              };
            }),
          };
        }),
      );
    },
    [classes, persist],
  );

  const joinUrl = useCallback((code: string) => {
    if (typeof window === "undefined") return `/classroom/join?code=${code}`;
    return `${window.location.origin}/classroom/join?code=${code}`;
  }, []);

  const value = useMemo(
    () => ({
      classes,
      ready,
      createClass,
      joinClass,
      getByCode,
      getById,
      myTeaching,
      myEnrolled,
      addMaterial,
      addAssignment,
      submitWork,
      returnWork,
      joinUrl,
    }),
    [
      classes,
      ready,
      createClass,
      joinClass,
      getByCode,
      getById,
      myTeaching,
      myEnrolled,
      addMaterial,
      addAssignment,
      submitWork,
      returnWork,
      joinUrl,
    ],
  );

  return <ClassroomContext.Provider value={value}>{children}</ClassroomContext.Provider>;
}

export function useClassrooms() {
  const ctx = useContext(ClassroomContext);
  if (!ctx) throw new Error("useClassrooms must be used within ClassroomProvider");
  return ctx;
}

/** Teacher Co-pilot insights from local classroom data (no network). */
export function buildCopilotInsights(classes: Classroom[]) {
  const students = new Map<
    string,
    {
      id: string;
      name: string;
      email: string;
      progress: number;
      turnedIn: number;
      missing: number;
      classes: string[];
    }
  >();

  for (const cls of classes) {
    for (const m of cls.members) {
      const row = students.get(m.id) ?? {
        id: m.id,
        name: m.name,
        email: m.email,
        progress: m.progress,
        turnedIn: 0,
        missing: 0,
        classes: [] as string[],
      };
      row.progress = Math.round((row.progress + m.progress) / (row.classes.length ? 2 : 1));
      row.classes.push(cls.name);
      for (const a of cls.assignments) {
        const sub = a.submissions.find((s) => s.studentId === m.id);
        if (!sub || sub.status === "assigned") row.missing += 1;
        else row.turnedIn += 1;
      }
      students.set(m.id, row);
    }
  }

  const list = [...students.values()];
  const atRisk = list
    .filter((s) => s.missing > 0 || s.progress < 50)
    .sort((a, b) => a.progress - b.progress || b.missing - a.missing);
  const thriving = list
    .filter((s) => s.progress >= 75 && s.missing === 0)
    .sort((a, b) => b.progress - a.progress);

  const totalAssignments = classes.reduce((n, c) => n + c.assignments.length, 0);
  const totalSubs = classes.reduce(
    (n, c) => n + c.assignments.reduce((m, a) => m + a.submissions.length, 0),
    0,
  );
  const turned = classes.reduce(
    (n, c) =>
      n +
      c.assignments.reduce(
        (m, a) => m + a.submissions.filter((s) => s.status !== "assigned").length,
        0,
      ),
    0,
  );

  return {
    studentCount: list.length,
    classCount: classes.length,
    totalAssignments,
    turnInRate: totalSubs ? Math.round((turned / totalSubs) * 100) : 0,
    atRisk,
    thriving,
    summaryTh:
      atRisk.length === 0
        ? "ชั้นเรียนโดยรวมไปได้ดี ไม่มีนักเรียนที่เสี่ยงตกงานทันที แนะนำให้มอบหมายงานท้าทายเพิ่มให้กลุ่มเก่ง"
        : `มี ${atRisk.length} คนที่ควรติดตามเป็นพิเศษ (งานค้างหรือความก้าวหน้าต่ำ) ให้เริ่มคุยกับ ${atRisk[0]?.name ?? "นักเรียน"} ก่อน`,
    summaryEn:
      atRisk.length === 0
        ? "Classes look healthy overall. Consider stretch tasks for high performers."
        : `${atRisk.length} students need attention (missing work or low progress). Start with ${atRisk[0]?.name ?? "a student"}.`,
  };
}
