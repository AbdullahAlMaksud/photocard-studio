"use client";

import dynamic from "next/dynamic";

const PhotocardStudio = dynamic(
  () => import("@/components/photocard/photocard-studio").then((mod) => mod.PhotocardStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-background text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs font-semibold">স্টুডিও লোড হচ্ছে...</span>
        </div>
      </div>
    ),
  }
);

export default function EditorPage() {
  return <PhotocardStudio />;
}
