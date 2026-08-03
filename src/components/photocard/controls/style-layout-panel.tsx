"use client";

import * as React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Crop,
  Italic,
  Minus,
  Plus,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { uid } from "../defaults";
import { usePhotocardStore } from "../store";
import type { OverlayDirection, RatioKey } from "../types";
import { BUILT_IN_FONTS } from "../types";
import { LogoCropModal } from "./logo-crop-modal";

export const StyleLayoutPanel = () => {
  const bgInputRef = React.useRef<HTMLInputElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const fontInputRef = React.useRef<HTMLInputElement>(null);

  // Logo Crop modal states
  const [cropModalOpen, setCropModalOpen] = React.useState(false);
  const [cropImageSrc, setCropImageSrc] = React.useState<string | null>(null);

  const slides = usePhotocardStore((s) => s.slides);
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const images = usePhotocardStore((s) => s.images);
  const addImages = usePhotocardStore((s) => s.addImages);

  const fonts = usePhotocardStore((s) => s.fonts);
  const addFont = usePhotocardStore((s) => s.addFont);

  const ratio = usePhotocardStore((s) => s.ratio);
  const setRatio = usePhotocardStore((s) => s.setRatio);

  const titleStyle = usePhotocardStore((s) => s.titleStyle);
  const updateTitleStyle = usePhotocardStore((s) => s.updateTitleStyle);
  const subtitleStyle = usePhotocardStore((s) => s.subtitleStyle);
  const updateSubtitleStyle = usePhotocardStore((s) => s.updateSubtitleStyle);
  const creditStyle = usePhotocardStore((s) => s.creditStyle);
  const updateCreditStyle = usePhotocardStore((s) => s.updateCreditStyle);

  const overlay = usePhotocardStore((s) => s.overlay);
  const updateOverlay = usePhotocardStore((s) => s.updateOverlay);

  const setSlideImage = usePhotocardStore((s) => s.setSlideImage);

  const useSameLogoForAll = usePhotocardStore((s) => s.useSameLogoForAll);
  const setUseSameLogoForAll = usePhotocardStore((s) => s.setUseSameLogoForAll);
  const globalLogo = usePhotocardStore((s) => s.globalLogo);
  const updateGlobalLogo = usePhotocardStore((s) => s.updateGlobalLogo);
  const updateSlideLogo = usePhotocardStore((s) => s.updateSlideLogo);

  const activeIndex = Math.max(
    0,
    slides.findIndex((sl) => sl.id === activeSlideId)
  );
  const slide = slides[activeIndex] || slides[0];

  const currentBgImage = images.find((i) => i.id === slide?.imageId);
  const currentLogoId = useSameLogoForAll ? globalLogo.imageId : slide?.logo.imageId;
  const currentLogoImage = images.find((i) => i.id === currentLogoId);

  const handleBgUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const [created] = addImages(Array.from(files));
    if (slide) setSlideImage(slide.id, created.id);
  };

  const handleLogoFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCropImageSrc(dataUrl);
        setCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    const newImage = {
      id: uid(),
      name: "Cropped Logo",
      url: croppedDataUrl,
    };
    usePhotocardStore.setState((s) => ({
      images: [...s.images, newImage],
    }));

    if (useSameLogoForAll) {
      updateGlobalLogo({ imageId: newImage.id });
    } else if (slide) {
      updateSlideLogo(slide.id, { imageId: newImage.id });
    }
  };

  const handleRecropLogo = () => {
    if (currentLogoImage) {
      setCropImageSrc(currentLogoImage.url);
      setCropModalOpen(true);
    }
  };

  const handleFontUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const familyName = file.name.replace(/\.[^/.]+$/, "");
    const url = URL.createObjectURL(file);
    const fontFace = new FontFace(familyName, `url(${url})`);
    fontFace.load().then((loaded) => {
      document.fonts.add(loaded);
      const newFont = {
        id: familyName,
        label: familyName,
        family: familyName,
        fileName: file.name,
      };
      addFont(newFont);
      updateTitleStyle({ fontFamily: familyName });
    });
  };

  const availableFonts = [
    ...BUILT_IN_FONTS.map((f) => f.family),
    ...fonts.map((f) => f.family),
  ];

  const ratioOptions: { key: RatioKey; label: string; ratioStr: string; w: number; h: number }[] = [
    { key: "1:1", label: "Square (1:1)", ratioStr: "1:1", w: 20, h: 20 },
    { key: "3:4", label: "Vertical (3:4)", ratioStr: "3:4", w: 16, h: 22 },
    { key: "16:9", label: "Horizontal (16:9)", ratioStr: "16:9", w: 24, h: 14 },
    { key: "1:2", label: "Vertical (1:2)", ratioStr: "1:2", w: 14, h: 26 },
  ];

  const overlayOptions: { value: string; label: string }[] = [
    { value: "none", label: "None (Disabled)" },
    { value: "gradient-bottom", label: "Bottom to Top Gradient (Classic)" },
    { value: "gradient-top", label: "Top to Bottom Gradient" },
    { value: "gradient-both", label: "Dual Top & Bottom Gradient" },
    { value: "flat", label: "Solid Flat Overlay" },
    { value: "vignette", label: "Radial Vignette" },
    { value: "solid-bottom", label: "Solid Bottom Band" },
    { value: "solid-top", label: "Solid Top Band" },
  ];

  const currentOverlayValue = !overlay.enabled ? "none" : overlay.direction;

  return (
    <div data-lenis-prevent className="flex flex-col gap-6 p-4 text-xs">
      {/* ----------------- SECTION 1: Background & Logo Images ----------------- */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground text-xs shrink-0">ছবি ও লোগো (Images & Logo)</span>
          <div className="h-px flex-1 bg-border/80" />
        </div>

        {/* --- Single Background Image Section --- */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-muted-foreground">ব্যাকগ্রাউন্ড ছবি (Background Image)</span>
          
          {currentBgImage ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-primary/40 bg-card shadow-xs group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentBgImage.url} alt={currentBgImage.name} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => slide && setSlideImage(slide.id, null)}
                className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-all hover:bg-red-700 hover:scale-110 cursor-pointer"
                title="ছবি রিমুভ করুন"
              >
                <X className="size-4" />
              </button>
              <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                এক্টিভ ছবি (১টি)
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => bgInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 py-4 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
            >
              <Upload className="size-4 text-primary" />
              <span className="text-[11px] font-semibold text-center">ব্যাকগ্রাউন্ড ছবি আপলোড করুন</span>
            </button>
          )}

          <input
            ref={bgInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleBgUpload(e.target.files)}
          />
        </div>

        {/* --- Single Logo Image Section with Crop & Set System --- */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground">লোগো ছবি (Logo Image)</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">সব স্লাইডে</span>
              <Switch
                checked={useSameLogoForAll}
                onCheckedChange={(checked) => setUseSameLogoForAll(checked)}
              />
            </div>
          </div>

          {currentLogoImage ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-primary/40 bg-card p-3 shadow-xs flex items-center justify-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentLogoImage.url} alt={currentLogoImage.name} className="max-h-full max-w-full object-contain" />
              
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRecropLogo}
                  className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-110 cursor-pointer"
                  title="ক্রপ এডিট করুন"
                >
                  <Crop className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (useSameLogoForAll) {
                      updateGlobalLogo({ imageId: null });
                    } else if (slide) {
                      updateSlideLogo(slide.id, { imageId: null });
                    }
                  }}
                  className="flex size-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-all hover:bg-red-700 hover:scale-110 cursor-pointer"
                  title="লোগো রিমুভ করুন"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                এক্টিভ লোগো (১টি)
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 py-4 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
            >
              <Upload className="size-4 text-primary" />
              <span className="text-[11px] font-semibold text-center">লোগো ছবি আপলোড ও ক্রপ করুন</span>
            </button>
          )}

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoFileSelect(e.target.files)}
          />
        </div>

        {/* --- Frame Ratio Cards Grid --- */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border/80">
          <span className="font-bold text-foreground text-xs">ফ্রেম সাইজ ও রেশিও</span>
          <div className="grid grid-cols-4 gap-2 pt-1">
            {ratioOptions.map((r) => {
              const isActive = ratio === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRatio(r.key)}
                  className={cn(
                    "flex flex-col items-center justify-between rounded-2xl border p-2.5 text-center transition-all cursor-pointer h-24",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/40 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  <div className="flex flex-1 items-center justify-center">
                    <div
                      className={cn(
                        "rounded-sm border-2 transition-colors",
                        isActive ? "border-primary-foreground bg-primary-foreground/20" : "border-muted-foreground/60 bg-muted-foreground/10"
                      )}
                      style={{ width: r.w, height: r.h }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold line-clamp-1">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 2: Typography ----------------- */}
      <div className="flex flex-col gap-3 pt-2 border-t border-border/80">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground text-xs shrink-0">টাইপোগ্রাফি ও ফন্ট (Typography)</span>
          <div className="h-px flex-1 bg-border/80" />
        </div>

        {/* Upload Custom Font Card */}
        <button
          type="button"
          onClick={() => fontInputRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 py-3 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
        >
          <Upload className="size-4" />
          <span className="text-xs font-semibold">কাস্টম ফন্ট ফাইল যোগ করুন (.ttf, .woff)</span>
        </button>
        <input
          ref={fontInputRef}
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          className="hidden"
          onChange={(e) => handleFontUpload(e.target.files)}
        />

        {/* --- Title Font Section --- */}
        <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-3.5">
          <span className="font-bold text-foreground text-xs">টাইটেল ফন্ট (Title Font)</span>

          <Select
            value={titleStyle.fontFamily}
            onValueChange={(val) => updateTitleStyle({ fontFamily: val })}
          >
            <SelectTrigger className="h-9 rounded-xl border-border bg-background text-xs font-semibold">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((f) => (
                <SelectItem key={f} value={f} className="text-xs font-medium">
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Size & Stepper */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Font size</span>
            <input
              type="range"
              min="16"
              max="120"
              value={titleStyle.fontSize}
              onChange={(e) => updateTitleStyle({ fontSize: Number(e.target.value) })}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
            <div className="flex items-center rounded-xl border border-border bg-background px-2 py-1 text-xs font-bold tabular-nums">
              <button
                type="button"
                onClick={() => updateTitleStyle({ fontSize: Math.max(12, titleStyle.fontSize - 1) })}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Minus className="size-3" />
              </button>
              <span className="px-2">{titleStyle.fontSize}</span>
              <button
                type="button"
                onClick={() => updateTitleStyle({ fontSize: Math.min(150, titleStyle.fontSize + 1) })}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Format & Weight Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateTitleStyle({ align: "left" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", titleStyle.align === "left" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateTitleStyle({ align: "center" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", titleStyle.align === "center" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignCenter className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateTitleStyle({ align: "right" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", titleStyle.align === "right" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateTitleStyle({ italic: !titleStyle.italic })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", titleStyle.italic ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <Italic className="size-3.5" />
              </button>
              <input
                type="color"
                value={titleStyle.color}
                onChange={(e) => updateTitleStyle({ color: e.target.value })}
                className="size-7 cursor-pointer rounded-lg border border-border p-0.5 bg-background"
              />
            </div>

            <div className="flex-1">
              <Select
                value={String(titleStyle.fontWeight)}
                onValueChange={(val) => updateTitleStyle({ fontWeight: Number(val) })}
              >
                <SelectTrigger className="h-8 rounded-xl border-border bg-background text-xs font-semibold px-2.5">
                  <SelectValue placeholder="Weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="400" className="text-xs">Regular</SelectItem>
                  <SelectItem value="500" className="text-xs">Medium</SelectItem>
                  <SelectItem value="600" className="text-xs">Semi Bold</SelectItem>
                  <SelectItem value="700" className="text-xs">Bold</SelectItem>
                  <SelectItem value="800" className="text-xs">Extra Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Opacity */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Opacity</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={titleStyle.alpha}
              onChange={(e) => updateTitleStyle({ alpha: Number(e.target.value) })}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
          </div>
        </div>

        {/* --- Subhead Font Section --- */}
        <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-3.5">
          <span className="font-bold text-foreground text-xs">সাবটাইটেল ফন্ট (Subhead Font)</span>

          <Select
            value={subtitleStyle.fontFamily}
            onValueChange={(val) => updateSubtitleStyle({ fontFamily: val })}
          >
            <SelectTrigger className="h-9 rounded-xl border-border bg-background text-xs font-semibold">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((f) => (
                <SelectItem key={f} value={f} className="text-xs font-medium">
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Size & Stepper */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Font size</span>
            <input
              type="range"
              min="12"
              max="80"
              value={subtitleStyle.fontSize}
              onChange={(e) => updateSubtitleStyle({ fontSize: Number(e.target.value) })}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
            <div className="flex items-center rounded-xl border border-border bg-background px-2 py-1 text-xs font-bold tabular-nums">
              <button
                type="button"
                onClick={() => updateSubtitleStyle({ fontSize: Math.max(10, subtitleStyle.fontSize - 1) })}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Minus className="size-3" />
              </button>
              <span className="px-2">{subtitleStyle.fontSize}</span>
              <button
                type="button"
                onClick={() => updateSubtitleStyle({ fontSize: Math.min(100, subtitleStyle.fontSize + 1) })}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Format & Weight Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateSubtitleStyle({ align: "left" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", subtitleStyle.align === "left" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateSubtitleStyle({ align: "center" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", subtitleStyle.align === "center" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignCenter className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateSubtitleStyle({ align: "right" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", subtitleStyle.align === "right" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateSubtitleStyle({ italic: !subtitleStyle.italic })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", subtitleStyle.italic ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <Italic className="size-3.5" />
              </button>
              <input
                type="color"
                value={subtitleStyle.color}
                onChange={(e) => updateSubtitleStyle({ color: e.target.value })}
                className="size-7 cursor-pointer rounded-lg border border-border p-0.5 bg-background"
              />
            </div>

            <div className="flex-1">
              <Select
                value={String(subtitleStyle.fontWeight)}
                onValueChange={(val) => updateSubtitleStyle({ fontWeight: Number(val) })}
              >
                <SelectTrigger className="h-8 rounded-xl border-border bg-background text-xs font-semibold px-2.5">
                  <SelectValue placeholder="Weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="400" className="text-xs">Regular</SelectItem>
                  <SelectItem value="500" className="text-xs">Medium</SelectItem>
                  <SelectItem value="600" className="text-xs">Semi Bold</SelectItem>
                  <SelectItem value="700" className="text-xs">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Opacity */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Opacity</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={subtitleStyle.alpha}
              onChange={(e) => updateSubtitleStyle({ alpha: Number(e.target.value) })}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
          </div>
        </div>

        {/* --- Footer Font Section --- */}
        <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-3.5">
          <span className="font-bold text-foreground text-xs">ফুটার ফন্ট (Footer Font)</span>

          <Select
            value={creditStyle.fontFamily}
            onValueChange={(val) => updateCreditStyle({ fontFamily: val })}
          >
            <SelectTrigger className="h-9 rounded-xl border-border bg-background text-xs font-semibold">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((f) => (
                <SelectItem key={f} value={f} className="text-xs font-medium">
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Size & Stepper */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Font size</span>
            <input
              type="range"
              min="10"
              max="60"
              value={creditStyle.fontSize}
              onChange={(e) => updateCreditStyle({ fontSize: Number(e.target.value) })}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
            <div className="flex items-center rounded-xl border border-border bg-background px-2 py-1 text-xs font-bold tabular-nums">
              <button
                type="button"
                onClick={() => updateCreditStyle({ fontSize: Math.max(8, creditStyle.fontSize - 1) })}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Minus className="size-3" />
              </button>
              <span className="px-2">{creditStyle.fontSize}</span>
              <button
                type="button"
                onClick={() => updateCreditStyle({ fontSize: Math.min(80, creditStyle.fontSize + 1) })}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Format & Weight Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateCreditStyle({ align: "left" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", creditStyle.align === "left" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateCreditStyle({ align: "center" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", creditStyle.align === "center" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignCenter className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateCreditStyle({ align: "right" })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", creditStyle.align === "right" ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <AlignRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => updateCreditStyle({ italic: !creditStyle.italic })}
                className={cn("p-1.5 rounded-lg border cursor-pointer", creditStyle.italic ? "bg-accent text-primary border-primary" : "border-border text-muted-foreground")}
              >
                <Italic className="size-3.5" />
              </button>
              <input
                type="color"
                value={creditStyle.color}
                onChange={(e) => updateCreditStyle({ color: e.target.value })}
                className="size-7 cursor-pointer rounded-lg border border-border p-0.5 bg-background"
              />
            </div>

            <div className="flex-1">
              <Select
                value={String(creditStyle.fontWeight)}
                onValueChange={(val) => updateCreditStyle({ fontWeight: Number(val) })}
              >
                <SelectTrigger className="h-8 rounded-xl border-border bg-background text-xs font-semibold px-2.5">
                  <SelectValue placeholder="Weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="400" className="text-xs">Regular</SelectItem>
                  <SelectItem value="500" className="text-xs">Medium</SelectItem>
                  <SelectItem value="600" className="text-xs">Semi Bold</SelectItem>
                  <SelectItem value="700" className="text-xs">Bold</SelectItem>
                  <SelectItem value="800" className="text-xs">Extra Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Opacity */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Opacity</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={creditStyle.alpha}
              onChange={(e) => updateCreditStyle({ alpha: Number(e.target.value) })}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 3: Overlay ----------------- */}
      <div className="flex flex-col gap-3 pt-2 border-t border-border/80">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground text-xs shrink-0">ওভারলে (Overlay)</span>
          <div className="h-px flex-1 bg-border/80" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-muted-foreground">Overlay Style</span>

          <Select
            value={currentOverlayValue}
            onValueChange={(val) => {
              if (val === "none") {
                updateOverlay({ enabled: false });
              } else {
                updateOverlay({ enabled: true, direction: val as OverlayDirection });
              }
            }}
          >
            <SelectTrigger className="h-10 rounded-xl border-border bg-card text-xs font-semibold">
              <SelectValue placeholder="Select overlay style" />
            </SelectTrigger>
            <SelectContent>
              {overlayOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs font-medium">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Overlay Size / Coverage Slider */}
        {overlay.enabled && (
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Overlay Size</span>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={overlay.coverPct ?? 50}
              onChange={(e) => updateOverlay({ coverPct: Number(e.target.value) })}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
            <span className="text-xs font-bold tabular-nums text-foreground w-8 text-right">
              {Math.round(overlay.coverPct ?? 50)}%
            </span>
          </div>
        )}

        {/* Opacity, Color & Reset Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[11px] font-semibold text-muted-foreground shrink-0">Opacity</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={overlay.alpha}
            onChange={(e) => updateOverlay({ alpha: Number(e.target.value) })}
            className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
          />

          <input
            type="color"
            value={overlay.color}
            onChange={(e) => updateOverlay({ color: e.target.value })}
            className="size-7 shrink-0 cursor-pointer rounded-lg border border-border p-0.5 bg-background"
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => updateOverlay({ enabled: false, alpha: 0.5, color: "#000000", direction: "gradient-bottom", coverPct: 50 })}
            className="h-7 gap-1 rounded-lg border-border text-[11px] font-medium cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      {/* ----------------- LOGO CROP MODAL DIALOG ----------------- */}
      <LogoCropModal
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        imageSrc={cropImageSrc}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};
