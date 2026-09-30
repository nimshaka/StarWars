/**
 * localStorage keys. Namespaced so they cannot clash with anything else served
 * from the same origin. The theme key is also read by the inline script in
 * index.html, so the two must stay in sync.
 */
export const STORAGE_KEYS = {
  theme: "planet-explorer:theme",
  view: "planet-explorer:view",
} as const;
