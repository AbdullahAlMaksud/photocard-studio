"use client";

import * as React from "react";
import {
  CloudCheck,
  Download,
  Eye,
  Pencil,
  Redo2,
  SlidersHorizontal,
  Undo2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { exportAllSlides } from "./export";
import { LanguageToggle } from "./language-toggle";
import { usePhotocardStore } from "./store";
import { ThemeToggle } from "./theme-toggle";

interface StudioHeaderProps {
  onOpenRightInspector?: () => void;
}

export const StudioHeader = ({
  onOpenRightInspector,
}: StudioHeaderProps) => {
  const { t } = useTranslation();
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const projectName = usePhotocardStore((s) => s.projectName);
  const setProjectName = usePhotocardStore((s) => s.setProjectName);
  const slides = usePhotocardStore((s) => s.slides);
  const ratio = usePhotocardStore((s) => s.ratio);
  const requestClearSelections = usePhotocardStore((s) => s.requestClearSelections);

  const handleExport = async () => {
    setIsExporting(true);
    requestClearSelections();
    await new Promise((r) => setTimeout(r, 100));
    await exportAllSlides(slides, ratio);
    setIsExporting(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-12 sm:h-16 shrink-0 items-center justify-between border-b border-border bg-card px-3 sm:px-6">
      {/* Left: App Logo & Name "InfoCard" + Editable Project Title */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo-svgrepo-com.svg"
            alt="InfoCard"
            className="size-6 sm:size-7 shrink-0 object-contain dark:invert"
          />
          <span className="font-display text-sm sm:text-base font-bold tracking-tight text-foreground">
            InfoCard
          </span>
        </div>

        <div className="hidden md:block h-4 w-px bg-border" />

        <div className="hidden md:flex items-center gap-2">
          {isEditingTitle ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              autoFocus
              className="h-8 rounded-md border border-primary px-2 text-sm font-semibold text-foreground outline-none bg-background"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingTitle(true)}
              className="group flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
            >
              <span>{projectName || "Untitled Project"}</span>
              <Pencil className="size-3.5 text-muted-foreground transition-opacity group-hover:opacity-100" />
            </button>
          )}
        </div>
      </div>

      {/* Center: Undo/Redo & Saved Status */}
      <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground"
            title="Undo"
          >
            <Undo2 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground"
            title="Redo"
          >
            <Redo2 className="size-4" />
          </Button>
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
          <CloudCheck className="size-4 text-emerald-500" />
          <span>Saved</span>
        </div>
      </div>

      {/* Right: Icon Buttons Row (Mobile & Desktop) */}
      <div className="flex w-full md:w-auto items-center justify-end gap-1.5 sm:gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="hidden sm:flex h-9 gap-1.5 text-xs font-semibold"
        >
          <Eye className="size-3.5" />
          <span>Preview</span>
        </Button>

        {/* Language Toggler */}
        <LanguageToggle />

        {/* Theme Toggler */}
        <ThemeToggle />

        {/* Export Icon Button */}
        <Button
          type="button"
          size="icon"
          onClick={handleExport}
          disabled={isExporting}
          className="size-8 sm:h-9 sm:w-auto sm:px-4 gap-2 rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer"
          title={isExporting ? t("actions.exporting") : t("actions.export_zip")}
        >
          <Download className="size-4" />
          <span className="hidden sm:inline">{isExporting ? t("actions.exporting") : t("actions.export_zip")}</span>
        </Button>

        {/* Right Side Settings Trigger Icon Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onOpenRightInspector}
          className="lg:hidden size-8 sm:h-9 sm:w-auto sm:px-2.5 gap-1.5 rounded-lg border-border text-xs font-semibold cursor-pointer"
          title="Open Settings"
        >
          <SlidersHorizontal className="size-4 text-primary" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>
    </header>
  );
};
