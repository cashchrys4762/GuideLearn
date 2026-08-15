import type { Metadata, Viewport } from "next";
import { Mitr, Prompt } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

const mitr = Mitr({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mitr",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1018" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} ${mitr.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("guidelearn-theme");if(t==="dark"){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}}catch(e){}})();(function(){try{var ua=navigator.userAgent||"";var u=new URL(location.href);var drop=["fbclid","igshid","fb_action_ids","fb_action_types","mibextid"];var changed=false;for(var i=0;i<drop.length;i++){if(u.searchParams.has(drop[i])){u.searchParams.delete(drop[i]);changed=true;}}if(/Line\\//i.test(ua)&&u.searchParams.get("openExternalBrowser")!=="1"){u.searchParams.set("openExternalBrowser","1");location.replace(u.toString());return;}if(changed){history.replaceState(null,"",u.pathname+u.search+u.hash);}}catch(e){}})();(function(){try{var l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap";l.media="print";l.onload=function(){l.media="all"};document.head.appendChild(l);}catch(e){}})();`,
          }}
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
