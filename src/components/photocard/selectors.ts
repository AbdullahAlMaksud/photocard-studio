import type { SlideData, UploadedImage } from "./types";

export const getEffectiveImage = (
  slide: SlideData,
  images: UploadedImage[]
): UploadedImage | null => {
  if (slide.imageId) {
    const found = images.find((i) => i.id === slide.imageId);
    if (found) return found;
  }
  return images[0] ?? null;
};

/** Resolves a per-slide field (subtitle / credit / logo) to either its own
 *  value or the shared global one, depending on the "same for all" toggle. */
export const getEffectiveField = <T>(perSlide: T, useSameForAll: boolean, global: T): T =>
  useSameForAll ? global : perSlide;
