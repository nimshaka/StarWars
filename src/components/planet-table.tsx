import { Link } from "react-router-dom";

import { PlanetOrb } from "@/components/planet-orb";
import { TerrainBadge } from "@/components/terrain-badge";
import { Badge } from "@/components/ui/badge";
import { ORB_SIZES } from "@/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  capitalize,
  formatNumber,
  formatText,
  getPlanetId,
  toTags,
} from "@/lib/format";
import type { Planet } from "@/types";

export function PlanetTable({ planets }: { planets: Planet[] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16 pl-5">
              <span className="sr-only">Relative size</span>
            </TableHead>
            <TableHead>Planet</TableHead>
            <TableHead className="text-right">Diameter (km)</TableHead>
            <TableHead>Terrain</TableHead>
            <TableHead className="text-right">Climate</TableHead>
            <TableHead className="pr-5 text-right">Population</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planets.map((planet) => {
            const id = getPlanetId(planet.url);
            const terrainTags = toTags(planet.terrain);

            return (
              <TableRow key={planet.url} className="group">
                <TableCell className="pl-5">
                  <PlanetOrb planet={planet} box={ORB_SIZES.table} minRatio={0.62} />
                </TableCell>
                <TableCell>
                  <Link
                    to={`/planets/${id}`}
                    className="rounded font-semibold outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 group-hover:text-primary"
                  >
                    {planet.name}
                  </Link>
                </TableCell>
                <TableCell className="tabular text-right">
                  {formatNumber(planet.diameter)}
                </TableCell>
                <TableCell>
                  {terrainTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {terrainTags.slice(0, 2).map((tag) => (
                        <TerrainBadge key={tag} terrain={tag} />
                      ))}
                      {terrainTags.length > 2 && (
                        <Badge variant="muted">
                          +{terrainTags.length - 2}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Unknown</span>
                  )}
                </TableCell>
                <TableCell className="text-right capitalize text-muted-foreground">
                  {capitalize(formatText(planet.climate))}
                </TableCell>
                <TableCell className="tabular pr-5 text-right">
                  {formatNumber(planet.population)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
