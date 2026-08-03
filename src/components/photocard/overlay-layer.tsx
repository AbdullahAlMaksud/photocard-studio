import { hexToRgba } from "./style-utils";
import type { OverlaySettings } from "./types";

interface OverlayLayerProps {
  overlay: OverlaySettings;
}

export const OverlayLayer = ({ overlay }: OverlayLayerProps) => {
  if (!overlay.enabled) return null;

  const color = hexToRgba(overlay.color, overlay.alpha);
  const transparent = hexToRgba(overlay.color, 0);
  const coverPct = Math.min(100, Math.max(5, overlay.coverPct ?? 50));

  if (overlay.direction === "solid-top" || overlay.direction === "solid-bottom") {
    return (
      <div
        className="pointer-events-none absolute inset-x-0"
        style={{
          [overlay.direction === "solid-top" ? "top" : "bottom"]: 0,
          height: `${coverPct}%`,
          background: color,
        }}
      />
    );
  }

  let background = color;
  const startTransparentPct = Math.max(0, 100 - coverPct);

  if (overlay.direction === "gradient-bottom") {
    background = `linear-gradient(to bottom, ${transparent} 0%, ${transparent} ${startTransparentPct}%, ${color} 100%)`;
  } else if (overlay.direction === "gradient-top") {
    background = `linear-gradient(to top, ${transparent} 0%, ${transparent} ${startTransparentPct}%, ${color} 100%)`;
  } else if (overlay.direction === "gradient-both") {
    const edge = Math.min(45, coverPct / 2);
    background = `linear-gradient(to bottom, ${color} 0%, ${transparent} ${edge}%, ${transparent} ${100 - edge}%, ${color} 100%)`;
  } else if (overlay.direction === "vignette") {
    background = `radial-gradient(ellipse at center, ${transparent} ${startTransparentPct}%, ${color} 100%)`;
  } else if (overlay.direction === "flat") {
    background = color;
  }

  return <div className="pointer-events-none absolute inset-0" style={{ background }} />;
};
