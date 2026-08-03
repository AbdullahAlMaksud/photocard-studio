export type RatioKey = "1:1" | "1:2" | "3:4" | "16:9";

export type TextAlign = "left" | "center" | "right";

/** Position + size of a draggable/resizable overlay element, in percentages
 *  relative to the slide box. Percentages keep layout stable across the
 *  on-screen preview size and the higher-resolution export render. */
export interface BoxTransform {
  xPct: number;
  yPct: number;
  widthPct: number;
  heightPct: number;
}

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
}

export interface UploadedFont {
  id: string;
  label: string;
  family: string;
  fileName: string;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  /** 0–1 opacity of the text color. */
  alpha: number;
  italic: boolean;
  align: TextAlign;
  lineHeight: number;
}

export type OverlayDirection = "flat" | "gradient-top" | "gradient-bottom" | "gradient-both" | "solid-top" | "solid-bottom" | "vignette";

export interface OverlaySettings {
  enabled: boolean;
  color: string;
  /** 0–1 opacity of the overlay color. */
  alpha: number;
  direction: OverlayDirection;
  /** For solid-top / solid-bottom: how much of the slide height the solid band covers, 0–100. */
  coverPct: number;
}

export interface LogoState {
  imageId: string | null;
  box: BoxTransform;
}

/** Shared shape for the subtitle and credit text layers — content + placement. */
export interface TextFieldState {
  text: string;
  box: BoxTransform;
}

export interface SlideData {
  id: string;
  title: string;
  imageId: string | null;
  titleBox: BoxTransform;
  subtitle: TextFieldState;
  credit: TextFieldState;
  logo: LogoState;
}

/** The four draggable/selectable layers on a slide's canvas. */
export type ElementKind = "title" | "subtitle" | "credit" | "logo";

export type ThemeMode = "dark" | "light";

export const RATIO_OPTIONS: { key: RatioKey; label: string; w: number; h: number }[] = [
  { key: "1:1", label: "1:1 · স্কয়ার", w: 1, h: 1 },
  { key: "1:2", label: "1:2 · টল", w: 1, h: 2 },
  { key: "3:4", label: "3:4 · পোর্ট্রেট", w: 3, h: 4 },
  { key: "16:9", label: "16:9 · ওয়াইড", w: 16, h: 9 },
];

export const BUILT_IN_FONTS: { family: string; label: string }[] = [
  { family: "Purno", label: "Purno (পুর্ন - ডিফল্ট বাংলা)" },
  { family: "Hind Siliguri", label: "Hind Siliguri (বাংলা)" },
  { family: "Anek Bangla", label: "Anek Bangla (বাংলা)" },
  { family: "Tiro Bangla", label: "Tiro Bangla (বাংলা)" },
  { family: "Noto Serif Bengali", label: "Noto Serif Bengali (বাংলা)" },
  { family: "Noto Sans Bengali", label: "Noto Sans Bengali (বাংলা)" },
  { family: "Manrope", label: "Manrope (UI Latin)" },
  { family: "Poppins", label: "Poppins (Latin)" },
  { family: "Space Grotesk", label: "Space Grotesk (Display)" },
];
