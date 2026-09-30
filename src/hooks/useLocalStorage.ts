import { useCallback, useEffect, useState } from "react";

/**
 * State that is saved to localStorage.
 *
 * `allowed` lists the only values accepted, so a stale or hand-edited entry
 * cannot put the app into an invalid state. Storage can be unavailable (private
 * browsing, blocked site data), so every access is wrapped — the value then
 * simply does not persist.
 */
export function useLocalStorage<T extends string>(
  key: string,
  initialValue: T,
  allowed: readonly T[],
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return allowed.find((option) => option === stored) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Not persistable — carry on with the in-memory value.
    }
  }, [key, value]);

  const set = useCallback((next: T) => setValue(next), []);

  return [value, set];
}
