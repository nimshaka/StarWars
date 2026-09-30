import type { SortOrder, Theme, ViewMode } from "@/types";

/** How long the search box waits after the last keystroke before searching. */
export const SEARCH_DEBOUNCE_MS = 350;

/** Every valid sort value, used to validate the `sort` query parameter. */
export const SORT_ORDERS = [
  "default",
  "name-asc",
  "diameter-desc",
  "diameter-asc",
] as const satisfies readonly SortOrder[];

/** Sort dropdown contents, in the order they appear. */
export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "default", label: "Archive order" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "diameter-desc", label: "Largest first" },
  { value: "diameter-asc", label: "Smallest first" },
];

/** Every valid layout, used to validate what is read from localStorage. */
export const VIEW_MODES = ["grid", "table"] as const satisfies readonly ViewMode[];

/** Every valid theme choice. */
export const THEMES = ["light", "dark", "system"] as const satisfies readonly Theme[];

/**
 * Tailwind's `md` breakpoint. Below it the table layout is never used, because
 * a six-column table does not fit on a phone.
 */
export const TABLE_MEDIA_QUERY = "(min-width: 48rem)";

/** Media query used to detect the operating system's colour scheme. */
export const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

/** Numbered page buttons shown either side of the current page. */
export const PAGINATION_SIBLINGS = 1;

/** Below this many pages, every page number is shown without gaps. */
export const PAGINATION_COMPACT_LIMIT = 7;
