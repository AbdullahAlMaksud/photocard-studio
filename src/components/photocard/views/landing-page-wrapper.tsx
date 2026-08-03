"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { usePhotocardStore } from "../store";
import type { PresetTemplate } from "../templates/preset-templates";
import { LandingPage } from "./landing-page";

export const LandingPageWrapper = () => {
  const router = useRouter();
  const applyPresetTemplate = usePhotocardStore((s) => s.applyPresetTemplate);
  const createNewProject = usePhotocardStore((s) => s.createNewProject);

  const handleSelectTemplate = (template: PresetTemplate) => {
    applyPresetTemplate(template);
    router.push("/editor");
  };

  const handleStartEditor = () => {
    createNewProject();
    router.push("/editor");
  };

  return (
    <LandingPage
      onStartEditor={handleStartEditor}
      onSelectTemplate={handleSelectTemplate}
      onGoToMyWork={() => router.push("/my-work")}
    />
  );
};
