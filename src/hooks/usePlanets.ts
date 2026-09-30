import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchPlanet, fetchPlanets, isApiError } from "@/api/planets";
import { MAX_RETRIES } from "@/constants";

/** Retry failures, except a 404 — that page or planet will never exist. */
function retryUnlessNotFound(failureCount: number, error: Error): boolean {
  if (isApiError(error) && error.status === 404) return false;
  return failureCount < MAX_RETRIES;
}

/** One page of planets, filtered by `search`. */
export function usePlanets(page: number, search: string) {
  return useQuery({
    queryKey: ["planets", { page, search }],
    queryFn: ({ signal }) => fetchPlanets(page, search, signal),
    // Keep the previous page on screen while the next one loads.
    placeholderData: keepPreviousData,
    retry: retryUnlessNotFound,
  });
}

/** A single planet. Pass `enabled: false` to skip an obviously invalid id. */
export function usePlanet(id: string, enabled = true) {
  return useQuery({
    queryKey: ["planet", id],
    queryFn: ({ signal }) => fetchPlanet(id, signal),
    enabled,
    retry: retryUnlessNotFound,
  });
}
