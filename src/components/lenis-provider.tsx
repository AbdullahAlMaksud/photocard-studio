"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  React.useEffect(() => {
    // Completely disable Lenis on /editor route so all panels have 100% native scrolling
    if (pathname === "/editor") {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      prevent: (node) => {
        if (!node) return false;
        const element = node instanceof Element ? node : (node as Node).parentElement;
        return Boolean(element?.closest?.("[data-lenis-prevent]"));
      },
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
};
