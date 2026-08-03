import type { Metadata } from "next";

import { I18nProvider } from "@/components/i18n-provider";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photocard Studio — সোশ্যাল মিডিয়া ফটোকার্ড জেনারেটর",
  description: "ছবি, ফন্ট, টেক্সট, লোগো দিয়ে সোশ্যাল মিডিয়া ফটোকার্ড স্লাইড তৈরি ও এক্সপোর্ট করুন — সম্পূর্ণ ব্রাউজারে, কোনো সার্ভার ছাড়াই।",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("photocard-studio-theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="bn" className="min-h-screen antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <I18nProvider>
          <LenisProvider>{children}</LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
