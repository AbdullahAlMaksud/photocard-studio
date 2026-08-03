"use client";

import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { SlideCanvas } from "./slide-canvas";
import { usePhotocardStore } from "./store";

interface SlideRowProps {
  slideId: string;
  index: number;
}

export const SlideRow = ({ slideId, index }: SlideRowProps) => {
  const { t } = useTranslation();
  const slide = usePhotocardStore((s) => s.slides.find((sl) => sl.id === slideId));
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const setActiveSlideId = usePhotocardStore((s) => s.setActiveSlideId);

  if (!slide) return null;

  const isActive = slide.id === activeSlideId;

  return (
    <div
      onClick={() => setActiveSlideId(slide.id)}
      className={cn(
        "group relative flex flex-col gap-2 rounded-2xl border bg-card p-3 transition-all duration-200 cursor-pointer hover:border-primary/50",
        isActive
          ? "border-primary ring-2 ring-primary/20 shadow-lg"
          : "border-border shadow-xs"
      )}
    >
      <div className="flex items-center justify-between px-1">
        <Badge
          variant={isActive ? "default" : "secondary"}
          className="font-display text-xs"
        >
          {t("actions.slide_label")} {index + 1}
        </Badge>
        {isActive && (
          <span className="text-[11px] font-medium text-primary animate-pulse">
            Active Slide
          </span>
        )}
      </div>

      <SlideCanvas
        slideId={slide.id}
        editable={isActive}
        className="w-full rounded-xl border border-border shadow-xs overflow-hidden"
      />
    </div>
  );
};
