import { UNKNOWN_VALUES } from "@/constants";

/** True when SWAPI gave us "unknown", "n/a" or nothing at all. */
function isUnknown(value: string): boolean {
  return UNKNOWN_VALUES.includes(value.trim().toLowerCase());
}

/**
 * Parse a SWAPI numeric string. Returns null for unknown values and anything
 * that is not a number, so callers can render "Unknown" instead of NaN.
 */
export function toNumber(value: string | undefined | null): number | null {
  if (value == null || isUnknown(value)) return null;

  const parsed = Number(value.replaceAll(",", "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

/** Full number with thousands separators, e.g. "10,465". */
export function formatNumber(value: string): string {
  const parsed = toNumber(value);
  return parsed === null ? "Unknown" : parsed.toLocaleString();
}

/** Short number for tight spaces, e.g. "1.2M". */
export function formatCompact(value: string): string {
  const parsed = toNumber(value);
  if (parsed === null) return "Unknown";

  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(parsed);
}

/** Free text with "unknown"/"n/a" normalised to "Unknown". */
export function formatText(value: string): string {
  return isUnknown(value) ? "Unknown" : value;
}

/** A number with its unit, e.g. "10,465 km". Percentages omit the space. */
export function withUnit(value: string, unit: string): string {
  const parsed = toNumber(value);
  if (parsed === null) return "Unknown";

  const separator = unit === "%" ? "" : " ";
  return `${parsed.toLocaleString()}${separator}${unit}`;
}

/** Upper-cases the first letter, e.g. "temperate" -> "Temperate". */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Splits a comma-separated field into tags: "desert, hills" -> two entries. */
export function toTags(value: string): string[] {
  if (isUnknown(value)) return [];

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Pulls the id out of a SWAPI url: ".../planets/3/" -> "3". */
export function getPlanetId(url: string): string {
  // The url ends with a slash, so take the last non-empty segment.
  return url.split("/").findLast(Boolean) ?? "";
}
