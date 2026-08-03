"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Edit3, Folder, Home, Plus, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { usePhotocardStore } from "./store";
import type { RatioKey } from "./types";

interface NavItem {
  href: string;
  labelKey: string;
  icon: React.ElementType;
  badge?: string;
}

export const LeftNavSidebar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const projectName = usePhotocardStore((s) => s.projectName);
  const ratio = usePhotocardStore((s) => s.ratio);
  const setRatio = usePhotocardStore((s) => s.setRatio);

  const mainNavItems: NavItem[] = [
    { href: "/editor", labelKey: "nav.editor", icon: Edit3 },
    { href: "/", labelKey: "nav.home", icon: Home },
    { href: "/my-work", labelKey: "nav.my_work", icon: Folder },
    { href: "/templates", labelKey: "nav.templates", icon: Sparkles, badge: "New" },
  ];

  const ratioLabels: Record<RatioKey, string> = {
    "1:1": "1080 x 1080 (1:1)",
    "1:2": "1080 x 2160 (1:2)",
    "3:4": "1080 x 1440 (3:4)",
    "16:9": "1920 x 1080 (16:9)",
  };

  return (
    <aside data-lenis-prevent className="flex h-full min-h-0 w-64 shrink-0 flex-col justify-between border-r border-border/80 bg-card p-4 overflow-y-auto overscroll-contain thin-scrollbar">
      <div className="flex flex-col gap-5">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-1 pt-1 transition-opacity hover:opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo-svgrepo-com.svg"
            alt="InfoCard Logo"
            className="size-8 shrink-0 object-contain dark:invert"
          />
          <div className="leading-tight">
            <h1 className="font-display text-base font-bold tracking-tight text-foreground">
              {t("header.title")}
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              {t("header.subtitle")}
            </p>
          </div>
        </Link>

        {/* New Project Button */}
        <Link href="/editor">
          <Button
            type="button"
            className="h-10 w-full gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>{t("nav.new_project")}</span>
          </Button>
        </Link>

        {/* Main Navigation Section */}
        <div className="flex flex-col gap-1 pt-1">
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
            Navigation Menu
          </span>
          <nav className="flex flex-col gap-1 pt-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary font-bold shadow-2xs"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("size-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span>{t(item.labelKey)}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-extrabold text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Project Info Card */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-muted/20 p-3.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-semibold text-muted-foreground">Project Name</span>
          <span className="text-xs font-bold text-foreground truncate">{projectName || "Untitled Project"}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-muted-foreground">Canvas Size</span>
          <div className="relative">
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value as RatioKey)}
              className="w-full appearance-none rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground outline-none cursor-pointer focus:border-primary"
            >
              {Object.entries(ratioLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 size-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </aside>
  );
};
