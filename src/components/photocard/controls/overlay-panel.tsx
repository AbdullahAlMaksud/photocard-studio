"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

import { defaultOverlay } from "../defaults";
import { usePhotocardStore } from "../store";
import type { OverlayDirection } from "../types";
import { ColorField } from "./color-field";

const DIRECTIONS: { value: OverlayDirection; label: string }[] = [
  { value: "flat", label: "সম্পূর্ণ ফ্ল্যাট টিন্ট" },
  { value: "gradient-bottom", label: "নিচ থেকে গ্র্যাডিয়েন্ট" },
  { value: "gradient-top", label: "উপর থেকে গ্র্যাডিয়েন্ট" },
  { value: "solid-bottom", label: "নিচ থেকে সলিড কালার" },
  { value: "solid-top", label: "উপর থেকে সলিড কালার" },
];

export const OverlayPanel = () => {
  const overlay = usePhotocardStore((s) => s.overlay);
  const updateOverlay = usePhotocardStore((s) => s.updateOverlay);
  const defaults = defaultOverlay();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="overlay-enabled">ওভারলে চালু</Label>
        <Switch
          id="overlay-enabled"
          checked={overlay.enabled}
          onCheckedChange={(v) => updateOverlay({ enabled: v })}
        />
      </div>

      {overlay.enabled && (
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="overlay-direction">স্টাইল</Label>
            <Select value={overlay.direction} onValueChange={(v) => updateOverlay({ direction: v as OverlayDirection })}>
              <SelectTrigger id="overlay-direction" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DIRECTIONS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="overlay-cover">সাইজ / কভারেজ</Label>
              <span className="text-xs text-muted-foreground">{Math.round(overlay.coverPct ?? 50)}%</span>
            </div>
            <Slider
              id="overlay-cover"
              min={5}
              max={100}
              step={1}
              value={[overlay.coverPct ?? 50]}
              onValueChange={([v]) => updateOverlay({ coverPct: v })}
            />
          </div>

          <ColorField
            idPrefix="overlay"
            label="কালার"
            color={overlay.color}
            alpha={overlay.alpha}
            defaultColor={defaults.color}
            defaultAlpha={defaults.alpha}
            onColorChange={(color) => updateOverlay({ color })}
            onAlphaChange={(alpha) => updateOverlay({ alpha })}
          />
        </>
      )}
    </div>
  );
};
