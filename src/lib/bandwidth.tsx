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

type BandwidthContextValue = {
  lowBandwidth: boolean;
  setLowBandwidth: (v: boolean) => void;
  toggleLowBandwidth: () => void;
};

const STORAGE = "guidelearn-low-bandwidth";
const BandwidthContext = createContext<BandwidthContextValue | null>(null);

export function BandwidthProvider({ children }: { children: ReactNode }) {
  const [lowBandwidth, setLow] = useState(false);

  useEffect(() => {
    try {
      setLow(window.localStorage.getItem(STORAGE) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("low-bandwidth", lowBandwidth);
  }, [lowBandwidth]);

  const setLowBandwidth = useCallback((v: boolean) => {
    setLow(v);
    try {
      window.localStorage.setItem(STORAGE, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLowBandwidth = useCallback(() => {
    setLowBandwidth(!lowBandwidth);
  }, [lowBandwidth, setLowBandwidth]);

  const value = useMemo(
    () => ({ lowBandwidth, setLowBandwidth, toggleLowBandwidth }),
    [lowBandwidth, setLowBandwidth, toggleLowBandwidth],
  );

  return <BandwidthContext.Provider value={value}>{children}</BandwidthContext.Provider>;
}

export function useBandwidth() {
  const ctx = useContext(BandwidthContext);
  if (!ctx) throw new Error("useBandwidth must be used within BandwidthProvider");
  return ctx;
}
