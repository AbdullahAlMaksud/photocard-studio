"use client";

import * as React from "react";
import { Check, Layers, Minus, Pencil, Plus, Sparkles, Trash2, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { usePhotocardStore } from "../store";

export const ContentSettingsPanel = () => {
  const { t } = useTranslation();
  const [showBatchModal, setShowBatchModal] = React.useState(false);

  // Single Add Title & Subtitle pair state (Subtitle on top, Title below)
  const [singleSubtitleInput, setSingleSubtitleInput] = React.useState("");
  const [singleTitleInput, setSingleTitleInput] = React.useState("");

  // Batch Add Titles & Subtitles pair state (Subtitle on top, Title below)
  const [batchSubtitlesInput, setBatchSubtitlesInput] = React.useState("");
  const [batchTitlesInput, setBatchTitlesInput] = React.useState("");

  // Inline Slide Editing state
  const [editingSlideId, setEditingSlideId] = React.useState<string | null>(null);
  const [editingSubtitleText, setEditingSubtitleText] = React.useState("");
  const [editingTitleText, setEditingTitleText] = React.useState("");

  const slides = usePhotocardStore((s) => s.slides);
  const activeSlideId = usePhotocardStore((s) => s.activeSlideId);
  const setActiveSlideId = usePhotocardStore((s) => s.setActiveSlideId);

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
  const addSlidePair = usePhotocardStore((s) => s.addSlidePair);
  const addBatchSlides = usePhotocardStore((s) => s.addBatchSlides);
  const removeSlide = usePhotocardStore((s) => s.removeSlide);

  const activeIndex = Math.max(
    0,
    slides.findIndex((sl) => sl.id === activeSlideId)
  );
  const slide = slides[activeIndex] || slides[0];

  // Handle single slide pair submit
  const handleAddSinglePairSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!singleTitleInput.trim() && !singleSubtitleInput.trim()) return;

    addSlidePair(singleTitleInput, singleSubtitleInput);
    setSingleTitleInput("");
    setSingleSubtitleInput("");
  };

  // Handle batch slides pair submit (Subtitle on top, Title below)
  const handleBatchSubmit = () => {
    const titleLines = batchTitlesInput
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const subLines = batchSubtitlesInput
      .split(/\r?\n/)
      .map((l) => l.trim());

    if (titleLines.length === 0 && subLines.filter(Boolean).length === 0) return;

    const count = Math.max(titleLines.length, subLines.filter(Boolean).length);
    const items = Array.from({ length: count }).map((_, index) => ({
      title: titleLines[index] !== undefined ? titleLines[index] : "",
      subtitle: subLines[index] !== undefined ? subLines[index] : "",
    })).filter((item) => item.title || item.subtitle);

    addBatchSlides(items);
    setBatchTitlesInput("");
    setBatchSubtitlesInput("");
    setShowBatchModal(false);
  };

  const handleStartEdit = (slideId: string, title: string, subtitle: string) => {
    setEditingSlideId(slideId);
    setEditingTitleText(title);
    setEditingSubtitleText(subtitle);
  };

  const handleSaveEdit = (slideId: string) => {
    updateSlideTitle(slideId, editingTitleText);
    updateSlideSubtitle(slideId, { text: editingSubtitleText });
    setEditingSlideId(null);
    setEditingTitleText("");
    setEditingSubtitleText("");
  };

  if (!slide) return null;

  return (
    <div data-lenis-prevent className="flex flex-col gap-5 p-4 text-xs">
      {/* ----------------- SECTION 1: Slide Creation & Batch Slides ----------------- */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-border/80 pb-2">
          <span className="font-bold text-foreground text-xs">
            {t("controls.subtitle_title_pair")}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowBatchModal(!showBatchModal)}
            className="h-7 gap-1.5 rounded-xl border-primary/40 text-primary hover:bg-primary/10 text-[11px] font-semibold cursor-pointer"
          >
            <Sparkles className="size-3.5" />
            <span>{t("controls.add_batch_btn")}</span>
          </Button>
        </div>

        {/* Quick Add Single Slide Pair Form (Subtitle Top, Title Below) */}
        <form onSubmit={handleAddSinglePairSubmit} className="flex flex-col gap-2 pt-1">
          <span className="font-semibold text-muted-foreground text-[11px]">{t("controls.new_pair_heading")}</span>
          <Input
            type="text"
            value={singleSubtitleInput}
            onChange={(e) => setSingleSubtitleInput(e.target.value)}
            placeholder={t("controls.new_sub_placeholder")}
            className="h-9 rounded-xl border-border bg-card text-xs font-medium"
          />
          <Input
            type="text"
            value={singleTitleInput}
            onChange={(e) => setSingleTitleInput(e.target.value)}
            placeholder={t("controls.new_title_placeholder")}
            className="h-9 rounded-xl border-border bg-card text-xs font-medium"
          />
          <Button
            type="submit"
            disabled={!singleTitleInput.trim() && !singleSubtitleInput.trim()}
            className="h-9 w-full gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>{t("controls.add_slide_btn")}</span>
          </Button>
        </form>
      </div>

      {/* ----------------- BATCH ADD SLIDES EXPANDABLE MODAL ----------------- */}
      {showBatchModal && (
        <div className="flex flex-col gap-3 rounded-2xl border-2 border-primary/30 bg-primary/5 p-3.5 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary" />
              <span className="font-bold text-primary text-xs">{t("controls.batch_modal_title")}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowBatchModal(false)}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-muted-foreground">
            {t("controls.batch_modal_desc")}
          </p>

          {/* Subtitle Textarea (TOP) */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground text-[11px]">{t("controls.sub_batch_label")}</span>
            <Textarea
              value={batchSubtitlesInput}
              onChange={(e) => setBatchSubtitlesInput(e.target.value)}
              placeholder={`Sub 1\nSub 2\nSub 3`}
              className="min-h-24 rounded-xl border-border bg-background text-xs font-medium"
            />
          </div>

          {/* Title Textarea (BELOW) */}
          <div className="flex flex-col gap-1 pt-1">
            <span className="font-semibold text-foreground text-[11px]">{t("controls.title_batch_label")}</span>
            <Textarea
              value={batchTitlesInput}
              onChange={(e) => setBatchTitlesInput(e.target.value)}
              placeholder={`Title 1\nTitle 2\nTitle 3`}
              className="min-h-24 rounded-xl border-border bg-background text-xs font-medium"
            />
          </div>

          <Button
            type="button"
            onClick={handleBatchSubmit}
            disabled={!batchTitlesInput.trim() && !batchSubtitlesInput.trim()}
            className="h-10 w-full gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer mt-1"
          >
            <Plus className="size-4" />
            <span>{t("controls.create_batch_btn")}</span>
          </Button>
        </div>
      )}

      {/* ----------------- SECTION 2: Footer Credit ----------------- */}
      <div className="flex flex-col gap-2 pt-2 border-t border-border/80">
        <span className="font-semibold text-muted-foreground text-[11px]">{t("controls.footer_credit_heading")}</span>
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
          placeholder={t("controls.footer_placeholder")}
          className="h-10 rounded-xl border-border bg-card text-xs font-medium"
        />

        <div className="flex items-center justify-between rounded-xl bg-card border border-border px-3 py-2">
          <span className="text-[11px] font-semibold text-foreground">{t("controls.same_footer_toggle")}</span>
          <Switch
            checked={useSameCreditForAll}
            onCheckedChange={(checked) => setUseSameCreditForAll(checked)}
          />
        </div>
      </div>

      {/* ----------------- SECTION 3: Slides List ----------------- */}
      <div className="flex flex-col gap-2 pt-2 border-t border-border/80">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-muted-foreground text-[11px]">{t("controls.all_slides_heading")} ({slides.length})</span>
        </div>

        {slides.length > 0 && (
          <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto thin-scrollbar pr-0.5">
            {slides.map((sl, index) => {
              const isActive = sl.id === activeSlideId;
              const isEditing = editingSlideId === sl.id;

              return (
                <div
                  key={sl.id}
                  onClick={() => !isEditing && setActiveSlideId(sl.id)}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-xl border p-2.5 text-xs transition-all cursor-pointer",
                    isActive
                      ? "border-primary bg-primary/10 font-semibold shadow-2xs"
                      : "border-border/80 bg-card hover:border-border hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                        #{index + 1}
                      </span>

                      {isEditing ? (
                        <div className="flex flex-col gap-1.5 flex-1 w-full" onClick={(e) => e.stopPropagation()}>
                          <Input
                            type="text"
                            value={editingSubtitleText}
                            onChange={(e) => setEditingSubtitleText(e.target.value)}
                            placeholder={t("controls.new_sub_placeholder")}
                            className="h-7 text-xs rounded-lg border-primary bg-background px-2"
                          />
                          <Input
                            type="text"
                            value={editingTitleText}
                            onChange={(e) => setEditingTitleText(e.target.value)}
                            placeholder={t("controls.new_title_placeholder")}
                            className="h-7 text-xs rounded-lg border-primary bg-background px-2"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col min-w-0 leading-tight">
                          {/* Subtitle on TOP */}
                          <span className="truncate text-[11px] text-muted-foreground font-semibold">
                            {sl.subtitle?.text || <span className="italic opacity-60 font-normal">( Empty Subtitle )</span>}
                          </span>
                          {/* Title BELOW */}
                          <span className="truncate text-foreground text-xs font-bold">
                            {sl.title || <span className="italic text-muted-foreground font-normal">( Empty Title )</span>}
                          </span>
                        </div>
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
                          onClick={() => handleStartEdit(sl.id, sl.title, sl.subtitle?.text || "")}
                          className="size-7 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                          title="Edit slide pair"
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
