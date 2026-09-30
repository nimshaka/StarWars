import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { buildPageItems } from "@/lib/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly onChange: (page: number) => void;
  readonly className?: string;
}

export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = buildPageItems(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Go to previous page"
      >
        <LuChevronLeft aria-hidden />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Numbered pages need room to breathe; small screens get a counter. */}
      <ul className="hidden items-center gap-1 sm:flex">
        {items.map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <Button
                variant={item === page ? "default" : "ghost"}
                size="icon-sm"
                onClick={() => onChange(item)}
                aria-label={`Go to page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className="tabular"
              >
                {item}
              </Button>
            </li>
          ) : (
            <li
              key={item}
              aria-hidden
              className="px-1 text-muted-foreground select-none"
            >
              &hellip;
            </li>
          ),
        )}
      </ul>

      <span className="tabular px-2 text-sm text-muted-foreground sm:hidden">
        {page} | {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <LuChevronRight aria-hidden />
      </Button>
    </nav>
  );
}
