"use client";

import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { PRESET_TEMPLATES, type PresetTemplate } from "../templates/preset-templates";

interface TemplatesPageProps {
  onSelectTemplate: (template: PresetTemplate) => void;
}

export const TemplatesPage = ({ onSelectTemplate }: TemplatesPageProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = [
    "All",
    "News & Media",
    "Quotes & Thoughts",
    "Sports & Gaming",
    "Islamic & Spiritual",
    "Business & Tech",
  ];

  const filteredTemplates =
    selectedCategory === "All"
      ? PRESET_TEMPLATES
      : PRESET_TEMPLATES.filter((tmpl) => tmpl.category === selectedCategory);

  return (
    <div className="flex-1 p-6 md:p-8 text-foreground">
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex flex-col gap-2 border-b border-border/80 pb-5">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground md:text-2xl">
              {t("templates_page.title")}
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("templates_page.subtitle")}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat === "All" ? t("templates_page.all") : cat}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              {/* Template Card Visual Box */}
              <div
                className={`relative flex h-52 w-full flex-col justify-end bg-gradient-to-br ${tmpl.thumbnailGradient} p-5 text-white overflow-hidden`}
              >
                <div className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-xs text-amber-300">
                  {tmpl.tag}
                </div>

                <span className="text-xs font-semibold text-primary-foreground opacity-90">
                  {tmpl.subtitle}
                </span>
                <h3 className="font-display text-base font-bold line-clamp-2 leading-tight mt-1">
                  {tmpl.title}
                </h3>
                <span className="text-[10px] opacity-75 mt-2">{tmpl.credit}</span>
              </div>

              {/* Template Content Description */}
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
                  <Check className="size-4" />
                  <span>{t("templates_page.use_this")}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
