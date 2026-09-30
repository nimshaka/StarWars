import { useEffect, useState } from "react";

import { SEARCH_DEBOUNCE_MS } from "@/constants";

/**
 * Returns `value` only once it has stopped changing for `delay` milliseconds.
 * Used so we do not fire a request on every keystroke.
 */
export function useDebounce<T>(value: T, delay = SEARCH_DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
