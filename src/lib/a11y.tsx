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
import { useAuth } from "./auth";
import { useI18n } from "./i18n";
import type { Locale } from "./dictionaries";
import { useTheme } from "./theme";

const STORAGE_KEY = "guidelearn-voice-mode";

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike> & { length: number };
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives?: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
};

type VoiceContextValue = {
  voiceMode: boolean;
  listening: boolean;
  speaking: boolean;
  announcement: string;
  lastHeard: string;
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

function normalizeHeard(transcript: string) {
  return transcript
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchCommand(transcript: string, locale: Locale): string | null {
  const t = normalizeHeard(transcript);
  if (!t) return null;

  const routes: Array<{ keys: string[]; action: string }> = [
    {
      keys: ["dashboard", "home", "แดชบอร์ด", "หน้าหลัก", "ไปแดชบอร์ด", "หน้าแรก"],
      action: "route:/",
    },
    {
      keys: [
        "study buddy",
        "coach",
        "homework",
        "tutor",
        "toby",
        "เพื่อนเรียน",
        "โค้ช",
        "ติว",
        "ไปเพื่อนเรียน",
        "การบ้าน",
        "ติวการบ้าน",
      ],
      action: "route:/tutor",
    },
    {
      keys: [
        "missions",
        "mission",
        "university",
        "plan",
        "ภารกิจ",
        "ไปภารกิจ",
        "แผนมหาวิทยาลัย",
        "แผน",
      ],
      action: "route:/plan",
    },
    {
      keys: ["news", "ข่าว", "ข่าวการศึกษา", "ทุน", "scholarship"],
      action: "route:/news",
    },
    {
      keys: ["classroom", "class", "ห้องเรียน", "ชั้นเรียน", "คลาส", "ไปห้องเรียน"],
      action: "route:/classroom",
    },
    {
      keys: ["copilot", "ครู", "teacher", "โค้ชครู", "โคไพลอต"],
      action: "route:/teacher/copilot",
    },
    {
      keys: ["portfolio", "พอร์ต", "แฟ้ม", "พอร์ตโฟลิโอ"],
      action: "route:/portfolio",
    },
    {
      keys: ["files", "ไฟล์", "สรุปไฟล์", "ข้อสอบ"],
      action: "route:/files",
    },
    {
      keys: ["listen", "เพื่อนรับฟัง", "รับฟัง"],
      action: "route:/listen",
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
      keys: [
        "help center",
        "help",
        "ช่วยเหลือ",
        "ศูนย์ช่วยเหลือ",
        "คำสั่ง",
        "มีคำสั่งอะไร",
        "คำสั่งเสียง",
      ],
      action: "help",
    },
    {
      keys: [
        "read page",
        "read",
        "describe",
        "อ่านหน้า",
        "อ่าน",
        "อธิบาย",
        "อ่านให้ฟัง",
        "อ่านหน้านี",
      ],
      action: "read",
    },
    {
      keys: ["stop", "quiet", "silence", "หยุด", "เงียบ", "หยุดพูด", "พอ"],
      action: "stop",
    },
    {
      keys: ["thai", "ภาษาไทย", "ไทย", "switch to thai", "เปลี่ยนเป็นไทย"],
      action: "locale:th",
    },
    {
      keys: ["english", "อังกฤษ", "ภาษาอังกฤษ", "switch to english", "เปลี่ยนเป็นอังกฤษ"],
      action: "locale:en",
    },
    {
      keys: ["dark mode", "โหมดมืด", "ธีมมืด", "มืด"],
      action: "theme:dark",
    },
    {
      keys: ["light mode", "โหมดสว่าง", "ธีมสว่าง", "สว่าง"],
      action: "theme:light",
    },
    {
      keys: ["login", "log in", "sign in", "เข้าสู่ระบบ", "ล็อกอิน", "login"],
      action: "login",
    },
    {
      keys: ["logout", "log out", "sign out", "ออกจากระบบ", "ล็อกเอาต์"],
      action: "logout",
    },
  ];

  for (const row of routes) {
    if (row.keys.some((k) => t.includes(normalizeHeard(k)))) return row.action;
  }

  if (locale === "th" && (t.includes("เปิดเสียง") || t.includes("โหมดเสียง"))) {
    return "voice:on";
  }
  return null;
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { locale, t, setLocale } = useI18n();
  const { setTheme } = useTheme();
  const { openLogin, logout, isLoggedIn } = useAuth();
  const [voiceMode, setVoiceModeState] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [lastHeard, setLastHeard] = useState("");
  const [pageScript, setPageScript] = useState("");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceModeRef = useRef(false);
  const pageScriptRef = useRef("");
  const speakingRef = useRef(false);
  const restartTimerRef = useRef<number | null>(null);
  const lastActionAtRef = useRef(0);
  const lastActionRef = useRef("");
  const startRecognitionRef = useRef<() => void>(() => {});

  useEffect(() => {
    voiceModeRef.current = voiceMode;
  }, [voiceMode]);

  useEffect(() => {
    pageScriptRef.current = pageScript;
  }, [pageScript]);

  const clearRestartTimer = useCallback(() => {
    if (restartTimerRef.current != null) {
      window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  const announce = useCallback((text: string) => {
    setAnnouncement(text);
  }, []);

  const stopRecognition = useCallback(() => {
    clearRestartTimer();
    const rec = recognitionRef.current;
    recognitionRef.current = null;
    if (!rec) {
      setListening(false);
      return;
    }
    rec.onresult = null;
    rec.onerror = null;
    rec.onend = null;
    rec.onstart = null;
    try {
      rec.abort();
    } catch {
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    }
    setListening(false);
  }, [clearRestartTimer]);

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    speakingRef.current = false;
    setSpeaking(false);
  }, []);

  const scheduleListen = useCallback(
    (delay = 350) => {
      clearRestartTimer();
      if (!voiceModeRef.current || speakingRef.current) return;
      restartTimerRef.current = window.setTimeout(() => {
        restartTimerRef.current = null;
        if (voiceModeRef.current && !speakingRef.current) {
          startRecognitionRef.current();
        }
      }, delay);
    },
    [clearRestartTimer],
  );

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !text.trim()) return;

      // Pause mic while TTS plays so commands aren't drowned by echo.
      speakingRef.current = true;
      setSpeaking(true);
      stopRecognition();

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

      const resume = () => {
        speakingRef.current = false;
        setSpeaking(false);
        if (voiceModeRef.current) scheduleListen(450);
      };

      utter.onstart = () => {
        speakingRef.current = true;
        setSpeaking(true);
      };
      utter.onend = resume;
      utter.onerror = resume;
      window.speechSynthesis.speak(utter);
      announce(text);
    },
    [announce, locale, scheduleListen, stopRecognition],
  );

  const readPage = useCallback(() => {
    const script = pageScriptRef.current || t.a11y.helpCommands;
    speak(`${t.a11y.readPage} ${script}`);
  }, [speak, t.a11y.helpCommands, t.a11y.readPage]);

  const handleCommand = useCallback(
    (action: string) => {
      const now = Date.now();
      if (action === lastActionRef.current && now - lastActionAtRef.current < 1600) {
        return;
      }
      lastActionRef.current = action;
      lastActionAtRef.current = now;

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
        if (voiceModeRef.current) scheduleListen(250);
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
      if (action === "theme:dark" || action === "theme:light") {
        const next = action === "theme:dark" ? "dark" : "light";
        setTheme(next);
        speak(
          locale === "th"
            ? next === "dark"
              ? "เปลี่ยนเป็นโหมดมืดแล้ว"
              : "เปลี่ยนเป็นโหมดสว่างแล้ว"
            : next === "dark"
              ? "Dark mode on."
              : "Light mode on.",
        );
        return;
      }
      if (action === "login") {
        openLogin("/");
        speak(locale === "th" ? "เปิดหน้าเข้าสู่ระบบ" : "Opening sign in.");
        return;
      }
      if (action === "logout") {
        if (isLoggedIn) logout();
        speak(locale === "th" ? "ออกจากระบบแล้ว" : "Signed out.");
        return;
      }
      if (action === "voice:on") {
        speak(t.a11y.voiceOn);
      }
    },
    [
      announce,
      isLoggedIn,
      locale,
      logout,
      openLogin,
      readPage,
      router,
      scheduleListen,
      setLocale,
      setTheme,
      speak,
      stopSpeaking,
      t,
    ],
  );

  const startRecognition = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      if (voiceModeRef.current) speak(t.a11y.unsupported);
      return;
    }
    if (speakingRef.current || !voiceModeRef.current) return;

    // Replace any existing session cleanly.
    if (recognitionRef.current) {
      const old = recognitionRef.current;
      recognitionRef.current = null;
      old.onresult = null;
      old.onerror = null;
      old.onend = null;
      old.onstart = null;
      try {
        old.abort();
      } catch {
        /* ignore */
      }
    }

    const recognition = new Ctor();
    recognition.lang = locale === "th" ? "th-TH" : "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      if (speakingRef.current || !voiceModeRef.current) return;

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (!result?.isFinal) continue;
        const transcript = result[0]?.transcript ?? "";
        const heard = normalizeHeard(transcript);
        if (!heard) continue;

        setLastHeard(transcript.trim());
        announce(transcript.trim());

        const action = matchCommand(transcript, locale);
        if (action) {
          handleCommand(action);
          return;
        }

        // Soft feedback when speech was heard but no command matched.
        announce(
          locale === "th"
            ? `ได้ยินว่า “${transcript.trim()}” ลองพูดว่า ช่วยเหลือ`
            : `Heard “${transcript.trim()}”. Say help for commands.`,
        );
      }
    };

    recognition.onerror = (event) => {
      const err = event.error;
      if (err === "not-allowed") {
        speak(t.a11y.micDenied);
        setVoiceModeState(false);
        voiceModeRef.current = false;
        window.localStorage.setItem(STORAGE_KEY, "0");
        stopRecognition();
        return;
      }
      setListening(false);
      // Recoverable: keep listening while voice mode is on.
      if (
        voiceModeRef.current &&
        !speakingRef.current &&
        (err === "no-speech" ||
          err === "aborted" ||
          err === "network" ||
          err === "audio-capture")
      ) {
        scheduleListen(err === "network" ? 1200 : 500);
      }
    };

    recognition.onend = () => {
      setListening(false);
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
      if (voiceModeRef.current && !speakingRef.current) {
        scheduleListen(400);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setListening(false);
      scheduleListen(700);
    }
  }, [
    announce,
    handleCommand,
    locale,
    scheduleListen,
    speak,
    stopRecognition,
    t.a11y.micDenied,
    t.a11y.unsupported,
  ]);

  useEffect(() => {
    startRecognitionRef.current = startRecognition;
  }, [startRecognition]);

  const setVoiceMode = useCallback(
    (on: boolean) => {
      setVoiceModeState(on);
      voiceModeRef.current = on;
      window.localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
      if (on) {
        setLastHeard("");
        speak(t.a11y.voiceOn);
        // speak() already resumes listening after TTS ends
      } else {
        clearRestartTimer();
        stopRecognition();
        stopSpeaking();
        setLastHeard("");
        announce(t.a11y.voiceOff);
      }
    },
    [
      announce,
      clearRestartTimer,
      speak,
      stopRecognition,
      stopSpeaking,
      t.a11y.voiceOff,
      t.a11y.voiceOn,
    ],
  );

  const toggleVoiceMode = useCallback(() => {
    setVoiceMode(!voiceMode);
  }, [setVoiceMode, voiceMode]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "1") {
      setVoiceModeState(true);
      voiceModeRef.current = true;
      scheduleListen(600);
    }
    const warm = () => window.speechSynthesis.getVoices();
    warm();
    window.speechSynthesis.onvoiceschanged = warm;
    return () => {
      clearRestartTimer();
      stopRecognition();
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restart recognizer language when locale changes while voice mode is on.
  useEffect(() => {
    if (!voiceMode || speakingRef.current) return;
    scheduleListen(200);
  }, [locale, voiceMode, scheduleListen]);

  const value = useMemo(
    () => ({
      voiceMode,
      listening,
      speaking,
      announcement,
      lastHeard,
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
      lastHeard,
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
