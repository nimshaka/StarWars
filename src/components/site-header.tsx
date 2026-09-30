import { Link } from "react-router-dom";
import { LuOrbit } from "react-icons/lu";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary/25"
            aria-hidden
          >
            <LuOrbit className="size-4.5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold leading-tight tracking-tight">
              Planet Explorer
            </span>
            <span className="hidden text-xs leading-tight text-muted-foreground sm:block">
              The Star Wars planetary archive
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
