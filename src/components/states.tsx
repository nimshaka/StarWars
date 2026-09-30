import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { LuRefreshCw, LuSearchX, LuTriangleAlert } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Card placeholders shown while the first page of results loads. */
export function PlanetGridSkeleton({ count = 10 }: { readonly count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => (
        <Card key={index} className="h-full gap-4 py-5">
          <div className="flex items-center gap-4 px-5">
            <Skeleton className="size-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-5">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
          <div className="flex gap-2 px-5">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );
}

/** Row placeholders matching the table layout. */
export function PlanetTableSkeleton({
  count = 10,
}: {
  readonly count?: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card" aria-hidden>
      <div className="h-11 border-b bg-muted/40" />
      <div className="divide-y">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="flex items-center gap-4 px-5 py-3">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="ml-auto h-4 w-20" />
            <Skeleton className="hidden h-5 w-24 rounded-md sm:block" />
            <Skeleton className="hidden h-4 w-20 sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatePanelProps {
  readonly icon: IconType;
  readonly title: string;
  readonly description: ReactNode;
  readonly action?: ReactNode;
  readonly tone?: "neutral" | "danger";
  readonly className?: string;
}

/** Shared frame for the empty, error and not-found states. */
export function StatePanel({
  icon: Icon,
  title,
  description,
  action,
  tone = "neutral",
  className,
}: StatePanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-xl border border-dashed px-6 py-14 text-center",
        tone === "danger" && "border-destructive/40 bg-destructive/5",
        className,
      )}
    >
      <div
        className={cn(
          "grid size-12 place-items-center rounded-full",
          tone === "danger"
            ? "bg-destructive/10 text-destructive"
            : "bg-muted text-muted-foreground",
        )}
        aria-hidden
      >
        <Icon className="size-5" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  query,
  onClear,
}: {
  readonly query: string;
  readonly onClear: () => void;
}) {
  return (
    <StatePanel
      icon={LuSearchX}
      title="No planets found"
      description={
        query ? (
          <>
            Nothing in the archive matches{" "}
            <span className="font-medium text-foreground">“{query}”</span>. Try
            a shorter or different name.
          </>
        ) : (
          "The archive returned no planets for this page."
        )
      }
      action={
        query ? (
          <Button variant="outline" size="sm" onClick={onClear}>
            Clear search
          </Button>
        ) : undefined
      }
    />
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  readonly message: string;
  readonly onRetry?: () => void;
}) {
  return (
    <div role="alert">
      <StatePanel
        tone="danger"
        icon={LuTriangleAlert}
        title="Something went wrong"
        description={message}
        action={
          onRetry ? (
            <Button variant="outline" size="sm" onClick={onRetry}>
              <LuRefreshCw aria-hidden />
              Try again
            </Button>
          ) : undefined
        }
      />
    </div>
  );
}
