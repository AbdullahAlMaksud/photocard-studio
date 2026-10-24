"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

const emptySubscribe = () => () => {};

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
