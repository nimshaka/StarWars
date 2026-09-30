export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
        <p>Planetary data courtesy of SWAPI, the Star Wars API.</p>
        <a
          href="https://swapi.dev"
          target="_blank"
          rel="noreferrer noopener"
          className="rounded transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          swapi.dev
        </a>
      </div>
    </footer>
  );
}
