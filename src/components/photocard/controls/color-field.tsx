"use client";

import { RotateCcw } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ColorFieldProps {
  idPrefix: string;
  label: string;
  color: string;
  alpha: number;
  defaultColor: string;
  defaultAlpha: number;
  onColorChange: (color: string) => void;
  onAlphaChange: (alpha: number) => void;
}

export const ColorField = ({
  idPrefix,
  label,
  color,
  alpha,
  defaultColor,
  defaultAlpha,
  onColorChange,
  onAlphaChange,
}: ColorFieldProps) => {
  const isDefault = color.toLowerCase() === defaultColor.toLowerCase() && alpha === defaultAlpha;

  const handleReset = () => {
    onColorChange(defaultColor);
    onAlphaChange(defaultAlpha);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={`${idPrefix}-color`}>{label}</Label>
        <button
          type="button"
          onClick={handleReset}
          disabled={isDefault}
          title="ডিফল্টে ফিরিয়ে নিন"
          className="flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          <RotateCcw className="size-3" />
          রিসেট
        </button>
      </div>

      <div className="flex h-8 items-center gap-2 rounded-md border border-input px-2">
        <input
          id={`${idPrefix}-color`}
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="size-5 shrink-0 cursor-pointer border-none bg-transparent p-0"
        />
        <input
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full bg-transparent text-xs outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="w-8 shrink-0 text-[10px] text-muted-foreground">আলফা</span>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[alpha]}
          onValueChange={([v]) => onAlphaChange(v)}
        />
        <span className="w-9 shrink-0 text-right text-[10px] text-muted-foreground">
          {Math.round(alpha * 100)}%
        </span>
      </div>
    </div>
  );
};
