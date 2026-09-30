import { useCallback, useSyncExternalStore } from "react";

/**
 * Tells you whether a CSS media query currently matches, and re-renders when
 * that changes. Used to pick the layout, so only one layout is ever in the DOM.
 */
export function useMediaQuery(query: string): boolean {
  // Re-run whenever the browser reports the query started or stopped matching.
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // The third argument is the value to use when there is no browser at all.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
