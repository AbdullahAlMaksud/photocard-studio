"use client";

import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarContent } from "@/components/ui/sidebar";

import { CreditPanel } from "./credit-panel";
import { FontUploadPanel } from "./font-upload-panel";
import { ImageUploadPanel } from "./image-upload-panel";
import { LogoPanel } from "./logo-panel";
import { OverlayPanel } from "./overlay-panel";
import { RatioPanel } from "./ratio-panel";
import { SubtitlePanel } from "./subtitle-panel";
import { TitlePanel } from "./title-panel";

export const ControlSidebar = () => {
  const { t } = useTranslation();

  return (
    <SidebarContent className="p-4 group-data-[collapsible=icon]:p-2">
      <div className="flex flex-col gap-1 pb-10 group-data-[collapsible=icon]:hidden">
        <Accordion type="multiple" defaultValue={["upload", "ratio", "title"]}>
          <AccordionItem value="upload">
            <AccordionTrigger>{t("sidebar.upload")}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5">
              <ImageUploadPanel />
              <FontUploadPanel />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ratio">
            <AccordionTrigger>{t("sidebar.ratio")}</AccordionTrigger>
            <AccordionContent>
              <RatioPanel />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="subtitle">
            <AccordionTrigger>{t("sidebar.subtitle")}</AccordionTrigger>
            <AccordionContent>
              <SubtitlePanel />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="title">
            <AccordionTrigger>{t("sidebar.title")}</AccordionTrigger>
            <AccordionContent>
              <TitlePanel />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="credit">
            <AccordionTrigger>{t("sidebar.credit")}</AccordionTrigger>
            <AccordionContent>
              <CreditPanel />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="overlay">
            <AccordionTrigger>{t("sidebar.overlay")}</AccordionTrigger>
            <AccordionContent>
              <OverlayPanel />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="logo">
            <AccordionTrigger>{t("sidebar.logo")}</AccordionTrigger>
            <AccordionContent>
              <LogoPanel />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </SidebarContent>
  );
};
