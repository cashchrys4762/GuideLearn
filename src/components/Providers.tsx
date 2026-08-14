"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { VoiceProvider } from "@/lib/a11y";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <VoiceProvider>{children}</VoiceProvider>
    </I18nProvider>
  );
}
