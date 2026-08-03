"use client";

import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { getEffectiveImage } from "./selectors";
import { usePhotocardStore } from "./store";

export const SlideFilmstrip = () => {
  const { t } = useTranslation();
  const slides = usePhotocardStore((s) => s.slides);
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const setActiveSlideId = usePhotocardStore((s) => s.setActiveSlideId);
  const addSlide = usePhotocardStore((s) => s.addSlide);
  const images = usePhotocardStore((s) => s.images);

  return (
    <div className="flex w-full items-center gap-2 sm:gap-3 overflow-x-auto p-1 sm:p-3 thin-scrollbar">
      {slides.map((slide, index) => {
        const isActive = slide.id === activeSlideId;
        const numStr = String(index + 1).padStart(2, "0");
        const image = getEffectiveImage(slide, images);

        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveSlideId(slide.id)}
            className={cn(
              "group relative flex h-20 w-14 sm:h-36 sm:w-24 shrink-0 flex-col justify-between overflow-hidden rounded-xl border bg-card p-1 sm:p-2 text-left transition-all duration-200 cursor-pointer shadow-xs",
              isActive
                ? "border-2 border-primary ring-2 ring-primary/20 shadow-md scale-102"
                : "border-border hover:border-primary/50"
            )}
          >
            {/* Background Image Preview */}
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image.url}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
            )}

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

            {/* Top Number Badge */}
            <span
              className={cn(
                "relative z-10 w-fit rounded-md px-1 py-0.5 sm:px-1.5 text-[9px] sm:text-[10px] font-bold tracking-tight",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-black/60 text-white/90"
              )}
            >
              {numStr}
            </span>

            {/* Text Preview Snippet */}
            <div className="relative z-10 flex flex-col gap-0.5">
              <p className="line-clamp-2 text-[9px] sm:text-[10px] font-bold leading-tight text-white drop-shadow-xs">
                {slide.title || `Slide ${index + 1}`}
              </p>
              <span className="hidden sm:block text-[8px] font-medium text-white/70">
                Swipe →
              </span>
            </div>
          </button>
        );
      })}

      {/* Add Slide Card Button */}
      <button
        type="button"
        onClick={addSlide}
        className="flex h-20 w-14 sm:h-36 sm:w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border/80 bg-card/40 text-muted-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
      >
        <Plus className="size-4 sm:size-5" />
        <span className="text-[9px] sm:text-[11px] font-semibold text-center leading-tight">Add Slide</span>
      </button>
    </div>
  );
};
