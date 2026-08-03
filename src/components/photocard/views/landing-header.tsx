"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Folder, Home, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { LanguageToggle } from "../language-toggle";

export const LandingHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo-svgrepo-com.svg"
            alt="InfoCard Logo"
            className="size-8 shrink-0 object-contain dark:invert"
          />
          <div className="leading-tight">
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              {t("header.title")}
            </span>
            <span className="block text-[10px] font-semibold text-muted-foreground">
              {t("header.subtitle")}
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
          <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Home className="size-3.5" />
            <span>{t("nav.home")}</span>
          </Link>
          <Link href="/my-work" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Folder className="size-3.5" />
            <span>{t("nav.my_work")}</span>
          </Link>
          <Link href="/templates" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>{t("nav.templates")}</span>
          </Link>
        </nav>

        {/* Action Buttons + Language Switcher */}
        <div className="flex items-center gap-3">
          <LanguageToggle />

          <Link href="/editor">
            <Button
              type="button"
              className="h-9 gap-1.5 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer"
            >
              <span>{t("nav.start_studio")}</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
