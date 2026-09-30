import { PAGE_SIZE, SORT_ORDERS } from "@/constants";
import { toNumber } from "@/lib/format";
import type { Planet, SortOrder } from "@/types";

/** Reads the `sort` query parameter, falling back to "default" if invalid. */
export function parseSortOrder(value: string | null): SortOrder {
  return SORT_ORDERS.find((order) => order === value) ?? "default";
}

/** Reads the `page` query parameter, falling back to page 1 if invalid. */
export function parsePageParam(value: string | null): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return parsed > 0 ? parsed : 1;
}

/**
 * Sorts one page of planets.
 *
 * SWAPI paginates on the server and has no sort parameter, so this can only
 * reorder the ten planets currently on screen — the UI says so when a sort is
 * active. Planets with an unknown diameter always sink to the bottom.
 */
export function sortPlanets(planets: Planet[], order: SortOrder): Planet[] {
  if (order === "default") return planets;

  const sorted = [...planets];

  if (order === "name-asc") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted.sort((a, b) => {
    const left = toNumber(a.diameter);
    const right = toNumber(b.diameter);

    if (left === null) return right === null ? 0 : 1;
    if (right === null) return -1;

    return order === "diameter-asc" ? left - right : right - left;
  });
}

/** Total number of pages for a result count. */
export function getTotalPages(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

/** Builds the "Showing 1–10 of 60" label above the list. */
export function describeRange(
  page: number,
  shown: number,
  total: number,
): string {
  if (total === 0) return "No planets";

  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(total, start + shown - 1);

  return `Showing ${start.toLocaleString()}–${end.toLocaleString()} of ${total.toLocaleString()}`;
}
