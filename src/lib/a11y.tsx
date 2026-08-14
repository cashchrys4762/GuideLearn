"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useI18n } from "./i18n";
import type { Locale } from "./dictionaries";

const STORAGE_KEY = "guidelearn-voice-mode";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type VoiceContextValue = {
  voiceMode: boolean;
  listening: boolean;
  speaking: boolean;
  announcement: string;
  pageScript: string;
  setPageScript: (text: string) => void;
  setVoiceMode: (on: boolean) => void;
  toggleVoiceMode: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  readPage: () => void;
  announce: (text: string) => void;
};

const VoiceContext = createContext<VoiceContextValue | null>(null);

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function matchCommand(transcript: string, locale: Locale): string | null {
  const t = transcript.toLowerCase().trim();

  const routes: Array<{ keys: string[]; action: string }> = [
    {
      keys: ["dashboard", "home", "แดชบอร์ด", "หน้าหลัก", "ไปแดชบอร์ด"],
      action: "route:/",
    },
    {
      keys: ["missions", "mission", "university", "ภารกิจ", "ไปภารกิจ", "แผนมหาวิทยาลัย"],
      action: "route:/missions",
    },
    {
      keys: [
        "study buddy",
        "coach",
        "homework",
        "toby",
        "เพื่อนเรียน",
        "โค้ช",
        "ไปเพื่อนเรียน",
        "การบ้าน",
      ],
      action: "route:/study-buddy",
    },
    {
      keys: ["settings", "setting", "การตั้งค่า", "ตั้งค่า", "ไปตั้งค่า"],
      action: "route:/settings",
    },
    {
      keys: ["notebook", "สมุด", "สมุดโน้ต"],
      action: "route:/notebook",
    },
    {
      keys: ["help center", "help", "ช่วยเหลือ", "ศูนย์ช่วยเหลือ", "คำสั่ง"],
      action: "help",
    },
    {
      keys: ["read page", "read", "describe", "อ่านหน้า", "อ่าน", "อธิบาย", "อ่านให้ฟัง"],
      action: "read",
    },
    {
      keys: ["stop", "quiet", "silence", "หยุด", "เงียบ", "หยุดพูด"],
      action: "stop",
    },
    {
      keys: ["thai", "ภาษาไทย", "ไทย", "switch to thai"],
      action: "locale:th",
    },
    {
      keys: ["english", "อังกฤษ", "ภาษาอังกฤษ", "switch to english"],
      action: "locale:en",
    },
  ];

  for (const row of routes) {
    if (row.keys.some((k) => t.includes(k))) return row.action;
  }

  // locale-aware extras
  if (locale === "th" && (t.includes("เปิดเสียง") || t.includes("โหมดเสียง"))) {
    return "voice:on";
  }
  return null;
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { locale, t, setLocale } = useI18n();
  const [voiceMode, setVoiceModeState] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [pageScript, setPageScript] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceModeRef = useRef(false);
  const pageScriptRef = useRef("");

  useEffect(() => {
    voiceModeRef.current = voiceMode;
  }, [voiceMode]);

  useEffect(() => {
    pageScriptRef.current = pageScript;
  }, [pageScript]);

  const announce = useCallback((text: string) => {
    setAnnouncement(text);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !text.trim()) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = locale === "th" ? "th-TH" : "en-US";
      utter.rate = locale === "th" ? 0.95 : 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) =>
          locale === "th"
            ? v.lang.toLowerCase().startsWith("th")
            : v.lang.toLowerCase().startsWith("en"),
        ) ?? null;
      if (preferred) utter.voice = preferred;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
      announce(text);
    },
    [announce, locale],
  );

  const readPage = useCallback(() => {
    const script = pageScriptRef.current || t.a11y.helpCommands;
    speak(`${t.a11y.readPage} ${script}`);
  }, [speak, t.a11y.helpCommands, t.a11y.readPage]);

  const handleCommand = useCallback(
    (action: string) => {
      if (action.startsWith("route:")) {
        const path = action.slice(6);
        router.push(path);
        speak(
          locale === "th"
            ? `กำลังไปที่ ${path === "/" ? "แดชบอร์ด" : path}`
            : `Going to ${path === "/" ? "dashboard" : path}`,
        );
        return;
      }
      if (action === "read") {
        readPage();
        return;
      }
      if (action === "stop") {
        stopSpeaking();
        announce(t.a11y.stopSpeaking);
        return;
      }
      if (action === "help") {
        speak(t.voiceHelp);
        return;
      }
      if (action === "locale:th") {
        setLocale("th");
        speak("เปลี่ยนเป็นภาษาไทยแล้ว");
        return;
      }
      if (action === "locale:en") {
        setLocale("en");
        speak("Switched to English.");
        return;
      }
      if (action === "voice:on") {
        speak(t.a11y.voiceOn);
      }
    },
    [announce, locale, readPage, router, setLocale, speak, stopSpeaking, t],
  );

  const stopRecognition = useCallback(() => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setListening(false);
  }, []);

  const startRecognition = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      speak(t.a11y.unsupported);
      return;
    }
    stopRecognition();
    const recognition = new Ctor();
    recognition.lang = locale === "th" ? "th-TH" : "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const last = event.results[event.results.length - 1];
      const transcript = last?.[0]?.transcript ?? "";
      if (!transcript) return;
      announce(transcript);
      const action = matchCommand(transcript, locale);
      if (action) handleCommand(action);
    };
    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        speak(t.a11y.micDenied);
        setVoiceModeState(false);
        voiceModeRef.current = false;
        window.localStorage.setItem(STORAGE_KEY, "0");
      }
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
      if (voiceModeRef.current) {
        try {
          recognition.start();
          setListening(true);
        } catch {
          /* restart race */
        }
      }
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, [announce, handleCommand, locale, speak, stopRecognition, t.a11y.micDenied, t.a11y.unsupported]);

  const setVoiceMode = useCallback(
    (on: boolean) => {
      setVoiceModeState(on);
      window.localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
      if (on) {
        speak(t.a11y.voiceOn);
        // delay mic start until after announcement
        window.setTimeout(() => {
          if (voiceModeRef.current) startRecognition();
        }, 1200);
      } else {
        stopRecognition();
        stopSpeaking();
        announce(t.a11y.voiceOff);
      }
    },
    [announce, speak, startRecognition, stopRecognition, stopSpeaking, t.a11y.voiceOff, t.a11y.voiceOn],
  );

  const toggleVoiceMode = useCallback(() => {
    setVoiceMode(!voiceMode);
  }, [setVoiceMode, voiceMode]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "1") {
      setVoiceModeState(true);
      voiceModeRef.current = true;
      window.setTimeout(() => startRecognition(), 800);
    }
    const warm = () => window.speechSynthesis.getVoices();
    warm();
    window.speechSynthesis.onvoiceschanged = warm;
    return () => {
      stopRecognition();
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restart recognizer when locale changes while voice mode is on
  useEffect(() => {
    if (!voiceMode) return;
    startRecognition();
  }, [locale, voiceMode, startRecognition]);

  const value = useMemo(
    () => ({
      voiceMode,
      listening,
      speaking,
      announcement,
      pageScript,
      setPageScript,
      setVoiceMode,
      toggleVoiceMode,
      speak,
      stopSpeaking,
      readPage,
      announce,
    }),
    [
      announcement,
      listening,
      pageScript,
      readPage,
      setVoiceMode,
      speak,
      speaking,
      stopSpeaking,
      toggleVoiceMode,
      voiceMode,
      announce,
    ],
  );

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
}

export function useVoice() {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
}

/** Register the page summary for “read page” voice command / auto-announce. */
export function usePageScript(script: string, autoRead = false) {
  const { setPageScript, voiceMode, speak } = useVoice();
  useEffect(() => {
    setPageScript(script);
    if (autoRead && voiceMode && script) {
      const id = window.setTimeout(() => speak(script), 400);
      return () => window.clearTimeout(id);
    }
  }, [autoRead, script, setPageScript, speak, voiceMode]);
}
