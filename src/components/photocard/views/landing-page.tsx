"use client";

import * as React from "react";
import {
  ArrowRight,
  Download,
  FileText,
  Folder,
  Layers,
  Palette,
  Plus,
  Save,
  Sparkles,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { PRESET_TEMPLATES, type PresetTemplate } from "../templates/preset-templates";

interface LandingPageProps {
  onStartEditor: () => void;
  onSelectTemplate: (template: PresetTemplate) => void;
  onGoToMyWork: () => void;
}

export const LandingPage = ({
  onStartEditor,
  onSelectTemplate,
  onGoToMyWork,
}: LandingPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 text-foreground">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary shadow-xs mb-4">
            <Sparkles className="size-3.5" />
            <span>{t("landing.hero_badge")}</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl leading-tight">
            {t("landing.hero_title_1")} <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {t("landing.hero_title_2")}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-muted-foreground md:text-base">
            {t("landing.hero_subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              onClick={onStartEditor}
              className="h-12 gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 cursor-pointer"
            >
              <span>{t("landing.start_canvas")}</span>
              <ArrowRight className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onGoToMyWork}
              className="h-12 gap-2 rounded-2xl border-border bg-card px-6 text-sm font-bold text-foreground hover:bg-muted cursor-pointer"
            >
              <Folder className="size-4 text-primary" />
              <span>{t("landing.saved_projects")}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
            {t("landing.features_title")}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {t("landing.features_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Zap className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">{t("landing.f1_title")}</h3>
            <p className="text-xs text-muted-foreground">{t("landing.f1_desc")}</p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Save className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">{t("landing.f2_title")}</h3>
            <p className="text-xs text-muted-foreground">{t("landing.f2_desc")}</p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Palette className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">{t("landing.f3_title")}</h3>
            <p className="text-xs text-muted-foreground">{t("landing.f3_desc")}</p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Download className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">{t("landing.f4_title")}</h3>
            <p className="text-xs text-muted-foreground">{t("landing.f4_desc")}</p>
          </div>
        </div>
      </section>

      {/* Preset Templates Showcase */}
      <section className="border-t border-border/80 bg-muted/20 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Ready Templates
              </span>
              <h2 className="font-display text-xl font-bold text-foreground md:text-2xl mt-0.5">
                {t("landing.templates_section")}
              </h2>
            </div>
            <Button
              type="button"
              onClick={onStartEditor}
              className="gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-xs cursor-pointer self-start md:self-auto"
            >
              <Plus className="size-4" />
              <span>{t("landing.blank_slide")}</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRESET_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* Template Visual Card Preview */}
                <div
                  className={`relative flex h-48 w-full flex-col justify-end bg-gradient-to-br ${tmpl.thumbnailGradient} p-5 text-white overflow-hidden`}
                >
                  <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-xs">
                    {tmpl.tag}
                  </div>

                  <span className="text-xs font-semibold opacity-90">{tmpl.subtitle}</span>
                  <h4 className="font-display text-base font-bold line-clamp-2 leading-tight mt-1">
                    {tmpl.title}
                  </h4>
                  <span className="text-[10px] opacity-75 mt-2">{tmpl.credit}</span>
                </div>

                {/* Template Details & Action */}
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{tmpl.name}</span>
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {tmpl.ratio}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{tmpl.description}</p>

                  <Button
                    type="button"
                    onClick={() => onSelectTemplate(tmpl)}
                    className="mt-2 h-9 w-full gap-1.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-2xs hover:bg-primary/90 cursor-pointer"
                  >
                    <span>{t("landing.use_template")}</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
