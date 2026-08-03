"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { defaultCreditStyle } from "../defaults";
import { usePhotocardStore } from "../store";
import { TextStyleFields } from "./text-style-fields";

export const CreditPanel = () => {
  const style = usePhotocardStore((s) => s.creditStyle);
  const update = usePhotocardStore((s) => s.updateCreditStyle);
  const fonts = usePhotocardStore((s) => s.fonts);
  const useSameForAll = usePhotocardStore((s) => s.useSameCreditForAll);
  const setUseSameForAll = usePhotocardStore((s) => s.setUseSameCreditForAll);
  const globalCredit = usePhotocardStore((s) => s.globalCredit);
  const updateGlobalCredit = usePhotocardStore((s) => s.updateGlobalCredit);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="credit-same">সব স্লাইডে একই ক্রেডিট</Label>
        <Switch id="credit-same" checked={useSameForAll} onCheckedChange={setUseSameForAll} />
      </div>

      {useSameForAll ? (
        <Textarea
          value={globalCredit.text}
          onChange={(e) => updateGlobalCredit({ text: e.target.value })}
          placeholder="সব স্লাইডে দেখানো ক্রেডিট / ফুটার টেক্সট"
          className="min-h-16"
        />
      ) : (
        <p className="text-[11px] text-muted-foreground">
          প্রতিটি স্লাইডের জন্য আলাদা ক্রেডিট নিচের স্লাইড তালিকায় লিখুন।
        </p>
      )}

      <TextStyleFields
        idPrefix="credit"
        style={style}
        defaultStyle={defaultCreditStyle()}
        fonts={fonts}
        onChange={update}
      />
    </div>
  );
};
