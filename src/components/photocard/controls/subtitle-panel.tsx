"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { defaultSubtitleStyle } from "../defaults";
import { usePhotocardStore } from "../store";
import { TextStyleFields } from "./text-style-fields";

export const SubtitlePanel = () => {
  const style = usePhotocardStore((s) => s.subtitleStyle);
  const update = usePhotocardStore((s) => s.updateSubtitleStyle);
  const fonts = usePhotocardStore((s) => s.fonts);
  const useSameForAll = usePhotocardStore((s) => s.useSameSubtitleForAll);
  const setUseSameForAll = usePhotocardStore((s) => s.setUseSameSubtitleForAll);
  const globalSubtitle = usePhotocardStore((s) => s.globalSubtitle);
  const updateGlobalSubtitle = usePhotocardStore((s) => s.updateGlobalSubtitle);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="subtitle-same">সব স্লাইডে একই সাবটাইটেল</Label>
        <Switch id="subtitle-same" checked={useSameForAll} onCheckedChange={setUseSameForAll} />
      </div>

      {useSameForAll ? (
        <Textarea
          value={globalSubtitle.text}
          onChange={(e) => updateGlobalSubtitle({ text: e.target.value })}
          placeholder="সব স্লাইডে দেখানো সাবটাইটেল"
          className="min-h-16"
        />
      ) : (
        <p className="text-[11px] text-muted-foreground">
          প্রতিটি স্লাইডের জন্য আলাদা সাবটাইটেল নিচের স্লাইড তালিকায় লিখুন।
        </p>
      )}

      <TextStyleFields
        idPrefix="subtitle"
        style={style}
        defaultStyle={defaultSubtitleStyle()}
        fonts={fonts}
        onChange={update}
      />
    </div>
  );
};
