import { BIOME_KEYWORDS, FALLBACK_BIOME } from "@/constants";
import { toTags } from "@/lib/format";
import type { Biome, Planet } from "@/types";

/** The biomes in the order they are checked — most specific first. */
const BIOME_ORDER = Object.keys(BIOME_KEYWORDS) as Biome[];

/** The first biome with a keyword appearing in `text`, or null if none match. */
function matchBiome(text: string): Biome | null {
  const haystack = text.toLowerCase();

  for (const biome of BIOME_ORDER) {
    const keywords = BIOME_KEYWORDS[biome];
    if (keywords.some((keyword) => haystack.includes(keyword))) return biome;
  }

  return null;
}

/**
 * Works out what kind of world a planet is, which decides its orb colour and
 * terrain icons.
 *
 * SWAPI lists the dominant terrain first, so that is checked before the whole
 * string: Endor is "forests, mountains, lakes" and should read as forest, not
 * water. Terrain is checked before climate because it is the more specific
 * field.
 */
export function classifyPlanetBiome(
  planet: Pick<Planet, "climate" | "terrain">,
): Biome {
  const [primaryTerrain = ""] = toTags(planet.terrain);
  const [primaryClimate = ""] = toTags(planet.climate);

  const candidates = [
    primaryTerrain,
    planet.terrain,
    primaryClimate,
    planet.climate,
  ];

  for (const candidate of candidates) {
    const biome = matchBiome(candidate);
    if (biome) return biome;
  }

  return FALLBACK_BIOME;
}

/** Biome for a single terrain tag, e.g. "ice caves" -> "ice". */
export function classifyTerrain(terrain: string): Biome {
  return matchBiome(terrain) ?? FALLBACK_BIOME;
}
