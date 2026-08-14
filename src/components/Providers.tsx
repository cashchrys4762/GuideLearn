"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { VoiceProvider } from "@/lib/a11y";
import { AuthProvider } from "@/lib/auth";
import { AutosaveProvider } from "@/lib/autosave";
import { NoticeProvider } from "@/lib/notices";
import { LoginModal } from "@/components/LoginModal";
import { NotificationPanel } from "@/components/NotificationPanel";
import { AICoachChat } from "@/components/AICoachChat";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>
        <AutosaveProvider>
          <NoticeProvider>
            <VoiceProvider>
              {children}
              <LoginModal />
              <NotificationPanel />
              <AICoachChat />
            </VoiceProvider>
          </NoticeProvider>
        </AutosaveProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
