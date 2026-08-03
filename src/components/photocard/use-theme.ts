"use client";

import * as React from "react";

import type { ThemeMode } from "./types";

const STORAGE_KEY = "photocard-studio-theme";
const CHANGE_EVENT = "photocard-theme-change";

const applyTheme = (mode: ThemeMode) => {
  document.documentElement.dataset.theme = mode;
};

const getSnapshot = (): ThemeMode => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const getServerSnapshot = (): ThemeMode => "dark";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
};

export const useTheme = () => {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = React.useCallback((mode: ThemeMode) => {
    window.localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
};
