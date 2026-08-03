"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import type { BoxTransform } from "./types";

type Corner = "nw" | "ne" | "sw" | "se";
type DragMode = { type: "move" } | { type: "resize"; corner: Corner };

interface EditableBoxProps {
  box: BoxTransform;
  onChange: (box: BoxTransform) => void;
  containerRef: React.RefObject<HTMLElement | null>;
  label: string;
  minWidthPct?: number;
  minHeightPct?: number;
  interactive: boolean;
  /** Persistent selection state (for multi-select alignment), separate from
   *  the momentary "active" state while actually dragging. */
  selected?: boolean;
  onSelect?: (mode: "toggle" | "replace") => void;
  children: React.ReactNode;
  className?: string;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max));

const resizeBox = (
  start: BoxTransform,
  corner: Corner,
  dx: number,
  dy: number,
  minW: number,
  minH: number
): BoxTransform => {
  let x = start.xPct;
  let y = start.yPct;
  let w = start.widthPct;
  let h = start.heightPct;
  const east = corner === "ne" || corner === "se";
  const south = corner === "sw" || corner === "se";

  if (east) {
    w = clamp(start.widthPct + dx, minW, 100 - start.xPct);
  } else {
    const newX = clamp(start.xPct + dx, 0, start.xPct + start.widthPct - minW);
    w = start.widthPct + (start.xPct - newX);
    x = newX;
  }
  if (south) {
    h = clamp(start.heightPct + dy, minH, 100 - start.yPct);
  } else {
    const newY = clamp(start.yPct + dy, 0, start.yPct + start.heightPct - minH);
    h = start.heightPct + (start.yPct - newY);
    y = newY;
  }
  return { xPct: x, yPct: y, widthPct: w, heightPct: h };
};

export const EditableBox = ({
  box,
  onChange,
  containerRef,
  label,
  minWidthPct = 6,
  minHeightPct = 4,
  interactive,
  selected = false,
  onSelect,
  children,
  className,
}: EditableBoxProps) => {
  const [active, setActive] = React.useState(false);

  // The pointer handlers below are created once and never read props/state
  // directly — they always read the latest values from this ref, which is
  // synced in an effect (never during render, so no ref-during-render lint
  // violation and no stale-closure bugs while a drag is in progress).
  const configRef = React.useRef({ box, onChange, minWidthPct, minHeightPct, onSelect });
  React.useEffect(() => {
    configRef.current = { box, onChange, minWidthPct, minHeightPct, onSelect };
  });

  const dragRef = React.useRef<{
    mode: DragMode;
    startX: number;
    startY: number;
    startBox: BoxTransform;
  } | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const handleMove = React.useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current;
      const container = containerRef.current;
      if (!drag || !container) return;
      const { onChange, minWidthPct, minHeightPct } = configRef.current;
      const rect = container.getBoundingClientRect();
      const dx = ((e.clientX - drag.startX) / rect.width) * 100;
      const dy = ((e.clientY - drag.startY) / rect.height) * 100;
      const { startBox } = drag;

      if (drag.mode.type === "move") {
        const x = clamp(startBox.xPct + dx, 0, 100 - startBox.widthPct);
        const y = clamp(startBox.yPct + dy, 0, 100 - startBox.heightPct);
        onChange({ ...startBox, xPct: x, yPct: y });
      } else {
        onChange(resizeBox(startBox, drag.mode.corner, dx, dy, minWidthPct, minHeightPct));
      }
    },
    [containerRef]
  );

  const beginDrag = React.useCallback(
    (e: React.PointerEvent, mode: DragMode, ctrlHeld: boolean) => {
      if (!interactive) return;
      e.stopPropagation();

      // Ctrl/Cmd+click toggles this item in/out of the multi-selection
      // without moving it — matches standard design-tool conventions.
      if (mode.type === "move" && ctrlHeld) {
        e.preventDefault();
        configRef.current.onSelect?.("toggle");
        return;
      }
      configRef.current.onSelect?.("replace");
      e.preventDefault();

      const controller = new AbortController();
      abortRef.current = controller;
      dragRef.current = {
        mode,
        startX: e.clientX,
        startY: e.clientY,
        startBox: configRef.current.box,
      };
      setActive(true);

      window.addEventListener("pointermove", handleMove, { signal: controller.signal });
      window.addEventListener(
        "pointerup",
        () => {
          dragRef.current = null;
          setActive(false);
          controller.abort();
        },
        { signal: controller.signal }
      );
    },
    [interactive, handleMove]
  );

  React.useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handleMoveHandlePointerDown = React.useCallback(
    (e: React.PointerEvent) => beginDrag(e, { type: "move" }, e.ctrlKey || e.metaKey),
    [beginDrag]
  );

  const handleResizeHandlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLSpanElement>) => {
      const corner = e.currentTarget.dataset.corner as Corner;
      beginDrag(e, { type: "resize", corner }, false);
    },
    [beginDrag]
  );

  const corners: Corner[] = ["nw", "ne", "sw", "se"];
  const highlighted = active || selected;

  return (
    <div
      className={cn(
        "group absolute box-border",
        interactive && "cursor-move outline-1 outline-dashed outline-transparent hover:outline-primary/60",
        selected && !active && "outline-2! outline-accent-mint!",
        active && "z-20 outline-2! outline-primary!",
        className
      )}
      style={{
        left: `${box.xPct}%`,
        top: `${box.yPct}%`,
        width: `${box.widthPct}%`,
        height: `${box.heightPct}%`,
        touchAction: "none",
      }}
      onPointerDown={handleMoveHandlePointerDown}
    >
      {interactive && (
        <span
          className={cn(
            "pointer-events-none absolute -top-6 left-0 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-primary-foreground opacity-0 transition-opacity select-none",
            selected ? "bg-accent-mint" : "bg-primary",
            "group-hover:opacity-100",
            highlighted && "opacity-100"
          )}
        >
          {label}
        </span>
      )}
      {children}
      {interactive &&
        corners.map((corner) => (
          <span
            key={corner}
            data-corner={corner}
            onPointerDown={handleResizeHandlePointerDown}
            className={cn(
              "absolute z-10 size-3 rounded-full border-2 bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100",
              selected ? "border-accent-mint" : "border-primary",
              highlighted && "opacity-100",
              corner === "nw" && "-top-1.5 -left-1.5 cursor-nwse-resize",
              corner === "ne" && "-top-1.5 -right-1.5 cursor-nesw-resize",
              corner === "sw" && "-bottom-1.5 -left-1.5 cursor-nesw-resize",
              corner === "se" && "-bottom-1.5 -right-1.5 cursor-nwse-resize"
            )}
          />
        ))}
    </div>
  );
};
