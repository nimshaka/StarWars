/** How the list is sorted. Applied to the current page only (see lib/planets). */
export type SortOrder =
  | "default"
  | "name-asc"
  | "diameter-desc"
  | "diameter-asc";

/** How the planet list is laid out on wide screens. */
export type ViewMode = "grid" | "table";

/** Colour scheme preference. "system" follows the operating system. */
export type Theme = "light" | "dark" | "system";

/** The kind of world a planet is, used to colour its orb and pick its icon. */
export type Biome =
  | "gas"
  | "ice"
  | "volcanic"
  | "urban"
  | "desert"
  | "ocean"
  | "swamp"
  | "forest"
  | "rock";

/** The three colours that make up a planet orb's gradient. */
export interface BiomePalette {
  /** Lit side of the sphere. */
  light: string;
  /** Main body colour. */
  mid: string;
  /** Shadowed side. */
  dark: string;
}
