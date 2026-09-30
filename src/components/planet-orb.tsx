import { useId } from "react";

import {
  BIOME_LABELS,
  BIOME_PALETTES,
  DEFAULT_MIN_ORB_RATIO,
  MAX_DIAMETER_KM,
  ORB_SIZES,
  RING_THRESHOLD_KM,
} from "@/constants";
import { classifyPlanetBiome } from "@/lib/biome";
import { toNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Planet } from "@/types";

/** The planet fields the orb needs — the full Planet also satisfies this. */
export type OrbPlanet = Pick<
  Planet,
  "name" | "diameter" | "climate" | "terrain"
>;

interface PlanetOrbProps {
  readonly planet: OrbPlanet;
  /** Width and height in px of the square the orb is drawn inside. */
  readonly box?: number;
  /** Draw a dashed circle at full box size, marking the largest known planet. */
  readonly showScaleRef?: boolean;
  /** Smallest fraction of `box` the orb may shrink to. Raise it for small boxes. */
  readonly minRatio?: number;
  readonly className?: string;
}

/**
 * A planet drawn as an SVG sphere.
 *
 * Colour comes from the planet's biome, and size is proportional to its real
 * diameter against the largest known planet. The scale is square-rooted so
 * small worlds stay visible next to a gas giant 16x their size.
 */
export function PlanetOrb({
  planet,
  box = ORB_SIZES.card,
  showScaleRef = false,
  minRatio = DEFAULT_MIN_ORB_RATIO,
  className,
}: PlanetOrbProps) {
  // Unique per instance, because SVG gradient ids must not collide.
  const gradientId = useId().replaceAll(":", "");

  const diameterKm = toNumber(planet.diameter);
  const biome = classifyPlanetBiome(planet);
  const palette = BIOME_PALETTES[biome];

  const ratio =
    diameterKm === null || diameterKm <= 0
      ? minRatio
      : Math.min(1, Math.max(minRatio, Math.sqrt(diameterKm / MAX_DIAMETER_KM)));

  const orbSize = Math.round(box * ratio);
  const hasRing = diameterKm !== null && diameterKm >= RING_THRESHOLD_KM;

  const label =
    diameterKm === null
      ? `${planet.name}, a ${BIOME_LABELS[biome]} world of unknown size`
      : `${planet.name}, a ${BIOME_LABELS[biome]} world ${diameterKm.toLocaleString()} km across`;

  return (
    <div
      className={cn(
        "relative grid shrink-0 place-items-center",
        showScaleRef && "rounded-full border border-dashed border-border",
        className,
      )}
      style={{ width: box, height: box }}
      role="img"
      aria-label={label}
    >
      {diameterKm === null ? (
        <div
          className="grid place-items-center rounded-full border border-dashed border-muted-foreground/60 text-muted-foreground"
          style={{ width: orbSize, height: orbSize, fontSize: orbSize * 0.42 }}
          aria-hidden
        >
          ?
        </div>
      ) : (
        <svg
          width={orbSize}
          height={orbSize}
          viewBox="0 0 100 100"
          className="overflow-visible"
          aria-hidden
        >
          <defs>
            {/* Off-centre highlight is what makes the circle read as a sphere. */}
            <radialGradient id={gradientId} cx="32%" cy="26%" r="82%">
              <stop offset="0%" stopColor={palette.light} />
              <stop offset="48%" stopColor={palette.mid} />
              <stop offset="100%" stopColor={palette.dark} />
            </radialGradient>
          </defs>

          {hasRing && (
            <ellipse
              cx="50"
              cy="50"
              rx="49"
              ry="11"
              fill="none"
              stroke={palette.light}
              strokeOpacity="0.55"
              strokeWidth="3.5"
              transform="rotate(-18 50 50)"
            />
          )}

          <circle cx="50" cy="50" r="40" fill={`url(#${gradientId})`} />

          {/* Thin rim light, so dark planets keep an edge against the card. */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.22"
          />
        </svg>
      )}
    </div>
  );
}
