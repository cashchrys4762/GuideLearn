"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { assets } from "@/lib/assets";
import { useAuth, type UserRole } from "@/lib/auth";
import { useBandwidth } from "@/lib/bandwidth";
import { useI18n } from "@/lib/i18n";
import { Icon } from "./Icon";

export function LoginModal() {
  const { loginOpen, closeLogin, login, register, pendingPath } = useAuth();
  const { lowBandwidth } = useBandwidth();
  const { t } = useI18n();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("กุลธิดา");
  const [email, setEmail] = useState("kulthida@guidelearn.app");
  const [password, setPassword] = useState("••••••••");
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (!loginOpen) setMode("login");
  }, [loginOpen]);

  useEffect(() => {
    if (role === "teacher") {
      setName("ครูสมชาย");
      setEmail("teacher@guidelearn.app");
    } else {
      setName("กุลธิดา");
      setEmail("kulthida@guidelearn.app");
    }
  }, [role]);

  if (!loginOpen) return null;

  const afterAuth = (pathHint?: string) => {
    const dest =
      pathHint ||
      pendingPath ||
      (role === "teacher" ? "/classroom" : "/classroom");
    router.push(dest);
  };

  const submit = () => {
    if (mode === "signup") register(name, email, role);
    else login(name || (role === "teacher" ? "ครูสมชาย" : "กุลธิดา"), email, role);
    afterAuth();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm low-bw:backdrop-blur-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.platform.loginTitle}
        className="max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,88,190,0.45)] low-bw:shadow-none md:p-8"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          {!lowBandwidth && (
            <Image
              src={assets.logo}
              alt={t.brand}
              width={200}
              height={128}
              className="h-16 w-auto object-contain sm:h-[4.5rem]"
              priority
            />
          )}
          {lowBandwidth && (
            <div className="text-xl font-bold text-primary">{t.brand}</div>
          )}
          <button
            type="button"
            onClick={closeLogin}
            className="rounded-full p-2 hover:bg-surface-container"
            aria-label="Close"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="mb-5">
          <h2 className="font-headline-md text-[24px] text-primary">
            {mode === "login" ? t.platform.loginTitle : t.platform.signUp}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {t.platform.loginHint}
          </p>
        </div>

        <div className="mb-4 flex gap-2 rounded-full bg-surface-container p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-2 font-label-md text-label-md ${
              mode === "login" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"
            }`}
          >
            {t.platform.signIn}
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full py-2 font-label-md text-label-md ${
              mode === "signup" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"
            }`}
          >
            {t.platform.signUp}
          </button>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`rounded-2xl border px-3 py-3 text-left ${
                role === "student"
                  ? "border-primary bg-primary-fixed text-on-primary-fixed-variant"
                  : "border-outline-variant bg-surface-container-low"
              }`}
            >
              <Icon name="school" className="mb-1" />
              <div className="font-semibold">{t.platform.roleStudent}</div>
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`rounded-2xl border px-3 py-3 text-left ${
                role === "teacher"
                  ? "border-primary bg-primary-fixed text-on-primary-fixed-variant"
                  : "border-outline-variant bg-surface-container-low"
              }`}
            >
              <Icon name="co_present" className="mb-1" />
              <div className="font-semibold">{t.platform.roleTeacher}</div>
            </button>
          </div>
        </div>

        <label className="mb-3 block">
          <span className="font-label-sm text-label-sm text-on-surface-variant">{t.platform.name}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3 outline-none focus:border-primary"
          />
        </label>
        <label className="mb-3 block">
          <span className="font-label-sm text-label-sm text-on-surface-variant">{t.platform.email}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3 outline-none focus:border-primary"
          />
        </label>
        <label className="mb-5 block">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {t.platform.password}
          </span>
          <div className="relative mt-1">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3 pr-12 outline-none focus:border-primary"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? t.platform.hidePassword : t.platform.showPassword}
            >
              <Icon name={showPw ? "visibility_off" : "visibility"} />
            </button>
          </div>
        </label>

        <button
          type="button"
          onClick={submit}
          className="w-full rounded-full bg-primary py-3.5 font-label-md text-label-md text-on-primary shadow-md low-bw:shadow-none"
        >
          {mode === "login" ? t.platform.signIn : t.platform.signUp}
        </button>
        <button
          type="button"
          onClick={() => {
            login("กุลธิดา", "kulthida@guidelearn.app", "student");
            afterAuth("/classroom");
          }}
          className="mt-3 w-full rounded-full border border-outline-variant py-3 font-label-md text-label-md text-on-surface"
        >
          {t.platform.continueAs}
        </button>
        <button
          type="button"
          onClick={() => {
            login("ครูสมชาย", "teacher@guidelearn.app", "teacher");
            afterAuth("/classroom");
          }}
          className="mt-2 w-full rounded-full border border-primary/30 bg-primary-fixed/40 py-3 font-label-md text-label-md text-primary"
        >
          {t.platform.continueAsTeacher}
        </button>
      </div>
    </div>
  );
}
