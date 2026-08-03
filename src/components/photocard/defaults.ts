import type { BoxTransform, OverlaySettings, SlideData, TextStyle } from "./types";

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

export const defaultTitleBox = (): BoxTransform => ({
  xPct: 8,
  yPct: 62,
  widthPct: 84,
  heightPct: 26,
});

/** Subtitle sits above the title by default. */
export const defaultSubtitleBox = (): BoxTransform => ({
  xPct: 8,
  yPct: 49,
  widthPct: 84,
  heightPct: 11,
});

/** Credit is the footer-style line, anchored near the bottom. */
export const defaultCreditBox = (): BoxTransform => ({
  xPct: 8,
  yPct: 90,
  widthPct: 84,
  heightPct: 8,
});

export const defaultLogoBox = (): BoxTransform => ({
  xPct: 6,
  yPct: 5,
  widthPct: 18,
  heightPct: 10,
});

export const defaultTitleStyle = (): TextStyle => ({
  fontFamily: "Purno",
  fontSize: 44,
  fontWeight: 700,
  color: "#ffffff",
  alpha: 1,
  italic: false,
  align: "left",
  lineHeight: 1.25,
});

export const defaultSubtitleStyle = (): TextStyle => ({
  fontFamily: "Purno",
  fontSize: 26,
  fontWeight: 600,
  color: "#ffffff",
  alpha: 0.85,
  italic: false,
  align: "left",
  lineHeight: 1.3,
});

export const defaultCreditStyle = (): TextStyle => ({
  fontFamily: "Purno",
  fontSize: 22,
  fontWeight: 500,
  color: "#e7e7ea",
  alpha: 1,
  italic: false,
  align: "left",
  lineHeight: 1.3,
});

export const defaultOverlay = (): OverlaySettings => ({
  enabled: true,
  color: "#000000",
  alpha: 0.35,
  direction: "gradient-bottom",
  coverPct: 35,
});

export const createSlide = (title = ""): SlideData => ({
  id: uid(),
  title,
  imageId: null,
  titleBox: defaultTitleBox(),
  subtitle: { text: "", box: defaultSubtitleBox() },
  credit: { text: "", box: defaultCreditBox() },
  logo: { imageId: null, box: defaultLogoBox() },
});
