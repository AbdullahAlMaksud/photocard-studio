"use client";

import * as React from "react";
import { Clock, Edit3, Folder, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { usePhotocardStore } from "../store";

interface MyWorkPageProps {
  onOpenProject: () => void;
  onNewProject: () => void;
}

interface SavedProjectItem {
  id: string;
  name: string;
  slidesCount: number;
  updatedAt: string;
  firstSlideTitle: string;
  ratio: string;
}

export const MyWorkPage = ({ onOpenProject, onNewProject }: MyWorkPageProps) => {
  const { t } = useTranslation();
  const [savedProjects, setSavedProjects] = React.useState<SavedProjectItem[]>([]);

  const slides = usePhotocardStore((s) => s.slides);
  const ratio = usePhotocardStore((s) => s.ratio);
  const storeProjectName = usePhotocardStore((s) => s.projectName);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem("photocard-studio-progress");
        if (raw) {
          const parsed = JSON.parse(raw);
          const stateSlides = parsed.state?.slides || [];
          const stateRatio = parsed.state?.ratio || "1:1";
          const stateName = parsed.state?.projectName || "Untitled Project";

          if (stateSlides.length > 0) {
            const currentProject: SavedProjectItem = {
              id: "current-active-project",
              name: stateName,
              slidesCount: stateSlides.length,
              updatedAt: new Date().toLocaleDateString("bn-BD", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              firstSlideTitle: stateSlides[0]?.title || "খালি স্লাইড",
              ratio: stateRatio,
            };
            setSavedProjects([currentProject]);
            return;
          }
        }
      } catch {
        // fallback
      }

      if (slides.length > 0) {
        setSavedProjects([
          {
            id: "active-store-project",
            name: storeProjectName || "Untitled Project",
            slidesCount: slides.length,
            updatedAt: "আজ",
            firstSlideTitle: slides[0]?.title || "খালি স্লাইড",
            ratio: ratio,
          },
        ]);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [slides, ratio, storeProjectName]);

  const handleDeleteProject = (id: string) => {
    setSavedProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex-1 p-6 md:p-8 text-foreground">
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Folder className="size-6" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground md:text-2xl">
                {t("my_work.title")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("my_work.subtitle")}
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={onNewProject}
            className="h-10 gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer self-start md:self-auto"
          >
            <Plus className="size-4" />
            <span>{t("my_work.new_project")}</span>
          </Button>
        </div>

        {/* Projects Grid View */}
        {savedProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xs transition-all hover:border-primary/50 hover:shadow-md"
              >
                {/* Project Card Header Box */}
                <div className="flex h-36 w-full flex-col justify-between bg-gradient-to-br from-slate-900 via-primary/20 to-black p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-xs text-primary-foreground">
                      {proj.ratio} Ratio
                    </span>
                    <span className="flex items-center gap-1 text-[10px] opacity-80">
                      <Clock className="size-3" />
                      <span>{proj.updatedAt}</span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">Project</span>
                    <h3 className="font-bold text-base line-clamp-1 text-white">
                      {proj.name}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-1">
                      {t("my_work.first_slide")} {proj.firstSlideTitle}
                    </p>
                  </div>
                </div>

                {/* Project Details Footer */}
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="size-3.5 text-primary" />
                      <span>{proj.slidesCount} {t("my_work.slides")}</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                      Auto-Saved
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      type="button"
                      onClick={onOpenProject}
                      className="flex-1 h-9 gap-1.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    >
                      <Edit3 className="size-3.5" />
                      <span>{t("my_work.open_editor")}</span>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteProject(proj.id)}
                      className="size-9 rounded-xl border-border text-muted-foreground hover:bg-red-50 hover:text-red-600 cursor-pointer"
                      title={t("my_work.delete")}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-card p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Folder className="size-7" />
            </div>
            <h3 className="font-bold text-base text-foreground">{t("my_work.empty_title")}</h3>
            <p className="max-w-md text-xs text-muted-foreground">
              {t("my_work.empty_desc")}
            </p>
            <Button
              type="button"
              onClick={onNewProject}
              className="mt-2 h-10 gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer"
            >
              <Plus className="size-4" />
              <span>{t("my_work.new_project")}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
