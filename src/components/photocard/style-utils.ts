import type { CSSProperties } from "react";

import type { RatioKey, TextStyle } from "./types";
import { RATIO_OPTIONS } from "./types";

/** Font sizes are authored assuming a 1080px-wide canvas, then converted to
 *  container-query width units (cqw) so the preview grid and the final
 *  export render at any pixel size stay proportionally identical. */
export const REFERENCE_WIDTH = 1080;

export const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace("#", "");
  const expanded = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = parseInt(expanded, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const textStyleToCss = (style: TextStyle): CSSProperties => ({
  fontFamily: `"${style.fontFamily}", "Purno", "Hind Siliguri", sans-serif`,
  fontSize: `${(style.fontSize / REFERENCE_WIDTH) * 100}cqw`,
  fontWeight: style.fontWeight,
  color: hexToRgba(style.color, style.alpha),
  fontStyle: style.italic ? "italic" : "normal",
  textAlign: style.align,
  lineHeight: style.lineHeight,
  wordBreak: "break-word",
  whiteSpace: "pre-wrap",
});

export const getExportSize = (ratioKey: RatioKey) => {
  const ratio = RATIO_OPTIONS.find((r) => r.key === ratioKey) ?? RATIO_OPTIONS[0];
  const base = REFERENCE_WIDTH;
  const aspect = ratio.w / ratio.h;
  if (aspect >= 1) {
    return { width: Math.round(base * aspect), height: base };
  }
  return { width: base, height: Math.round(base / aspect) };
};
