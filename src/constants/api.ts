/** Where the planet data comes from. */
export const SWAPI_PLANETS_URL = "https://swapi.dev/api/planets";

/** SWAPI serves a fixed 10 results per page — it is not configurable. */
export const PAGE_SIZE = 10;

/** How long React Query treats cached data as fresh (5 minutes). */
export const STALE_TIME_MS = 5 * 60 * 1000;

/** How long unused data stays in the cache (10 minutes). */
export const CACHE_TIME_MS = 10 * 60 * 1000;

/** Retries for a failed request. A 404 is never retried. */
export const MAX_RETRIES = 2;

/** Messages shown for each HTTP failure. */
export const ERROR_MESSAGES = {
  notFound: "We could not find that planet.",
  rateLimited: "Too many requests — please wait a moment.",
  server: "The archive is unreachable right now.",
  network: "Network unavailable — check your connection.",
  unknown: "Something went wrong while loading data.",
} as const;
