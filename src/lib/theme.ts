import { createContext, useContext } from "react";

import { STORAGE_KEYS, THEMES } from "@/constants";
import type { Theme } from "@/types";

interface ThemeContextValue {
  /** What the user picked, which may be "system". */
  theme: Theme;
  /** What is actually on screen once "system" is resolved. */
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a <ThemeProvider>.");
  }

  return context;
}

/** Reads the saved theme, tolerating a blocked or empty localStorage. */
export function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    return THEMES.find((theme) => theme === stored) ?? "system";
  } catch {
    return "system";
  }
}
