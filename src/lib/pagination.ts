import { PAGINATION_COMPACT_LIMIT, PAGINATION_SIBLINGS } from "@/constants";

/** A numbered page button, or a "…" gap standing in for skipped pages. */
export type PageItem = number | "gap-left" | "gap-right";

/**
 * Builds the page buttons: first page, last page, the current page and its
 * immediate neighbours, with gaps for everything left out.
 *
 * Page 5 of 20 gives: 1 … 4 5 6 … 20
 */
export function buildPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= PAGINATION_COMPACT_LIMIT) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, page - PAGINATION_SIBLINGS);
  const end = Math.min(totalPages - 1, page + PAGINATION_SIBLINGS);

  if (start > 2) items.push("gap-left");
  for (let current = start; current <= end; current += 1) items.push(current);
  if (end < totalPages - 1) items.push("gap-right");

  items.push(totalPages);
  return items;
}
