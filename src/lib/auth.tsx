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

export type UserRole = "student" | "teacher";

export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
};

type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  loginOpen: boolean;
  pendingPath: string | null;
  openLogin: (pendingPath?: string) => void;
  closeLogin: () => void;
  login: (name: string, email: string, role?: UserRole) => void;
  register: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
  requireAuth: (path: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE = "guidelearn-user";

function makeUser(name: string, email: string, role: UserRole): User {
  const initials =
    name
      .split(/\s+/)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || (role === "teacher" ? "TC" : "ST");
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `u-${Date.now()}`;
  return { id, name: name || (role === "teacher" ? "ครูสมชาย" : "กุลธิดา"), email, initials, role };
}

function normalizeUser(raw: unknown): User | null {
  if (!raw || typeof raw !== "object") return null;
  const u = raw as Partial<User>;
  if (!u.name || !u.email) return null;
  return {
    id: u.id || "u1",
    name: u.name,
    email: u.email,
    initials: u.initials || "GL",
    role: u.role === "teacher" ? "teacher" : "student",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE);
      if (raw) setUser(normalizeUser(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    try {
      if (next) window.localStorage.setItem(STORAGE, JSON.stringify(next));
      else window.localStorage.removeItem(STORAGE);
    } catch {
      /* ignore storage failures in restricted WebViews */
    }
  }, []);

  const openLogin = useCallback((path?: string) => {
    setPendingPath(path ?? null);
    setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    setPendingPath(null);
  }, []);

  const login = useCallback(
    (name: string, email: string, role: UserRole = "student") => {
      const normalizedEmail = email.trim().toLowerCase();
      // Stable demo accounts so seeded classrooms match
      if (normalizedEmail === "teacher@guidelearn.app") {
        persist({
          id: "teacher-demo",
          name: name || "ครูสมชาย",
          email: "teacher@guidelearn.app",
          initials: "คร",
          role: "teacher",
        });
        setLoginOpen(false);
        return;
      }
      if (normalizedEmail === "kulthida@guidelearn.app") {
        persist({
          id: "stu-demo-1",
          name: name || "กุลธิดา",
          email: "kulthida@guidelearn.app",
          initials: "กุ",
          role: "student",
        });
        setLoginOpen(false);
        return;
      }
      try {
        const raw = window.localStorage.getItem(STORAGE);
        if (raw) {
          const existing = normalizeUser(JSON.parse(raw));
          if (existing && existing.email.toLowerCase() === normalizedEmail) {
            persist({ ...existing, name: name || existing.name, role: role || existing.role });
            setLoginOpen(false);
            return;
          }
        }
      } catch {
        /* ignore */
      }
      persist(makeUser(name, email, role));
      setLoginOpen(false);
    },
    [persist],
  );

  const register = useCallback(
    (name: string, email: string, role: UserRole) => {
      persist(makeUser(name, email, role));
      setLoginOpen(false);
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const requireAuth = useCallback(
    (path: string) => {
      if (user) return true;
      openLogin(path);
      return false;
    },
    [openLogin, user],
  );

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      isTeacher: user?.role === "teacher",
      isStudent: user?.role === "student",
      loginOpen,
      pendingPath,
      openLogin,
      closeLogin,
      login,
      register,
      logout,
      requireAuth,
    }),
    [user, loginOpen, pendingPath, openLogin, closeLogin, login, register, logout, requireAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
