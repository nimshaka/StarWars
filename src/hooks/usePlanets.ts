import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchPlanet, fetchPlanets, isApiError } from "@/api/planets";
import { MAX_RETRIES } from "@/constants";

function retryUnlessNotFound(failureCount: number, error: Error): boolean {
  if (isApiError(error) && error.status === 404) return false;
  return failureCount < MAX_RETRIES;
}

export function usePlanets(page: number, search: string) {
  return useQuery({
    queryKey: ["planets", { page, search }],
    queryFn: ({ signal }) => fetchPlanets(page, search, signal),

    placeholderData: keepPreviousData,
    retry: retryUnlessNotFound,
  });
}

export function usePlanet(id: string, enabled = true) {
  return useQuery({
    queryKey: ["planet", id],
    queryFn: ({ signal }) => fetchPlanet(id, signal),
    enabled,
    retry: retryUnlessNotFound,
  });
}
