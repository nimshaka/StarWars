import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LuCircleAlert, LuSparkles } from "react-icons/lu";

import { describeError, isApiError } from "@/api/planets";
import { Pagination } from "@/components/pagination";
import { PlanetCard } from "@/components/planet-card";
import { PlanetTable } from "@/components/planet-table";
import { PlanetToolbar } from "@/components/planet-toolbar";
import {
  EmptyState,
  ErrorState,
  PlanetGridSkeleton,
  PlanetTableSkeleton,
} from "@/components/states";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STORAGE_KEYS, TABLE_MEDIA_QUERY, VIEW_MODES } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePlanets } from "@/hooks/usePlanets";
import {
  describeRange,
  getTotalPages,
  parsePageParam,
  parseSortOrder,
  sortPlanets,
} from "@/lib/planets";
import { cn } from "@/lib/utils";
import type { SortOrder, ViewMode } from "@/types";

export default function PlanetListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parsePageParam(searchParams.get("page"));
  const query = (searchParams.get("q") ?? "").trim();
  const sort = parseSortOrder(searchParams.get("sort"));

  const [searchInput, setSearchInput] = useState(query);
  const debouncedSearch = useDebounce(searchInput);

  const [view, setView] = useLocalStorage<ViewMode>(
    STORAGE_KEYS.view,
    "grid",
    VIEW_MODES,
  );

  const canUseTable = useMediaQuery(TABLE_MEDIA_QUERY);
  const activeView: ViewMode = canUseTable ? view : "grid";

  const { data, isPending, isError, error, isFetching, refetch } = usePlanets(
    page,
    query,
  );

  const planets = useMemo(
    () => sortPlanets(data?.results ?? [], sort),
    [data?.results, sort],
  );

  const total = data?.count ?? 0;

  const updateParams = useCallback(
    (change: (params: URLSearchParams) => void, replace = false) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          change(next);
          return next;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  const lastPushedQuery = useRef(query);

  useEffect(() => {
    const term = debouncedSearch.trim();
    if (term === lastPushedQuery.current) return;
    lastPushedQuery.current = term;

    updateParams((params) => {
      if (term) params.set("q", term);
      else params.delete("q");
      params.delete("page");
    }, true);
  }, [debouncedSearch, updateParams]);

  useEffect(() => {
    if (query === lastPushedQuery.current) return;
    lastPushedQuery.current = query;
    setSearchInput(query);
  }, [query]);

  const goToPage = useCallback(
    (nextPage: number) => {
      updateParams((params) => {
        if (nextPage <= 1) params.delete("page");
        else params.set("page", String(nextPage));
      });
      window.scrollTo({ top: 0 });
    },
    [updateParams],
  );

  const handleSortChange = useCallback(
    (nextSort: SortOrder) => {
      updateParams((params) => {
        if (nextSort === "default") params.delete("sort");
        else params.set("sort", nextSort);
      }, true);
    },
    [updateParams],
  );

  const pageOutOfRange = isError && isApiError(error) && error.status === 404;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border bg-card px-5 py-8 sm:px-8 sm:py-10">
        <div
          className="starfield pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative max-w-2xl space-y-3">
          <Badge variant="secondary" className="gap-1.5">
            <LuSparkles aria-hidden />
            {total > 0
              ? `${total.toLocaleString()} worlds catalogued`
              : "Star Wars archive"}
          </Badge>
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Explore every planet in the galaxy
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Search the Star Wars planetary archive, compare worlds at a glance,
            and open any planet for its full profile. Orb size scales with real
            diameter.
          </p>
        </div>
      </section>

      <PlanetToolbar
        search={searchInput}
        onSearchChange={setSearchInput}
        sort={sort}
        onSortChange={handleSortChange}
        view={view}
        onViewChange={setView}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <p aria-live="polite" aria-atomic="true">
          {isPending
            ? "Loading planets…"
            : describeRange(page, planets.length, total)}
          {query && total > 0 && (
            <>
              {" for "}
              <span className="font-medium text-foreground">“{query}”</span>
            </>
          )}
        </p>
        {sort !== "default" && planets.length > 1 && (
          <p className="flex items-center gap-1.5 text-xs">
            <LuCircleAlert className="size-3.5 shrink-0" aria-hidden />
            Sorting applies to this page only
          </p>
        )}
      </div>

      {isPending &&
        (activeView === "table" ? (
          <PlanetTableSkeleton />
        ) : (
          <PlanetGridSkeleton />
        ))}

      {isError && (
        <>
          <ErrorState
            message={
              pageOutOfRange
                ? `Page ${page} is past the end of the archive.`
                : describeError(error, "The archive could not be reached.")
            }
            onRetry={pageOutOfRange ? undefined : () => void refetch()}
          />
          {pageOutOfRange && (
            <div className="flex justify-center">
              <Button variant="outline" size="sm" onClick={() => goToPage(1)}>
                Back to page 1
              </Button>
            </div>
          )}
        </>
      )}

      {!isPending && !isError && planets.length === 0 && (
        <EmptyState query={query} onClear={() => setSearchInput("")} />
      )}

      {planets.length > 0 && (
        <div
          className={cn(
            "transition-opacity",
            isFetching && "pointer-events-none opacity-60",
          )}
          aria-busy={isFetching}
        >
          {activeView === "table" ? (
            <PlanetTable planets={planets} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {planets.map((planet) => (
                <PlanetCard key={planet.url} planet={planet} />
              ))}
            </div>
          )}
        </div>
      )}

      {!isError && (
        <Pagination
          page={page}
          totalPages={getTotalPages(total)}
          onChange={goToPage}
        />
      )}
    </div>
  );
}
