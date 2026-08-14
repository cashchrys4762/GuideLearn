import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GuideLearn — AI Learning Coach",
  description:
    "GuideLearn helps Thai students prepare for university with missions, study buddy coaching, Thai/English UI, and voice accessibility.",
  icons: {
    icon: [{ url: "/brand/guidelearn-logo.png", type: "image/png" }],
    apple: [{ url: "/brand/guidelearn-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${quicksand.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
