"use client";

import * as React from "react";
import { Check, Crop, Move, RotateCcw, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface LogoCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  onCropComplete: (croppedDataUrl: string) => void;
}

type CropShape = "circle" | "square" | "free";

interface LogoCropModalContentProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

const LogoCropModalContent = ({
  imageSrc,
  onClose,
  onCropComplete,
}: LogoCropModalContentProps) => {
  const [zoom, setZoom] = React.useState(1);
  const [offset, setOffset] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cropShape, setCropShape] = React.useState<CropShape>("circle");
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Dragging handlers for interactive panning
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX - offset.x, y: clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - dragStartRef.current.x,
      y: clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCropAndSave = () => {
    if (!imageSrc || !imgRef.current) return;

    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (cropShape === "free") {
      // Free mode: Preserve original image aspect ratio
      const naturalWidth = img.naturalWidth || 600;
      const naturalHeight = img.naturalHeight || 600;

      // If no zoom/pan adjustment was made, return exact original data URL
      if (zoom === 1 && offset.x === 0 && offset.y === 0) {
        onCropComplete(imageSrc);
        onClose();
        return;
      }

      canvas.width = naturalWidth;
      canvas.height = naturalHeight;
      ctx.clearRect(0, 0, naturalWidth, naturalHeight);

      const centerX = naturalWidth / 2 + offset.x * (naturalWidth / 220);
      const centerY = naturalHeight / 2 + offset.y * (naturalHeight / 220);

      const drawWidth = naturalWidth * zoom;
      const drawHeight = naturalHeight * zoom;

      ctx.drawImage(
        img,
        centerX - drawWidth / 2,
        centerY - drawHeight / 2,
        drawWidth,
        drawHeight
      );
    } else {
      // Circle or Square 1:1 mode
      const outputSize = 600;
      canvas.width = outputSize;
      canvas.height = outputSize;

      ctx.clearRect(0, 0, outputSize, outputSize);

      if (cropShape === "circle") {
        ctx.beginPath();
        ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      } else if (cropShape === "square") {
        ctx.beginPath();
        ctx.rect(0, 0, outputSize, outputSize);
        ctx.closePath();
        ctx.clip();
      }

      const cropSizeInPreview = 220;
      const scaleFactor = outputSize / cropSizeInPreview;

      const centerX = outputSize / 2 + offset.x * scaleFactor;
      const centerY = outputSize / 2 + offset.y * scaleFactor;

      const drawWidth =
        img.naturalWidth *
        zoom *
        scaleFactor *
        (cropSizeInPreview / Math.max(img.naturalWidth, img.naturalHeight));
      const drawHeight =
        img.naturalHeight *
        zoom *
        scaleFactor *
        (cropSizeInPreview / Math.max(img.naturalWidth, img.naturalHeight));

      ctx.drawImage(
        img,
        centerX - drawWidth / 2,
        centerY - drawHeight / 2,
        drawWidth,
        drawHeight
      );
    }

    const croppedDataUrl = canvas.toDataURL("image/png");
    onCropComplete(croppedDataUrl);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-md border-border bg-card p-5 text-foreground rounded-3xl">
        <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/80">
          <DialogTitle className="text-sm font-bold flex items-center gap-2">
            <Crop className="size-4 text-primary" />
            <span>লোগো ক্রপ & সেটিংস (Crop Logo)</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Crop Shape Selector Tabs */}
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-muted/40 p-1 border border-border">
            <button
              type="button"
              onClick={() => {
                setCropShape("circle");
                setZoom(1);
                setOffset({ x: 0, y: 0 });
              }}
              className={cn(
                "flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all cursor-pointer",
                cropShape === "circle" ? "bg-primary text-primary-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              বৃত্তাকার (Circle)
            </button>
            <button
              type="button"
              onClick={() => {
                setCropShape("square");
                setZoom(1);
                setOffset({ x: 0, y: 0 });
              }}
              className={cn(
                "flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all cursor-pointer",
                cropShape === "square" ? "bg-primary text-primary-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              বর্গাকার (Square 1:1)
            </button>
            <button
              type="button"
              onClick={() => {
                setCropShape("free");
                setZoom(1);
                setOffset({ x: 0, y: 0 });
              }}
              className={cn(
                "flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all cursor-pointer",
                cropShape === "free" ? "bg-primary text-primary-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              ফ্রি (Full)
            </button>
          </div>

          {/* Interactive Drag & Crop Canvas Box */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-slate-900/90 cursor-grab active:cursor-grabbing select-none"
          >
            {/* Source image element */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Source Logo"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                maxHeight: cropShape === "free" ? "90%" : "80%",
                maxWidth: cropShape === "free" ? "90%" : "80%",
                objectFit: "contain",
                pointerEvents: "none",
                transition: isDragging ? "none" : "transform 0.05s ease-out",
              }}
            />

            {/* Overlay Crop Mask */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {cropShape === "circle" && (
                <div className="size-56 rounded-full border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.55)] transition-all" />
              )}
              {cropShape === "square" && (
                <div className="size-56 rounded-2xl border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.55)] transition-all" />
              )}
              {cropShape === "free" && (
                <div className="h-[90%] w-[90%] rounded-xl border-2 border-dashed border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.2)] transition-all" />
              )}
            </div>

            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-xs">
              <Move className="size-3 text-primary" />
              <span>টেনে পজিশন সরান</span>
            </div>
          </div>

          {/* Zoom Slider */}
          <div className="flex items-center justify-between gap-3 px-1 pt-1">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 shrink-0">
              <ZoomIn className="size-3.5" />
              <span>জুম (Zoom)</span>
            </span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-1.5 flex-1 appearance-none rounded-lg bg-muted accent-primary cursor-pointer"
            />
            <span className="text-xs font-bold tabular-nums text-foreground w-10 text-right">
              {Math.round(zoom * 100)}%
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                setZoom(1);
                setOffset({ x: 0, y: 0 });
              }}
              className="size-7 rounded-lg border-border cursor-pointer"
              title="রিচেট"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/80">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-xl border-border text-xs font-semibold cursor-pointer"
          >
            বাতিল
          </Button>
          <Button
            type="button"
            onClick={handleCropAndSave}
            className="h-9 gap-1.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer"
          >
            <Check className="size-4" />
            <span>ক্রপ করুন ও লোগো সেট করুন</span>
          </Button>
        </div>
      </DialogContent>
  );
};

export const LogoCropModal = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
}: LogoCropModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {isOpen && imageSrc ? (
        <LogoCropModalContent
          key={imageSrc}
          imageSrc={imageSrc}
          onClose={onClose}
          onCropComplete={onCropComplete}
        />
      ) : null}
    </Dialog>
  );
};
