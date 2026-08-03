"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { SlideCanvas } from "./slide-canvas";
import { usePhotocardStore } from "./store";
import { RATIO_OPTIONS } from "./types";

export const CanvasViewport = () => {
  const [zoomScale, setZoomScale] = React.useState(1.0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const slides = usePhotocardStore((s) => s.slides);
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const setActiveSlideId = usePhotocardStore((s) => s.setActiveSlideId);
  const addSlide = usePhotocardStore((s) => s.addSlide);
  const ratio = usePhotocardStore((s) => s.ratio);

  const activeIndex = Math.max(
    0,
    slides.findIndex((sl) => sl.id === activeSlideId)
  );
  const slide = slides[activeIndex] || slides[0];

  const ratioInfo = RATIO_OPTIONS.find((r) => r.key === ratio) ?? RATIO_OPTIONS[0];

  // Mouse wheel zoom handler (only zooms the slide canvas element)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setZoomScale((prev) => Math.min(Math.max(0.3, prev + delta), 3.0));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const handleZoomIn = () => setZoomScale((z) => Math.min(3.0, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoomScale((z) => Math.max(0.3, Number((z - 0.15).toFixed(2))));
  const handleResetZoom = () => setZoomScale(1.0);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveSlideId(slides[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveSlideId(slides[activeIndex + 1].id);
    }
  };

  if (!slide) return null;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden p-4 sm:p-6 select-none">
      {/* Top Slide Switcher Bar */}
      <div className="z-10 flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-full"
          disabled={activeIndex <= 0}
          onClick={handlePrev}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="font-display text-xs font-semibold tracking-tight text-foreground px-1">
          স্লাইড {activeIndex + 1} / {slides.length}
        </span>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-full"
          disabled={activeIndex >= slides.length - 1}
          onClick={handleNext}
        >
          <ChevronRight className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addSlide}
          className="h-7 rounded-full gap-1 px-2.5 text-xs text-primary hover:bg-primary/10"
        >
          <Plus className="size-3.5" />
          <span>নতুন স্লাইড</span>
        </Button>
      </div>

      {/* Main Interactive Workspace Area */}
      <div
        ref={containerRef}
        className="relative flex flex-1 w-full min-h-0 items-center justify-center overflow-hidden py-2"
      >
        <div
          className="transition-transform duration-75 ease-out flex items-center justify-center max-h-full max-w-full"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: "center center",
          }}
        >
          <div
            className="relative shadow-2xl rounded-2xl border border-border bg-card overflow-hidden shrink-0"
            style={{
              width: `min(560px, calc(100vw - 2.5rem), calc((100dvh - 12rem) * ${ratioInfo.w / ratioInfo.h}))`,
              aspectRatio: `${ratioInfo.w} / ${ratioInfo.h}`,
              maxHeight: "calc(100dvh - 12rem)",
            }}
          >
            {/* Slide canvas rendering */}
            <SlideCanvas
              slideId={slide.id}
              editable={true}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* Excalidraw-Style Floating Zoom Toolbar */}
      <div className="z-10 flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-3 py-1.5 shadow-md backdrop-blur-md">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-full text-muted-foreground hover:text-foreground"
          onClick={handleZoomOut}
          title="Zoom Out (-)"
        >
          <Minus className="size-3.5" />
        </Button>

        <button
          type="button"
          onClick={handleResetZoom}
          className="min-w-12 px-2 text-center text-xs font-semibold tabular-nums text-foreground hover:text-primary transition-colors"
          title="Reset Zoom (100%)"
        >
          {Math.round(zoomScale * 100)}%
        </button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-full text-muted-foreground hover:text-foreground"
          onClick={handleZoomIn}
          title="Zoom In (+)"
        >
          <Plus className="size-3.5" />
        </Button>

        <div className="mx-1 h-3.5 w-px bg-border" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-full text-muted-foreground hover:text-foreground"
          onClick={handleResetZoom}
          title="Fit to Screen"
        >
          <RotateCcw className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};
