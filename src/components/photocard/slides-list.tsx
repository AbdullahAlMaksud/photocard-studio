"use client";

import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { SlideRow } from "./slide-row";
import { usePhotocardStore } from "./store";

export const SlidesList = () => {
  const { t } = useTranslation();
  const slides = usePhotocardStore((s) => s.slides);
  const addSlide = usePhotocardStore((s) => s.addSlide);

  return (
    <div className="flex flex-col items-center gap-8 pb-16">
      <div className="flex w-full flex-col gap-8 max-w-3xl sm:max-w-4xl lg:max-w-5xl">
        {slides.map((slide, index) => (
          <SlideRow key={slide.id} slideId={slide.id} index={index} />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addSlide}
        className="h-11 border-dashed px-8 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all shadow-xs hover:shadow-md"
      >
        <Plus className="size-4" />
        {t("actions.add_slide")}
      </Button>
    </div>
  );
};
