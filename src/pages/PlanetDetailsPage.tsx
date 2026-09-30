import { Link, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuClock,
  LuDroplets,
  LuFilm,
  LuOrbit,
  LuRuler,
  LuThermometer,
  LuUsers,
  LuWeight,
} from "react-icons/lu";

import { describeError, isApiError } from "@/api/planets";
import { PlanetOrb } from "@/components/planet-orb";
import { Stat } from "@/components/stat";
import { ErrorState } from "@/components/states";
import { TerrainBadge } from "@/components/terrain-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ORB_SIZES } from "@/constants";
import { usePlanet } from "@/hooks/usePlanets";
import {
  capitalize,
  formatNumber,
  formatText,
  toTags,
  withUnit,
} from "@/lib/format";
import type { Planet } from "@/types";

function BackLink() {
  return (
    <Button asChild variant="ghost" size="sm" className="-ml-2">
      <Link to="/">
        <LuArrowLeft aria-hidden />
        Back to all planets
      </Link>
    </Button>
  );
}

function DetailsLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <BackLink />
      {children}
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <Card className="gap-6 py-6">
        <div className="flex flex-col items-center gap-6 px-6 sm:flex-row sm:items-start">
          <Skeleton className="size-32 rounded-full" />
          <div className="w-full space-y-3">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function buildStats(planet: Planet) {
  return [
    {
      icon: LuRuler,
      label: "Diameter",
      value: withUnit(planet.diameter, "km"),
    },
    {
      icon: LuUsers,
      label: "Population",
      value: formatNumber(planet.population),
    },
    {
      icon: LuWeight,
      label: "Gravity",
      value: capitalize(formatText(planet.gravity)),
    },
    {
      icon: LuClock,
      label: "Day length",
      value: withUnit(planet.rotation_period, "hours"),
    },
    {
      icon: LuOrbit,
      label: "Year length",
      value: withUnit(planet.orbital_period, "days"),
    },
    {
      icon: LuDroplets,
      label: "Surface water",
      value: withUnit(planet.surface_water, "%"),
    },
  ];
}

export default function PlanetDetailsPage() {
  const { id = "" } = useParams();

  const isValidId = /^\d+$/.test(id);

  const { data, isPending, isError, error, refetch } = usePlanet(id, isValidId);

  if (!isValidId) {
    return (
      <DetailsLayout>
        <ErrorState message={`“${id}” is not a valid planet id.`} />
      </DetailsLayout>
    );
  }

  if (isPending) {
    return (
      <DetailsLayout>
        <DetailsSkeleton />
      </DetailsLayout>
    );
  }

  if (isError) {
    const notFound = isApiError(error) && error.status === 404;

    return (
      <DetailsLayout>
        <ErrorState
          message={
            notFound
              ? `No planet with id ${id} exists in the archive.`
              : describeError(error, "The archive could not be reached.")
          }
          onRetry={notFound ? undefined : () => void refetch()}
        />
      </DetailsLayout>
    );
  }

  const climateTags = toTags(data.climate);
  const terrainTags = toTags(data.terrain);
  const stats = buildStats(data);

  return (
    <DetailsLayout>
      <div className="space-y-6">
        <Card className="gap-6 overflow-hidden py-6">
          <div className="flex flex-col items-center gap-6 px-6 text-center sm:flex-row sm:items-start sm:text-left">
            <figure className="m-0 flex shrink-0 flex-col items-center gap-2">
              <PlanetOrb planet={data} box={ORB_SIZES.details} showScaleRef />
              <figcaption className="max-w-36 text-[11px] leading-tight text-muted-foreground">
                Dashed ring marks the largest known planet
              </figcaption>
            </figure>

            <div className="min-w-0 flex-1 space-y-3">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {data.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {withUnit(data.diameter, "km")} across &middot;{" "}
                  {formatNumber(data.population)} inhabitants
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
                {climateTags.map((tag) => (
                  <Badge
                    key={`climate-${tag}`}
                    variant="outline"
                    className="capitalize"
                  >
                    <LuThermometer aria-hidden />
                    {tag}
                  </Badge>
                ))}
                {terrainTags.map((tag) => (
                  <TerrainBadge key={`terrain-${tag}`} terrain={tag} />
                ))}
                {climateTags.length === 0 && terrainTags.length === 0 && (
                  <Badge variant="muted">No environment data</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <dl className="grid gap-x-6 gap-y-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <Stat
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    size="lg"
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2">
          <Card className="gap-2 py-5">
            <div className="px-5">
              <Stat
                icon={LuUsers}
                label="Known residents"
                value={data.residents.length.toLocaleString()}
                size="lg"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Characters from the films who call {data.name} home.
              </p>
            </div>
          </Card>
          <Card className="gap-2 py-5">
            <div className="px-5">
              <Stat
                icon={LuFilm}
                label="Film appearances"
                value={data.films.length.toLocaleString()}
                size="lg"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Number of films in which {data.name} appears.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </DetailsLayout>
  );
}
