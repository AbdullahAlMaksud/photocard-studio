import type { BoxTransform } from "./types";

export type AlignOp = "left" | "center-h" | "right" | "top" | "middle-v" | "bottom";

/** Repositions a box relative to the artboard (0–100% canvas) for the given
 *  alignment operation. Size is untouched — only x/y move. */
export const applyAlign = (box: BoxTransform, op: AlignOp): BoxTransform => {
  switch (op) {
    case "left":
      return { ...box, xPct: 0 };
    case "center-h":
      return { ...box, xPct: (100 - box.widthPct) / 2 };
    case "right":
      return { ...box, xPct: 100 - box.widthPct };
    case "top":
      return { ...box, yPct: 0 };
    case "middle-v":
      return { ...box, yPct: (100 - box.heightPct) / 2 };
    case "bottom":
      return { ...box, yPct: 100 - box.heightPct };
    default:
      return box;
  }
};
