"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { GridBackground } from "@/components/ui/grid-background";
import { usePhotocardStore } from "@/components/photocard/store";
import { LandingHeader } from "@/components/photocard/views/landing-header";
import { MyWorkPage } from "@/components/photocard/views/my-work-page";

export default function MyWorkRoute() {
  const router = useRouter();
  const createNewProject = usePhotocardStore((s) => s.createNewProject);

  const handleNewProject = () => {
    createNewProject();
    router.push("/editor");
  };

  return (
    <GridBackground>
      <LandingHeader />
      <MyWorkPage
        onOpenProject={() => router.push("/editor")}
        onNewProject={handleNewProject}
      />
    </GridBackground>
  );
}
