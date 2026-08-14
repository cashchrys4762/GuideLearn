"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SaveStatus = "idle" | "saving" | "saved";

type AutosaveContextValue = {
  status: SaveStatus;
  labelKey: "idle" | "saving" | "saved";
  triggerSave: () => void;
};

const AutosaveContext = createContext<AutosaveContextValue | null>(null);

export function AutosaveProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timer = useRef<number | null>(null);

  const triggerSave = useCallback(() => {
    setStatus("saving");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setStatus("saved");
      timer.current = window.setTimeout(() => setStatus("idle"), 2500);
    }, 700);
  }, []);

  const value = useMemo((): AutosaveContextValue => {
    const labelKey: AutosaveContextValue["labelKey"] =
      status === "saving" ? "saving" : status === "saved" ? "saved" : "idle";
    return { status, labelKey, triggerSave };
  }, [status, triggerSave]);

  return <AutosaveContext.Provider value={value}>{children}</AutosaveContext.Provider>;
}

export function useAutosave() {
  const ctx = useContext(AutosaveContext);
  if (!ctx) throw new Error("useAutosave must be used within AutosaveProvider");
  return ctx;
}
