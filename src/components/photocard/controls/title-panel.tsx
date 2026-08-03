"use client";

import { defaultTitleStyle } from "../defaults";
import { usePhotocardStore } from "../store";
import { TextStyleFields } from "./text-style-fields";

export const TitlePanel = () => {
  const style = usePhotocardStore((s) => s.titleStyle);
  const update = usePhotocardStore((s) => s.updateTitleStyle);
  const fonts = usePhotocardStore((s) => s.fonts);

  return (
    <TextStyleFields idPrefix="title" style={style} defaultStyle={defaultTitleStyle()} fonts={fonts} onChange={update} />
  );
};
