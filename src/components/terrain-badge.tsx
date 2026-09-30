import type { IconType } from "react-icons";
import {
  LuBuilding2,
  LuCloudy,
  LuDroplet,
  LuFlame,
  LuMountain,
  LuSnowflake,
  LuSun,
  LuTrees,
  LuWaves,
} from "react-icons/lu";

import { Badge } from "@/components/ui/badge";
import { classifyTerrain } from "@/lib/biome";
import type { Biome } from "@/types";

/** Same classification as the orb colours, so icon and colour always agree. */
const BIOME_ICONS: Record<Biome, IconType> = {
  gas: LuCloudy,
  ice: LuSnowflake,
  volcanic: LuFlame,
  urban: LuBuilding2,
  desert: LuSun,
  ocean: LuWaves,
  swamp: LuDroplet,
  forest: LuTrees,
  rock: LuMountain,
};

interface TerrainBadgeProps {
  readonly terrain: string;
}

/** A terrain tag such as "ice caves", with an icon matching its biome. */
export function TerrainBadge({ terrain }: TerrainBadgeProps) {
  const Icon = BIOME_ICONS[classifyTerrain(terrain)];

  return (
    <Badge variant="secondary" className="capitalize">
      <Icon aria-hidden />
      {terrain}
    </Badge>
  );
}
