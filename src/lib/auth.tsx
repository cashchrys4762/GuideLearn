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

export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
};

type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean;
  loginOpen: boolean;
  pendingPath: string | null;
  openLogin: (pendingPath?: string) => void;
  closeLogin: () => void;
  login: (name: string, email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  requireAuth: (path: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE = "guidelearn-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore */
    }
  }, []);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (next) window.localStorage.setItem(STORAGE, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE);
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
    (name: string, email: string) => {
      const initials = name
        .split(/\s+/)
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "KI";
      persist({ id: "u1", name: name || "กุลธิดา", email, initials: initials || "KI" });
      setLoginOpen(false);
    },
    [persist],
  );

  const register = useCallback(
    (name: string, email: string) => login(name, email),
    [login],
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
