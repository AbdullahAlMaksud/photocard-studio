"use client";

import * as React from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { SidebarContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { usePhotocardStore } from "../store";

export const SlideOptionsSidebar = () => {
  const { t } = useTranslation();
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
    <SidebarContent className="p-4 group-data-[collapsible=icon]:hidden">
      <div className="flex flex-col gap-5 pb-10">
        {/* Image Picker */}
        <div className="flex flex-col gap-1.5">
          <Label className="font-semibold">{t("upload.image_title")}</Label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSlideImage(slide.id, null)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                !slide.imageId
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
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
                  "size-10 overflow-hidden rounded-md border-2 transition-colors",
                  slide.imageId === img.id ? "border-primary" : "border-transparent hover:border-border"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex size-10 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"
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
          <div className="flex flex-col gap-1.5">
            <Label className="font-semibold">{t("sidebar.logo")}</Label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => updateSlideLogo(slide.id, { imageId: null })}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                  !slide.logo.imageId
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
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
                    "size-10 overflow-hidden rounded-md border-2 transition-colors",
                    slide.logo.imageId === img.id ? "border-primary" : "border-transparent hover:border-border"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="flex size-10 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"
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

        {/* Delete Slide Button */}
        <div className="pt-3 border-t border-border flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={slides.length <= 1}
            onClick={() => removeSlide(slide.id)}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive text-xs gap-1.5"
          >
            <Trash2 className="size-3.5" />
            {t("actions.delete")}
          </Button>
        </div>
      </div>
    </SidebarContent>
  );
};

