"use client";

import { cn } from "@/lib/utils";

import { usePhotocardStore } from "../store";
import { RATIO_OPTIONS } from "../types";

export const RatioPanel = () => {
  const ratio = usePhotocardStore((s) => s.ratio);
  const setRatio = usePhotocardStore((s) => s.setRatio);

  return (
    <div className="grid grid-cols-2 gap-2">
      {RATIO_OPTIONS.map((r) => (
        <button
          key={r.key}
          type="button"
          onClick={() => setRatio(r.key)}
          className={cn(
            "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs transition-colors",
            ratio === r.key
              ? "border-primary bg-primary/15 text-foreground"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          <span
            className="rounded-sm border-2 border-current opacity-80"
            style={{
              width: r.w >= r.h ? 24 : 24 * (r.w / r.h),
              height: r.h >= r.w ? 24 : 24 * (r.h / r.w),
            }}
          />
          {r.label}
        </button>
      ))}
    </div>
  );
};
