"use client";

import * as React from "react";
import { Upload } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { usePhotocardStore } from "../store";

export const LogoPanel = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const images = usePhotocardStore((s) => s.images);
  const useSameLogoForAll = usePhotocardStore((s) => s.useSameLogoForAll);
  const setUseSameLogoForAll = usePhotocardStore((s) => s.setUseSameLogoForAll);
  const globalLogo = usePhotocardStore((s) => s.globalLogo);
  const updateGlobalLogo = usePhotocardStore((s) => s.updateGlobalLogo);
  const addImages = usePhotocardStore((s) => s.addImages);

  const handleUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const [created] = addImages([files[0]]);
    updateGlobalLogo({ imageId: created.id });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="logo-same">সব স্লাইডে একই লোগো</Label>
        <Switch id="logo-same" checked={useSameLogoForAll} onCheckedChange={setUseSameLogoForAll} />
      </div>

      {useSameLogoForAll ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => updateGlobalLogo({ imageId: null })}
              className={cn(
                "rounded-md border px-2 py-1 text-[11px] transition-colors",
                !globalLogo.imageId
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              নেই
            </button>
            {images.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => updateGlobalLogo({ imageId: img.id })}
                className={cn(
                  "size-9 overflow-hidden rounded-md border-2 transition-colors",
                  globalLogo.imageId === img.id ? "border-primary" : "border-transparent hover:border-border"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex size-9 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Upload className="size-4" />
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            ক্যানভাসে লোগোটি টেনে পজিশন ও সাইজ ঠিক করুন — সব স্লাইডে একসাথে বসবে।
          </p>
        </div>
      ) : (
        <p className="text-[11px] text-muted-foreground">
          এখন প্রতিটি স্লাইডের জন্য আলাদা লোগো বেছে নিন — নিচের স্লাইড তালিকায় প্রতিটি কার্ডে &quot;লোগো&quot; অংশ থেকে।
        </p>
      )}
    </div>
  );
};
