"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CardCraftCanvas } from "./cardcraft-canvas";
import { LeftNavSidebar } from "./left-nav-sidebar";
import { RightInspector } from "./right-inspector";
import { StudioHeader } from "./studio-header";

export const PhotocardStudio = () => {
  const [isRightSheetOpen, setIsRightSheetOpen] = React.useState(false);

  return (
    <div data-lenis-prevent className="flex h-full h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-background">
      {/* Top Compact Header */}
      <StudioHeader
        onOpenRightInspector={() => setIsRightSheetOpen(true)}
      />

      {/* Main Studio 3-Column Workspace */}
      <div className="flex flex-1 overflow-hidden relative min-h-0">
        {/* Desktop Left Navigation Sidebar */}
        <div className="hidden md:flex h-full shrink-0 min-h-0">
          <LeftNavSidebar />
        </div>

        {/* Center Canvas & Slide Filmstrip Workspace */}
        <main className="canvas-surface relative flex h-full flex-1 flex-col overflow-hidden min-h-0">
          <CardCraftCanvas />
        </main>

        {/* Desktop Right Design & Layers Inspector Panel */}
        <div className="hidden lg:flex h-full shrink-0 min-h-0">
          <RightInspector />
        </div>
      </div>

      {/* Mobile / Tablet Right Side Drawer (Shadcn Sheet) */}
      <Sheet open={isRightSheetOpen} onOpenChange={setIsRightSheetOpen}>
        <SheetContent side="right" hideDefaultClose className="w-full sm:max-w-md p-0 border-l border-border h-full max-h-[100dvh] flex flex-col">
          <SheetHeader className="sr-only">
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Mobile settings side drawer</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto thin-scrollbar">
            <RightInspector onClose={() => setIsRightSheetOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
