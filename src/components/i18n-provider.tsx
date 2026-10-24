"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    try {
      const savedLang = localStorage.getItem("photocard-studio-lang");
      if (savedLang && (savedLang === "bn" || savedLang === "en") && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {}
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
