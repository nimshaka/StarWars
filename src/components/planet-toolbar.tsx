import { LuLayoutGrid, LuSearch, LuTable2, LuX } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SORT_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";
import type { SortOrder, ViewMode } from "@/types";

const VIEW_OPTIONS = [
  { value: "grid", label: "Grid view", icon: LuLayoutGrid },
  { value: "table", label: "Table view", icon: LuTable2 },
] as const satisfies readonly { value: ViewMode; label: string; icon: unknown }[];

interface PlanetToolbarProps {
  readonly search: string;
  readonly onSearchChange: (value: string) => void;
  readonly sort: SortOrder;
  readonly onSortChange: (value: SortOrder) => void;
  readonly view: ViewMode;
  readonly onViewChange: (value: ViewMode) => void;
}

/** Search box, sort dropdown and layout switcher above the planet list. */
export function PlanetToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}: PlanetToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <label className="sr-only" htmlFor="planet-search">
          Search planets by name
        </label>
        <LuSearch
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id="planet-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search planets by name…"
          autoComplete="off"
          className="pl-9 pr-10"
        />
        {search.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <LuX />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as SortOrder)}
        >
          <SelectTrigger aria-label="Sort planets" className="flex-1 sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Narrow screens always use cards, so the switcher starts at md. */}
        <fieldset className="m-0 hidden items-center gap-1 rounded-md border bg-card p-1 md:flex">
          <legend className="sr-only">Layout</legend>
          {VIEW_OPTIONS.map(({ value, label, icon: Icon }) => (
            <Tooltip key={value}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={view === value ? "secondary" : "ghost"}
                  size="icon-sm"
                  onClick={() => onViewChange(value)}
                  aria-label={label}
                  aria-pressed={view === value}
                  className={cn(view === value && "text-primary")}
                >
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{label}</TooltipContent>
            </Tooltip>
          ))}
        </fieldset>
      </div>
    </div>
  );
}
