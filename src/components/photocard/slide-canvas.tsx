"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { AlignToolbar } from "./align-toolbar";
import type { AlignOp } from "./alignment";
import { applyAlign } from "./alignment";
import { EditableBox } from "./editable-box";
import { LogoLayer } from "./logo-layer";
import { OverlayLayer } from "./overlay-layer";
import { getEffectiveField, getEffectiveImage } from "./selectors";
import { usePhotocardStore } from "./store";
import { TextLayer } from "./text-layer";
import { RATIO_OPTIONS } from "./types";
import type { BoxTransform, ElementKind } from "./types";

interface SlideCanvasProps {
  slideId: string;
  editable: boolean;
  exportWidthPx?: number;
  className?: string;
}

export const SlideCanvas = ({ slideId, editable, exportWidthPx, className }: SlideCanvasProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selected, setSelected] = React.useState<Set<ElementKind>>(new Set());
  const selectionResetToken = usePhotocardStore((s) => s.selectionResetToken);
  const [lastResetToken, setLastResetToken] = React.useState(selectionResetToken);

  if (selectionResetToken !== lastResetToken) {
    setLastResetToken(selectionResetToken);
    setSelected(new Set());
  }

  const ratio = usePhotocardStore((s) => s.ratio);
  const images = usePhotocardStore((s) => s.images);
  const titleStyle = usePhotocardStore((s) => s.titleStyle);
  const subtitleStyle = usePhotocardStore((s) => s.subtitleStyle);
  const creditStyle = usePhotocardStore((s) => s.creditStyle);
  const overlay = usePhotocardStore((s) => s.overlay);
  const useSameLogoForAll = usePhotocardStore((s) => s.useSameLogoForAll);
  const globalLogo = usePhotocardStore((s) => s.globalLogo);
  const useSameSubtitleForAll = usePhotocardStore((s) => s.useSameSubtitleForAll);
  const globalSubtitle = usePhotocardStore((s) => s.globalSubtitle);
  const useSameCreditForAll = usePhotocardStore((s) => s.useSameCreditForAll);
  const globalCredit = usePhotocardStore((s) => s.globalCredit);
  const slide = usePhotocardStore((s) => s.slides.find((sl) => sl.id === slideId));
  const updateSlideTitleBox = usePhotocardStore((s) => s.updateSlideTitleBox);
  const updateSlideLogoBox = usePhotocardStore((s) => s.updateSlideLogoBox);
  const updateSlideSubtitleBox = usePhotocardStore((s) => s.updateSlideSubtitleBox);
  const updateSlideCreditBox = usePhotocardStore((s) => s.updateSlideCreditBox);
  const updateGlobalLogo = usePhotocardStore((s) => s.updateGlobalLogo);
  const updateGlobalSubtitle = usePhotocardStore((s) => s.updateGlobalSubtitle);
  const updateGlobalCredit = usePhotocardStore((s) => s.updateGlobalCredit);

  const ratioInfo = RATIO_OPTIONS.find((r) => r.key === ratio) ?? RATIO_OPTIONS[0];

  const handleTitleBoxChange = (box: BoxTransform) => {
    if (slide) updateSlideTitleBox(slide.id, box);
  };
  const handleSubtitleBoxChange = (box: BoxTransform) => {
    if (useSameSubtitleForAll) updateGlobalSubtitle({ box });
    else if (slide) updateSlideSubtitleBox(slide.id, box);
  };
  const handleCreditBoxChange = (box: BoxTransform) => {
    if (useSameCreditForAll) updateGlobalCredit({ box });
    else if (slide) updateSlideCreditBox(slide.id, box);
  };
  const handleLogoBoxChange = (box: BoxTransform) => {
    if (useSameLogoForAll) updateGlobalLogo({ box });
    else if (slide) updateSlideLogoBox(slide.id, box);
  };

  const boxSetters: Record<ElementKind, (box: BoxTransform) => void> = {
    title: handleTitleBoxChange,
    subtitle: handleSubtitleBoxChange,
    credit: handleCreditBoxChange,
    logo: handleLogoBoxChange,
  };

  const makeSelectHandler = (kind: ElementKind) => (mode: "toggle" | "replace") => {
    setSelected((prev) => {
      if (mode === "replace") return new Set([kind]);
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  // Only the EditableBox elements call stopPropagation, so any pointerdown
  // that bubbles up here is, by construction, a click on the background
  // image/overlay rather than on one of the draggable elements.
  const handleBackgroundPointerDown = () => clearSelection();

  if (!slide) return null;

  const image = getEffectiveImage(slide, images);
  const logo = getEffectiveField(slide.logo, useSameLogoForAll, globalLogo);
  const logoImage = images.find((i) => i.id === logo.imageId) ?? null;
  const subtitle = getEffectiveField(slide.subtitle, useSameSubtitleForAll, globalSubtitle);
  const credit = getEffectiveField(slide.credit, useSameCreditForAll, globalCredit);

  const boxes: Record<ElementKind, BoxTransform> = {
    title: slide.titleBox,
    subtitle: subtitle.box,
    credit: credit.box,
    logo: logo.box,
  };

  const applyAlignToSelection = (op: AlignOp) => {
    selected.forEach((kind) => {
      boxSetters[kind](applyAlign(boxes[kind], op));
    });
  };

  return (
    <div
      ref={containerRef}
      data-slide-canvas={slide.id}
      className={cn("@container relative overflow-hidden bg-muted", className)}
      style={{
        aspectRatio: `${ratioInfo.w} / ${ratioInfo.h}`,
        width: exportWidthPx ? `${exportWidthPx}px` : "100%",
      }}
      onPointerDown={editable ? handleBackgroundPointerDown : undefined}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-muted-foreground">
          কোনো ছবি আপলোড করা হয়নি
        </div>
      )}

      <OverlayLayer overlay={overlay} />

      <EditableBox
        box={slide.titleBox}
        onChange={handleTitleBoxChange}
        containerRef={containerRef}
        label="টাইটেল"
        interactive={editable}
        selected={selected.has("title")}
        onSelect={makeSelectHandler("title")}
      >
        <TextLayer text={slide.title} style={titleStyle} placeholder="টাইটেল এখানে বসবে" />
      </EditableBox>

      <EditableBox
        box={subtitle.box}
        onChange={handleSubtitleBoxChange}
        containerRef={containerRef}
        label="সাবটাইটেল"
        interactive={editable}
        minHeightPct={3}
        selected={selected.has("subtitle")}
        onSelect={makeSelectHandler("subtitle")}
      >
        <TextLayer text={subtitle.text} style={subtitleStyle} placeholder="সাবটাইটেল" />
      </EditableBox>

      <EditableBox
        box={credit.box}
        onChange={handleCreditBoxChange}
        containerRef={containerRef}
        label="ক্রেডিট"
        interactive={editable}
        minHeightPct={3}
        selected={selected.has("credit")}
        onSelect={makeSelectHandler("credit")}
      >
        <TextLayer text={credit.text} style={creditStyle} placeholder="ক্রেডিট" />
      </EditableBox>

      <EditableBox
        box={logo.box}
        onChange={handleLogoBoxChange}
        containerRef={containerRef}
        label="লোগো"
        interactive={editable}
        minWidthPct={4}
        minHeightPct={3}
        selected={selected.has("logo")}
        onSelect={makeSelectHandler("logo")}
      >
        <LogoLayer url={logoImage?.url ?? null} />
      </EditableBox>

      {editable && selected.size > 0 && (
        <AlignToolbar count={selected.size} onAlign={applyAlignToSelection} onClear={clearSelection} />
      )}
    </div>
  );
};
