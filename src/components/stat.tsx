import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface StatProps {
  icon: IconType;
  label: string;
  value: string;
  size?: "sm" | "lg";
  className?: string;
}

/** A labelled metric used on both the planet cards and the details page. */
export function Stat({
  icon: Icon,
  label,
  value,
  size = "sm",
  className,
}: StatProps) {
  return (
    <div className={cn("min-w-0 space-y-1", className)}>
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3.5 shrink-0" aria-hidden />
        <span className="truncate">{label}</span>
      </div>
      <p
        className={cn(
          "tabular truncate font-semibold text-foreground",
          size === "lg" ? "text-lg" : "text-sm",
        )}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
