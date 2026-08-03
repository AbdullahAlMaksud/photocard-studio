"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const currentLang = i18n.language || "bn";

  React.useEffect(() => {
    try {
      const savedLang = localStorage.getItem("photocard-studio-lang");
      if (savedLang && (savedLang === "bn" || savedLang === "en") && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {}
  }, [i18n]);

  const toggleLanguage = () => {
    const nextLang = currentLang === "bn" ? "en" : "bn";
    i18n.changeLanguage(nextLang);
    document.documentElement.lang = nextLang;
    try {
      localStorage.setItem("photocard-studio-lang", nextLang);
    } catch {}
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-8 gap-1.5 px-2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
      title={t("lang.toggle")}
    >
      <Languages className="size-3.5" />
      <span className="font-semibold uppercase tracking-wider">{currentLang === "bn" ? "BN" : "EN"}</span>
    </Button>
  );
};
