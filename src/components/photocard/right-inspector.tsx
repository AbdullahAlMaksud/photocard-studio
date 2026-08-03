"use client";

import * as React from "react";
import { FileText, Image as ImageIcon, Palette, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ContentSettingsPanel } from "./controls/content-settings-panel";
import { SlideSettingsPanel } from "./controls/slide-settings-panel";
import { StyleLayoutPanel } from "./controls/style-layout-panel";

interface RightInspectorProps {
  onClose?: () => void;
}

export const RightInspector = ({ onClose }: RightInspectorProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<"content" | "style" | "slide">("content");

  return (
    <aside data-lenis-prevent className="flex h-full min-h-0 w-full lg:w-96 shrink-0 flex-col lg:border-l border-border bg-card overflow-hidden">
      {/* Top Header Bar for Mobile / Drawer (Cross button at top right) */}
      <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-card lg:hidden">
        <span className="font-bold text-xs text-foreground">Inspector & Settings</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer outline-none"
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>

      {/* 3 Tabs Row */}
      <div className="flex border-b border-border/80 bg-card">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "content"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="size-3.5 text-primary" />
          <span>{t("controls.content_tab")}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("style")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "style"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Palette className="size-3.5" />
          <span>{t("controls.style_tab")}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("slide")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "slide"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ImageIcon className="size-3.5" />
          <span>{t("controls.slide_tab")}</span>
        </button>
      </div>

      {/* Inspector Panel Body */}
      <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto overscroll-contain thin-scrollbar bg-card">
        {activeTab === "content" && <ContentSettingsPanel />}
        {activeTab === "style" && <StyleLayoutPanel />}
        {activeTab === "slide" && <SlideSettingsPanel />}
      </div>
    </aside>
  );
};
