"use client";

import * as React from "react";
import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { usePhotocardStore } from "../store";

export const SlideSettingsPanel = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);

  const slides = usePhotocardStore((s) => s.slides);
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const removeSlide = usePhotocardStore((s) => s.removeSlide);

  const images = usePhotocardStore((s) => s.images);
  const addImages = usePhotocardStore((s) => s.addImages);

  const useSameLogoForAll = usePhotocardStore((s) => s.useSameLogoForAll);

  const updateSlideLogo = usePhotocardStore((s) => s.updateSlideLogo);
  const setSlideImage = usePhotocardStore((s) => s.setSlideImage);

  const activeIndex = Math.max(
    0,
    slides.findIndex((sl) => sl.id === activeSlideId)
  );
  const slide = slides[activeIndex] || slides[0];

  const handleUploadForSlide = (files: FileList | null) => {
    if (!files || files.length === 0 || !slide) return;
    const [created] = addImages([files[0]]);
    setSlideImage(slide.id, created.id);
  };

  const handleUploadLogoForSlide = (files: FileList | null) => {
    if (!files || files.length === 0 || !slide) return;
    const [created] = addImages([files[0]]);
    updateSlideLogo(slide.id, { imageId: created.id });
  };

  if (!slide) return null;

  return (
    <div data-lenis-prevent className="flex flex-col gap-6 p-5 text-xs">
      {/* ----------------- Slide Media ----------------- */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground text-xs shrink-0">Slide Media</span>
          <div className="h-px flex-1 bg-border/80" />
        </div>

        {/* Image Picker */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-muted-foreground text-[11px]">Slide Background</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSlideImage(slide.id, null)}
              className={cn(
                "rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer",
                !slide.imageId
                  ? "border-primary bg-primary text-primary-foreground shadow-xs"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              Default
            </button>

            {images.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSlideImage(slide.id, img.id)}
                className={cn(
                  "size-10 overflow-hidden rounded-xl border-2 transition-all cursor-pointer",
                  slide.imageId === img.id ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
              </button>
            ))}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex size-10 items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer bg-muted/30"
            >
              <ImagePlus className="size-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUploadForSlide(e.target.files)}
            />
          </div>
        </div>

        {/* Logo Picker */}
        {!useSameLogoForAll && (
          <div className="flex flex-col gap-2 pt-1">
            <span className="font-semibold text-muted-foreground text-[11px]">Slide Logo</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => updateSlideLogo(slide.id, { imageId: null })}
                className={cn(
                  "rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer",
                  !slide.logo.imageId
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                None
              </button>

              {images.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => updateSlideLogo(slide.id, { imageId: img.id })}
                  className={cn(
                    "size-10 overflow-hidden rounded-xl border-2 transition-all cursor-pointer",
                    slide.logo.imageId === img.id ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                </button>
              ))}

              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="flex size-10 items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer bg-muted/30"
              >
                <ImagePlus className="size-4" />
              </button>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadLogoForSlide(e.target.files)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Delete Slide Footer */}
      <div className="pt-4 border-t border-border flex justify-end">
        <Button
          type="button"
          variant="ghost"
          disabled={slides.length <= 1}
          onClick={() => removeSlide(slide.id)}
          className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <Trash2 className="size-4" />
          <span>Delete Slide</span>
        </Button>
      </div>
    </div>
  );
};

