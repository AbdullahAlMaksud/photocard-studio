import { cn } from "@/lib/utils";

import { textStyleToCss } from "./style-utils";
import type { TextStyle } from "./types";

interface TextLayerProps {
  text: string;
  style: TextStyle;
  placeholder?: string;
}

export const TextLayer = ({ text, style, placeholder }: TextLayerProps) => {
  const hasText = text.trim().length > 0;
  return (
    <p
      className={cn("m-0 h-full w-full overflow-hidden", !hasText && "opacity-40")}
      style={textStyleToCss(style)}
    >
      {hasText ? text : placeholder}
    </p>
  );
};
