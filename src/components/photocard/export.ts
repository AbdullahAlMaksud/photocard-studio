import { toPng } from "html-to-image";
import JSZip from "jszip";

import { usePhotocardStore } from "./store";
import { getExportSize } from "./style-utils";
import type { RatioKey, SlideData } from "./types";

export interface ExportResult {
  ok: boolean;
  failedLabels: string[];
}

/** Elements that should never appear in an exported PNG even if they were
 *  visible at capture time (e.g. the multi-select alignment toolbar). */
const exportFilter = (domNode: HTMLElement) => domNode.dataset?.exportIgnore !== "true";

/** Captures the already-mounted, currently-visible slide canvas nodes
 *  (queried by their data-slide-canvas attribute) at a higher pixel
 *  ratio so the exported PNGs match the editor 1:1 but at full
 *  resolution, then bundles them into a single zip download. */
export const exportAllSlides = async (slides: SlideData[], ratio: RatioKey): Promise<ExportResult> => {
  if (typeof document === "undefined") return { ok: false, failedLabels: [] };

  await document.fonts.ready;
  const store = usePhotocardStore.getState();
  const initialActiveId = store.activeSlideId;

  const { width } = getExportSize(ratio);
  const zip = new JSZip();
  const failedLabels: string[] = [];

  try {
    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      const label = `স্লাইড ${i + 1}`;

      // Temporarily activate slide if not mounted in DOM
      if (store.activeSlideId !== slide.id) {
        store.setActiveSlideId(slide.id);
        await new Promise((r) => setTimeout(r, 150));
      }

      const node = document.querySelector<HTMLElement>(`[data-slide-canvas="${slide.id}"]`);

      if (!node || node.clientWidth === 0) {
        failedLabels.push(label);
        continue;
      }

      const pixelRatio = width / node.clientWidth;
      const dataUrl = await toPng(node, { pixelRatio, cacheBust: true, filter: exportFilter });
      const base64 = dataUrl.split(",")[1];
      zip.file(`photocard-${String(i + 1).padStart(2, "0")}.png`, base64, { base64: true });

      // If only 1 slide, trigger immediate single PNG download (mobile friendly)
      if (slides.length === 1) {
        const link = document.createElement("a");
        link.download = `photocard-01.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return { ok: true, failedLabels: [] };
      }
    }
  } catch (err) {
    console.error("Export error:", err);
  } finally {
    if (initialActiveId && store.activeSlideId !== initialActiveId) {
      store.setActiveSlideId(initialActiveId);
    }
  }

  const fileCount = Object.keys(zip.files).length;
  if (fileCount > 0) {
    const blob = await zip.generateAsync({ type: "blob" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "photocards.zip";
    link.href = blobUrl;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  }

  return { ok: failedLabels.length === 0 && fileCount > 0, failedLabels };
};
