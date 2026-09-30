import type { Biome, BiomePalette } from "@/types";

/** Values SWAPI uses in place of a real measurement. */
export const UNKNOWN_VALUES = ["unknown", "n/a", "none", ""];

/** Largest diameter in the archive (Bespin, ~118,000 km) — the scale ceiling. */
export const MAX_DIAMETER_KM = 118_000;

/** Planets over this diameter are drawn with a gas-giant ring. */
export const RING_THRESHOLD_KM = 50_000;

/** Smallest fraction of its box an orb may shrink to, so it stays visible. */
export const DEFAULT_MIN_ORB_RATIO = 0.4;

/** Orb box sizes in px, per place the orb appears. */
export const ORB_SIZES = {
  table: 40,
  card: 64,
  details: 144,
} as const;

/**
 * Keywords that identify each biome, checked in this order — the first biome
 * with a matching keyword wins, so the more specific ones come first.
 * Matching is a plain lowercase substring test, so "ice" also finds "ice caves".
 */
export const BIOME_KEYWORDS: Record<Biome, string[]> = {
  gas: ["gas", "nebula"],
  ice: [
    "frozen",
    "frigid",
    "ice",
    "tundra",
    "snow",
    "glacier",
    "arctic",
    "artic",
    "polar",
  ],
  volcanic: ["volcan", "lava", "molten", "magma", "burning", "ash"],
  urban: [
    "cityscape",
    "cities",
    "city",
    "urban",
    "artificial",
    "megalop",
    "polluted",
  ],
  desert: [
    "arid",
    "desert",
    "sand",
    "dune",
    "scorch",
    "savanna",
    "scrubland",
    "barren",
    "mesa",
    "hot",
    "superheated",
  ],
  // "seas" not "sea", so Haruun Kal's "toxic cloudsea" is not read as water.
  ocean: ["ocean", "seas", "water", "lake", "reef", "island", "coast"],
  swamp: ["swamp", "bog", "murky", "marsh", "fen", "mud"],
  forest: [
    "forest",
    "jungle",
    "grass",
    "plain",
    "field",
    "tropical",
    "temperate",
    "verdant",
    "wood",
    "fung",
    "vine",
    "humid",
    "moist",
    "lush",
  ],
  rock: [
    "rock",
    "mountain",
    "cave",
    "cliff",
    "crater",
    "hill",
    "plateau",
    "valley",
    "canyon",
    "airless",
    "asteroid",
  ],
};

/** Gradient colours for each biome's orb. */
export const BIOME_PALETTES: Record<Biome, BiomePalette> = {
  gas: { light: "#f5d0fe", mid: "#c084fc", dark: "#3b0764" },
  ice: { light: "#f0f9ff", mid: "#7dd3fc", dark: "#164e63" },
  volcanic: { light: "#fed7aa", mid: "#ef4444", dark: "#450a0a" },
  urban: { light: "#e0e7ff", mid: "#818cf8", dark: "#1e1b4b" },
  desert: { light: "#fef3c7", mid: "#f59e0b", dark: "#78350f" },
  ocean: { light: "#bae6fd", mid: "#0ea5e9", dark: "#0c2e5e" },
  swamp: { light: "#d9f99d", mid: "#4d7c0f", dark: "#1a2e05" },
  forest: { light: "#bbf7d0", mid: "#22c55e", dark: "#052e16" },
  rock: { light: "#e7e5e4", mid: "#a8a29e", dark: "#292524" },
};

/** Plain-English biome name, used in the orb's screen-reader description. */
export const BIOME_LABELS: Record<Biome, string> = {
  gas: "gas giant",
  ice: "frozen",
  volcanic: "volcanic",
  urban: "urbanised",
  desert: "desert",
  ocean: "oceanic",
  swamp: "wetland",
  forest: "forested",
  rock: "rocky",
};

/** Biome used when a planet's terrain and climate are both unknown. */
export const FALLBACK_BIOME: Biome = "rock";
