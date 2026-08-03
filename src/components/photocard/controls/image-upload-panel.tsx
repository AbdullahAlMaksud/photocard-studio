"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { usePhotocardStore } from "../store";

export const ImageUploadPanel = () => {
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const images = usePhotocardStore((s) => s.images);
  const addImages = usePhotocardStore((s) => s.addImages);
  const removeImage = usePhotocardStore((s) => s.removeImage);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    addImages(Array.from(files));
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-border py-5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Upload className="size-4" />
        {t("upload.choose_images")}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-md border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute bottom-0.5 left-0.5 rounded bg-primary/90 px-1 text-[9px] font-medium text-primary-foreground">
                  Default
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className={cn(
                  "absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                )}
              >
                <X className="size-2.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
