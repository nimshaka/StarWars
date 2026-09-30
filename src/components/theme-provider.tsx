import { useCallback, useEffect, useMemo, useState } from "react";

import { DARK_MEDIA_QUERY, STORAGE_KEYS } from "@/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { readStoredTheme, ThemeContext } from "@/lib/theme";
import type { Theme } from "@/types";

export function ThemeProvider({ children }: { readonly children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const systemPrefersDark = useMediaQuery(DARK_MEDIA_QUERY);

  // Derived during render, so "system" follows the OS with no extra state.
  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  // Paint the resolved theme onto <html> — the one genuinely external system.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, next);
    } catch {
      // Private browsing or blocked storage — the choice just won't persist.
    }
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
