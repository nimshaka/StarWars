import { useCallback, useEffect, useState } from "react";
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
    } catch {}
  }, [key, value]);

  const set = useCallback((next: T) => setValue(next), []);

  return [value, set];
}
