"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { GridBackground } from "@/components/ui/grid-background";
import { usePhotocardStore } from "@/components/photocard/store";
import type { PresetTemplate } from "@/components/photocard/templates/preset-templates";
import { LandingHeader } from "@/components/photocard/views/landing-header";
import { TemplatesPage } from "@/components/photocard/views/templates-page";

export default function TemplatesRoute() {
  const router = useRouter();
  const applyPresetTemplate = usePhotocardStore((s) => s.applyPresetTemplate);

  const handleSelectTemplate = (template: PresetTemplate) => {
    applyPresetTemplate(template);
    router.push("/editor");
  };

  return (
    <GridBackground>
      <LandingHeader />
      <TemplatesPage onSelectTemplate={handleSelectTemplate} />
    </GridBackground>
  );
}
