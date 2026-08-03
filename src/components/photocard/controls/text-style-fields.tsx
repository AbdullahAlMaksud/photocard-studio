"use client";

import { AlignCenter, AlignLeft, AlignRight, Italic } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import { BUILT_IN_FONTS } from "../types";
import type { TextAlign, TextStyle, UploadedFont } from "../types";
import { ColorField } from "./color-field";

const WEIGHTS = [400, 500, 600, 700, 800, 900];

interface TextStyleFieldsProps {
  idPrefix: string;
  style: TextStyle;
  defaultStyle: TextStyle;
  fonts: UploadedFont[];
  onChange: (patch: Partial<TextStyle>) => void;
}

export const TextStyleFields = ({ idPrefix, style, defaultStyle, fonts, onChange }: TextStyleFieldsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${idPrefix}-font`}>ফন্ট</Label>
        <Select value={style.fontFamily} onValueChange={(v) => onChange({ fontFamily: v })}>
          <SelectTrigger id={`${idPrefix}-font`} size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {BUILT_IN_FONTS.map((f) => (
                <SelectItem key={f.family} value={f.family}>
                  {f.label}
                </SelectItem>
              ))}
              {fonts.map((f) => (
                <SelectItem key={f.id} value={f.family}>
                  {f.label} (আপলোড করা)
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor={`${idPrefix}-size`}>সাইজ</Label>
          <span className="text-xs text-muted-foreground">{style.fontSize}px</span>
        </div>
        <Slider
          id={`${idPrefix}-size`}
          min={12}
          max={140}
          step={1}
          value={[style.fontSize]}
          onValueChange={([v]) => onChange({ fontSize: v })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${idPrefix}-weight`}>ওয়েইট</Label>
        <Select value={String(style.fontWeight)} onValueChange={(v) => onChange({ fontWeight: Number(v) })}>
          <SelectTrigger id={`${idPrefix}-weight`} size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {WEIGHTS.map((w) => (
              <SelectItem key={w} value={String(w)}>
                {w}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ColorField
        idPrefix={idPrefix}
        label="কালার"
        color={style.color}
        alpha={style.alpha}
        defaultColor={defaultStyle.color}
        defaultAlpha={defaultStyle.alpha}
        onColorChange={(color) => onChange({ color })}
        onAlphaChange={(alpha) => onChange({ alpha })}
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-md border border-input p-0.5">
          {(
            [
              ["left", AlignLeft],
              ["center", AlignCenter],
              ["right", AlignRight],
            ] as [TextAlign, typeof AlignLeft][]
          ).map(([align, Icon]) => (
            <button
              key={align}
              type="button"
              onClick={() => onChange({ align })}
              className={cn(
                "flex size-7 items-center justify-center rounded-sm transition-colors",
                style.align === align ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onChange({ italic: !style.italic })}
          className={cn(
            "flex size-7 items-center justify-center rounded-sm border border-input transition-colors",
            style.italic ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Italic className="size-3.5" />
        </button>
      </div>
    </div>
  );
};
