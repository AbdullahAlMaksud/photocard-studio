"use client";

import {
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  X,
} from "lucide-react";

import type { AlignOp } from "./alignment";

interface AlignToolbarProps {
  count: number;
  onAlign: (op: AlignOp) => void;
  onClear: () => void;
}

const OPS: { op: AlignOp; icon: typeof AlignHorizontalJustifyStart; title: string }[] = [
  { op: "left", icon: AlignHorizontalJustifyStart, title: "বামে অ্যালাইন" },
  { op: "center-h", icon: AlignHorizontalJustifyCenter, title: "আনুভূমিকভাবে মাঝে" },
  { op: "right", icon: AlignHorizontalJustifyEnd, title: "ডানে অ্যালাইন" },
  { op: "top", icon: AlignVerticalJustifyStart, title: "উপরে অ্যালাইন" },
  { op: "middle-v", icon: AlignVerticalJustifyCenter, title: "উলম্বভাবে মাঝে" },
  { op: "bottom", icon: AlignVerticalJustifyEnd, title: "নিচে অ্যালাইন" },
];

export const AlignToolbar = ({ count, onAlign, onClear }: AlignToolbarProps) => {
  return (
    <div
      data-export-ignore="true"
      className="absolute top-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-border bg-popover/95 p-1 shadow-lg backdrop-blur"
    >
      <span className="px-1.5 text-[10px] font-medium text-muted-foreground">{count}টি সিলেক্টেড</span>
      <div className="mx-0.5 h-4 w-px bg-border" />
      {OPS.map(({ op, icon: Icon, title }) => (
        <button
          key={op}
          type="button"
          title={title}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onAlign(op)}
          className="flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Icon className="size-3.5" />
        </button>
      ))}
      <div className="mx-0.5 h-4 w-px bg-border" />
      <button
        type="button"
        title="সিলেকশন বাতিল"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onClear}
        className="flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
};
