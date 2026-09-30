/**
 * A planet exactly as SWAPI returns it.
 * Note: every numeric field arrives as a string, and missing values come
 * through as the literal text "unknown".
 */
export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
}

/** One page of planets. SWAPI always returns 10 results per page. */
export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}
