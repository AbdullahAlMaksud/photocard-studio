import { uid } from "./defaults";
import type { UploadedFont } from "./types";

const deriveFamilyName = (fileName: string) => {
  const base = fileName.replace(/\.[^.]+$/, "");
  const clean = base.replace(/[^a-zA-Z0-9\u0980-\u09FF ]/g, " ").trim() || "font";
  return `Custom-${clean.replace(/\s+/g, "-")}-${Math.random().toString(36).slice(2, 6)}`;
};

export const registerFontFile = async (file: File): Promise<UploadedFont> => {
  const buffer = await file.arrayBuffer();
  const family = deriveFamilyName(file.name);
  const face = new FontFace(family, buffer);
  await face.load();
  (document.fonts as FontFaceSet).add(face);
  return {
    id: uid(),
    label: file.name.replace(/\.[^.]+$/, ""),
    family,
    fileName: file.name,
  };
};
