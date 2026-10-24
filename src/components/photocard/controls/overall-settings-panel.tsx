"use client";

import * as React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Check,
  Italic,
  Minus,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Underline,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { usePhotocardStore } from "../store";
import type { OverlayDirection, RatioKey } from "../types";
import { BUILT_IN_FONTS } from "../types";

export const OverallSettingsPanel = () => {
  const bgInputRef = React.useRef<HTMLInputElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const fontInputRef = React.useRef<HTMLInputElement>(null);

  const [newTitleInput, setNewTitleInput] = React.useState("");
  const [editingTitleId, setEditingTitleId] = React.useState<string | null>(null);
  const [editingTitleText, setEditingTitleText] = React.useState("");

  const slides = usePhotocardStore((s) => s.slides);
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const setActiveSlideId = usePhotocardStore((s) => s.setActiveSlideId);
  const images = usePhotocardStore((s) => s.images);
  const addImages = usePhotocardStore((s) => s.addImages);
  const removeImage = usePhotocardStore((s) => s.removeImage);

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

  const useSameSubtitleForAll = usePhotocardStore((s) => s.useSameSubtitleForAll);
  const setUseSameSubtitleForAll = usePhotocardStore((s) => s.setUseSameSubtitleForAll);
  const globalSubtitle = usePhotocardStore((s) => s.globalSubtitle);
  const updateGlobalSubtitle = usePhotocardStore((s) => s.updateGlobalSubtitle);

  const useSameCreditForAll = usePhotocardStore((s) => s.useSameCreditForAll);
  const setUseSameCreditForAll = usePhotocardStore((s) => s.setUseSameCreditForAll);
  const globalCredit = usePhotocardStore((s) => s.globalCredit);
  const updateGlobalCredit = usePhotocardStore((s) => s.updateGlobalCredit);

  const updateSlideTitle = usePhotocardStore((s) => s.updateSlideTitle);
  const updateSlideSubtitle = usePhotocardStore((s) => s.updateSlideSubtitle);
  const updateSlideCredit = usePhotocardStore((s) => s.updateSlideCredit);
  const updateSlideLogo = usePhotocardStore((s) => s.updateSlideLogo);
  const setSlideImage = usePhotocardStore((s) => s.setSlideImage);
  const addBatchSlides = usePhotocardStore((s) => s.addBatchSlides);
  const addNewTitle = usePhotocardStore((s) => s.addNewTitle);
  const removeSlide = usePhotocardStore((s) => s.removeSlide);

  const activeIndex = Math.max(
    0,
    slides.findIndex((sl) => sl.id === activeSlideId)
  );
  const slide = slides[activeIndex] || slides[0];

  const handleBgUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const [created] = addImages(Array.from(files));
    if (slide) setSlideImage(slide.id, created.id);
  };

  const handleLogoUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const [created] = addImages([files[0]]);
    if (slide) updateSlideLogo(slide.id, { imageId: created.id });
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

  const handleAddTitleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTitleInput.trim()) return;

    const lines = newTitleInput
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length > 1) {
      addBatchSlides(lines);
    } else if (lines.length === 1) {
      addNewTitle(lines[0]);
    }
    setNewTitleInput("");
  };

  const handleStartEdit = (slideId: string, currentTitle: string) => {
    setEditingTitleId(slideId);
    setEditingTitleText(currentTitle);
  };

  const handleSaveEdit = (slideId: string) => {
    updateSlideTitle(slideId, editingTitleText);
    setEditingTitleId(null);
    setEditingTitleText("");
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

  if (!slide) return null;

  return (
    <div className="flex flex-col gap-6 p-5 thin-scrollbar text-xs">
      {/* ----------------- SECTION 1: Background & Size ----------------- */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground text-xs shrink-0">Background & Size</span>
          <div className="h-px flex-1 bg-border/80" />
        </div>

        {/* Upload Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => bgInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 py-4 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
          >
            <Upload className="size-4" />
            <span className="text-[11px] font-semibold text-center">Upload your images</span>
          </button>
          <input
            ref={bgInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleBgUpload(e.target.files)}
          />

          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 py-4 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
          >
            <Upload className="size-4" />
            <span className="text-[11px] font-semibold text-center">Upload your logo</span>
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoUpload(e.target.files)}
          />
        </div>

        {/* Uploaded Images Thumbnails Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                >
                  <X className="size-2.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Frame Ratio Cards Row */}
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
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-muted/40 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                <div className="flex flex-1 items-center justify-center">
                  <div
                    className={cn(
                      "rounded-sm border-2 transition-colors",
                      isActive ? "border-white bg-white/20" : "border-muted-foreground/60 bg-muted-foreground/10"
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

      {/* ----------------- SECTION 2: Content ----------------- */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground text-xs shrink-0">Content</span>
          <div className="h-px flex-1 bg-border/80" />
        </div>

        {/* Title Section */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-muted-foreground text-[11px]">Title</span>

          {/* List of added titles above input */}
          {slides.length > 0 && (
            <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto thin-scrollbar pr-0.5">
              {slides.map((sl, index) => {
                const isActive = sl.id === activeSlideId;
                const isEditing = editingTitleId === sl.id;

                return (
                  <div
                    key={sl.id}
                    onClick={() => !isEditing && setActiveSlideId(sl.id)}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-2xl border p-2 text-xs transition-all cursor-pointer",
                      isActive
                        ? "border-primary bg-primary/10 font-semibold shadow-2xs"
                        : "border-border/80 bg-card hover:border-border hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                        #{index + 1}
                      </span>

                      {isEditing ? (
                        <Input
                          type="text"
                          value={editingTitleText}
                          onChange={(e) => setEditingTitleText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSaveEdit(sl.id);
                            } else if (e.key === "Escape") {
                              setEditingTitleId(null);
                            }
                          }}
                          autoFocus
                          className="h-7 text-xs rounded-xl border-primary bg-background px-2"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="truncate text-foreground text-xs font-medium">
                          {sl.title || <span className="italic text-muted-foreground">(Empty title)</span>}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {isEditing ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSaveEdit(sl.id)}
                          className="size-7 rounded-lg text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                          title="Save"
                        >
                          <Check className="size-3.5" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStartEdit(sl.id, sl.title)}
                          className="size-7 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                          title="Edit title"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={slides.length <= 1}
                        onClick={() => removeSlide(sl.id)}
                        className="size-7 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 disabled:opacity-30 cursor-pointer"
                        title="Delete slide"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Single Title Input + Plus Button Bar */}
          <form onSubmit={handleAddTitleSubmit} className="flex items-center gap-2 pt-0.5">
            <Input
              type="text"
              value={newTitleInput}
              onChange={(e) => setNewTitleInput(e.target.value)}
              placeholder="Type title..."
              className="h-10 flex-1 rounded-2xl border-border bg-card text-xs font-semibold"
            />
            <Button
              type="submit"
              size="icon"
              className="size-10 shrink-0 rounded-2xl bg-black text-white hover:bg-black/90 cursor-pointer shadow-xs"
              title="Add title"
            >
              <Plus className="size-4" />
            </Button>
          </form>
        </div>

        {/* Subhead Input & Apply to All Pill Bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="font-semibold text-muted-foreground text-[11px]">Subhead</span>
          <Input
            type="text"
            value={useSameSubtitleForAll ? globalSubtitle.text : slide.subtitle.text}
            onChange={(e) => {
              const val = e.target.value;
              if (useSameSubtitleForAll) {
                updateGlobalSubtitle({ text: val });
              } else {
                updateSlideSubtitle(slide.id, { text: val });
              }
            }}
            placeholder="Type your subhead"
            className="h-10 rounded-2xl border-border bg-card text-xs font-semibold"
          />

          <div className="flex items-center justify-between rounded-full bg-black px-4 py-2 text-white shadow-xs">
            <span className="text-xs font-bold">Apply to all</span>
            <Switch
              checked={useSameSubtitleForAll}
              onCheckedChange={(checked) => setUseSameSubtitleForAll(checked)}
            />
          </div>
        </div>

        {/* Footer Credit Input & Apply to All Pill Bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="font-semibold text-muted-foreground text-[11px]">Footer Credit</span>
          <Input
            type="text"
            value={useSameCreditForAll ? globalCredit.text : slide.credit.text}
            onChange={(e) => {
              const val = e.target.value;
              if (useSameCreditForAll) {
                updateGlobalCredit({ text: val });
              } else {
                updateSlideCredit(slide.id, { text: val });
              }
            }}
            placeholder="Type your footer credit"
            className="h-10 rounded-2xl border-border bg-card text-xs font-semibold"
          />

          <div className="flex items-center justify-between rounded-full bg-black px-4 py-2 text-white shadow-xs">
            <span className="text-xs font-bold">Apply to all</span>
            <Switch
              checked={useSameCreditForAll}
              onCheckedChange={(checked) => setUseSameCreditForAll(checked)}
            />
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 3: Typography ----------------- */}
      <div className="flex flex-col gap-3">
        <span className="font-bold text-foreground text-xs">Typography</span>

        {/* Upload Font Card */}
        <button
          type="button"
          onClick={() => fontInputRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 py-3.5 text-muted-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
        >
          <Upload className="size-4" />
          <span className="text-xs font-semibold">Upload your font</span>
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
          <span className="font-bold text-foreground text-xs">Title Font</span>

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

          {/* Font Format & Weight Row */}
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
              <button
                type="button"
                className="p-1.5 rounded-lg border border-border text-muted-foreground cursor-pointer"
              >
                <Underline className="size-3.5" />
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
          <span className="font-bold text-foreground text-xs">Subhead Font</span>

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
        </div>

        {/* --- Footer Font Section --- */}
        <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-3.5">
          <span className="font-bold text-foreground text-xs">Footer Font</span>

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

      {/* ----------------- SECTION 4: Overlay ----------------- */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground text-xs shrink-0">Overlay</span>
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
    </div>
  );
};
