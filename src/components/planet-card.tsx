import { Link } from "react-router-dom";
import { LuArrowRight, LuRuler, LuUsers } from "react-icons/lu";

import { PlanetOrb } from "@/components/planet-orb";
import { Stat } from "@/components/stat";
import { TerrainBadge } from "@/components/terrain-badge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ORB_SIZES } from "@/constants";
import {
  capitalize,
  formatCompact,
  formatText,
  getPlanetId,
  toTags,
  withUnit,
} from "@/lib/format";
import type { Planet } from "@/types";

const MAX_VISIBLE_TAGS = 2;

export function PlanetCard({ planet }: { planet: Planet }) {
  const terrainTags = toTags(planet.terrain);
  const visibleTags = terrainTags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = terrainTags.length - visibleTags.length;

  return (
    <Link
      to={`/planets/${getPlanetId(planet.url)}`}
      className="group rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      aria-label={`View details for ${planet.name}`}
    >
      <Card className="h-full gap-4 py-5 transition-[border-color,box-shadow,transform] group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-lg">
        <div className="flex items-center gap-4 px-5">
          <PlanetOrb planet={planet} box={ORB_SIZES.card} showScaleRef />
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold tracking-tight transition-colors group-hover:text-primary">
              {planet.name}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              {capitalize(formatText(planet.climate))}
            </p>
          </div>
          <LuArrowRight
            className="size-4 shrink-0 text-muted-foreground opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-2 gap-4 px-5">
          <Stat
            icon={LuRuler}
            label="Diameter"
            value={withUnit(planet.diameter, "km")}
          />
          <Stat
            icon={LuUsers}
            label="Population"
            value={formatCompact(planet.population)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 px-5">
          {visibleTags.length > 0 ? (
            <>
              {visibleTags.map((tag) => (
                <TerrainBadge key={tag} terrain={tag} />
              ))}
              {hiddenCount > 0 && (
                <Badge variant="muted">+{hiddenCount} more</Badge>
              )}
            </>
          ) : (
            <Badge variant="muted">Terrain unknown</Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}
