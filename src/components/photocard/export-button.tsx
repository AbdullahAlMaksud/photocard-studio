"use client";

import * as React from "react";
import { AlertTriangle, Download, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { exportAllSlides } from "./export";
import { usePhotocardStore } from "./store";

const waitForPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

export const ExportButton = () => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<"idle" | "working" | "error">("idle");
  const [failedLabels, setFailedLabels] = React.useState<string[]>([]);
  const slides = usePhotocardStore((s) => s.slides);
  const ratio = usePhotocardStore((s) => s.ratio);
  const requestClearSelections = usePhotocardStore((s) => s.requestClearSelections);

  const handleExport = async () => {
    setStatus("working");
    setFailedLabels([]);
    requestClearSelections();
    await waitForPaint();
    const result = await exportAllSlides(slides, ratio);
    if (result.ok) {
      setStatus("idle");
    } else {
      setStatus("error");
      setFailedLabels(result.failedLabels);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {status === "error" && (
        <span className="hidden items-center gap-1 text-xs text-destructive sm:flex">
          <AlertTriangle className="size-3.5" />
          {failedLabels.length > 0 ? `${failedLabels.join(", ")} export failed` : "Export failed"}
        </span>
      )}
      <Button type="button" onClick={handleExport} disabled={status === "working"}>
        {status === "working" ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
        {status === "working" ? t("actions.exporting") : t("actions.export_zip")}
      </Button>
    </div>
  );
};
