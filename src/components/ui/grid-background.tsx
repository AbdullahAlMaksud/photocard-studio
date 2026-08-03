"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const GridBackground = ({ children, className }: GridBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full bg-background text-foreground overflow-x-hidden",
        className
      )}
    >
      {/* 21st.dev SVG Grid Pattern background */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-40 dark:opacity-25">
        <svg
          className="h-full w-full stroke-muted-foreground/25 [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_90%)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-pattern-21st"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="-1"
              y="-1"
            >
              <path d="M.5 32V.5H32" fill="none" strokeDasharray="0" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern-21st)" />
        </svg>
      </div>

      {/* Radial Glow Ambient Highlight */}
      <div className="pointer-events-none fixed -top-40 left-1/2 z-0 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};
