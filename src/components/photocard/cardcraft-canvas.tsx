"use client";

import * as React from "react";
import {
  Grid,
  LayoutGrid,
  Minus,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { SlideCanvas } from "./slide-canvas";
import { SlideFilmstrip } from "./slide-filmstrip";
import { usePhotocardStore } from "./store";
import { RATIO_OPTIONS } from "./types";

export const CardCraftCanvas = () => {
  const [zoom, setZoom] = React.useState(85);
  const slides = usePhotocardStore((s) => s.slides);
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const ratio = usePhotocardStore((s) => s.ratio);

  const activeIndex = Math.max(
    0,
    slides.findIndex((sl) => sl.id === activeSlideId)
  );
  const slide = slides[activeIndex] || slides[0];

  const ratioInfo = RATIO_OPTIONS.find((r) => r.key === ratio) ?? RATIO_OPTIONS[0];

  const zoomScale = zoom / 100;

  if (!slide) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden p-2 sm:p-4 min-h-0">
      {/* Centered Large Slide Preview Container */}
      <div className="relative flex flex-1 h-full w-full min-h-0 items-center justify-center p-1 sm:p-4 overflow-hidden">
        <div
          className="transition-transform duration-100 ease-out flex items-center justify-center max-h-full max-w-full min-h-0"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: "center center",
          }}
        >
          <div
            className="relative shadow-2xl rounded-2xl sm:rounded-3xl border border-border/80 bg-card overflow-hidden shrink-0"
            style={{
              width: `min(480px, calc(100vw - 2rem), calc((100dvh - 14.5rem) * ${ratioInfo.w / ratioInfo.h}))`,
              aspectRatio: `${ratioInfo.w} / ${ratioInfo.h}`,
            }}
          >
            <SlideCanvas slideId={slide.id} editable={true} className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* Bottom Filmstrip Panel & Status Bar */}
      <div className="flex flex-col gap-1 sm:gap-2.5 rounded-2xl border border-border bg-card p-1.5 sm:p-3 shadow-xs shrink-0">
        {/* Filmstrip Carousel */}
        <SlideFilmstrip />

        {/* Status Bar (Slides Count & Zoom Bar) */}
        <div className="flex items-center justify-between border-t border-border pt-1 sm:pt-2.5 px-2 text-xs text-muted-foreground font-medium">
          <span className="text-[11px] sm:text-xs">{slides.length} Slides</span>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="size-7">
                <LayoutGrid className="size-3.5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="size-7">
                <Grid className="size-3.5" />
              </Button>
            </div>

            <div className="hidden sm:block h-4 w-px bg-border" />

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7"
                onClick={() => setZoom((z) => Math.max(30, z - 10))}
              >
                <Minus className="size-3 sm:size-3.5" />
              </Button>

              <input
                type="range"
                min="30"
                max="200"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="hidden sm:block h-1.5 w-28 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
              />

              <span className="w-8 sm:w-10 text-center text-[10px] sm:text-xs font-semibold tabular-nums text-foreground">
                {zoom}%
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 sm:size-7"
                onClick={() => setZoom((z) => Math.min(200, z + 10))}
              >
                <Plus className="size-3 sm:size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
