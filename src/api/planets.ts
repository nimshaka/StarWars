import { ERROR_MESSAGES, SWAPI_PLANETS_URL } from "@/constants";
import type { Planet, PlanetsResponse } from "@/types";

/** An HTTP failure that carries the status, so callers can spot a 404. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** The message from an ApiError, or `fallback` for anything else. */
export function describeError(error: unknown, fallback: string): string {
  return isApiError(error) ? error.message : fallback;
}

function messageForStatus(status: number): string {
  if (status === 404) return ERROR_MESSAGES.notFound;
  if (status === 429) return ERROR_MESSAGES.rateLimited;
  if (status >= 500) return ERROR_MESSAGES.server;
  return ERROR_MESSAGES.unknown;
}

/** Fetches JSON and turns any failure into an ApiError. */
async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, { signal });
  } catch (error) {
    // Let aborts through untouched so React Query sees a cancellation.
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(ERROR_MESSAGES.network, 0);
  }

  if (!response.ok) {
    throw new ApiError(messageForStatus(response.status), response.status);
  }

  return (await response.json()) as T;
}

/** One page of planets, optionally filtered by a search term. */
export function fetchPlanets(
  page: number,
  search: string,
  signal?: AbortSignal,
): Promise<PlanetsResponse> {
  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);

  return request<PlanetsResponse>(`${SWAPI_PLANETS_URL}/?${params}`, signal);
}

/** A single planet by its numeric id. */
export function fetchPlanet(id: string, signal?: AbortSignal): Promise<Planet> {
  return request<Planet>(`${SWAPI_PLANETS_URL}/${id}/`, signal);
}
