export const SWAPI_PLANETS_URL = "https://swapi.dev/api/planets";

export const PAGE_SIZE = 10;

export const STALE_TIME_MS = 5 * 60 * 1000;

export const CACHE_TIME_MS = 10 * 60 * 1000;

export const MAX_RETRIES = 2;

export const ERROR_MESSAGES = {
  notFound: "We could not find that planet.",
  rateLimited: "Too many requests — please wait a moment.",
  server: "The archive is unreachable right now.",
  network: "Network unavailable — check your connection.",
  unknown: "Something went wrong while loading data.",
} as const;
