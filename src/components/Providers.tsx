"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { VoiceProvider } from "@/lib/a11y";
import { AuthProvider } from "@/lib/auth";
import { AutosaveProvider } from "@/lib/autosave";
import { BandwidthProvider } from "@/lib/bandwidth";
import { ClassroomProvider } from "@/lib/classroom";
import { NoticeProvider } from "@/lib/notices";
import { ThemeProvider } from "@/lib/theme";
import { LoginModal } from "@/components/LoginModal";
import { NotificationPanel } from "@/components/NotificationPanel";
import { AICoachChat } from "@/components/AICoachChat";
import { InAppBrowserGate } from "@/components/InAppBrowserGate";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <BandwidthProvider>
          <AuthProvider>
            <ClassroomProvider>
              <AutosaveProvider>
                <NoticeProvider>
                  <VoiceProvider>
                    <InAppBrowserGate />
                    {children}
                    <LoginModal />
                    <NotificationPanel />
                    <AICoachChat />
                  </VoiceProvider>
                </NoticeProvider>
              </AutosaveProvider>
            </ClassroomProvider>
          </AuthProvider>
        </BandwidthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
