"use client";

import * as React from "react";
import { Type, X } from "lucide-react";

import { registerFontFile } from "../font-loader";
import { usePhotocardStore } from "../store";

export const FontUploadPanel = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);
  const fonts = usePhotocardStore((s) => s.fonts);
  const addFont = usePhotocardStore((s) => s.addFont);
  const removeFont = usePhotocardStore((s) => s.removeFont);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setLoading(true);
    try {
      for (const file of Array.from(files)) {
        const font = await registerFontFile(file);
        addFont(font);
      }
    } catch {
      // Unsupported / corrupt font file — silently skip so the rest still load
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-border py-5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
      >
        <Type className="size-4" />
        {loading ? "ফন্ট লোড হচ্ছে..." : "ফন্ট আপলোড করুন (.ttf, .otf, .woff)"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".ttf,.otf,.woff,.woff2"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {fonts.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {fonts.map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs"
              style={{ fontFamily: `"${f.family}"` }}
            >
              <span className="truncate">{f.label}</span>
              <button
                type="button"
                onClick={() => removeFont(f.id)}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
