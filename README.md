# Planet Explorer

A responsive Star Wars planetary archive built on [SWAPI](https://swapi.dev).
Search, sort and compare every planet in the galaxy, then open any world for its
full profile.

![React 19](https://img.shields.io/badge/React-19-149eca)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Getting started

```bash
npm install
npm run dev
```

The app runs at <http://localhost:5173>.

| Script            | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Vite dev server with hot module replacement |
| `npm run build`   | Type-check, then build to `dist/`           |
| `npm run preview` | Serve the production build locally          |
| `npm run lint`    | Oxlint across `src/`                        |

## Project structure

Each folder has one job, and dependencies only ever point downward:
`pages` → `components` → `hooks` → `lib` → `api` → `constants` / `types`.

```
src/
├─ constants/   Every fixed value in the app — no magic numbers elsewhere
│  ├─ api.ts        SWAPI url, page size, cache times, error messages
│  ├─ planet.ts     Biome keywords, palettes, orb sizing
│  ├─ storage.ts    localStorage keys
│  ├─ ui.ts         Sort options, view modes, breakpoints, debounce delay
│  └─ index.ts      Barrel: import { PAGE_SIZE } from "@/constants"
│
├─ types/       Every shared TypeScript type
│  ├─ planet.ts     Planet, PlanetsResponse (the SWAPI response shapes)
│  ├─ ui.ts         SortOrder, ViewMode, Theme, Biome, BiomePalette
│  └─ index.ts      Barrel: import type { Planet } from "@/types"
│
├─ api/         Talking to SWAPI: fetch calls and the ApiError class
├─ lib/         Pure functions — no React, easy to reason about and test
│  ├─ biome.ts      Decides what kind of world a planet is
│  ├─ format.ts     Turns SWAPI's strings into display text
│  ├─ pagination.ts Builds the "1 … 4 5 6 … 20" page buttons
│  ├─ planets.ts    Sorting, page maths, the results label
│  ├─ theme.ts      Theme context and the stored-theme reader
│  └─ utils.ts      cn() — merges Tailwind class names
│
├─ hooks/       Reusable React state: useDebounce, useLocalStorage,
│               useMediaQuery, usePlanets (React Query wrappers)
│
├─ components/
│  ├─ ui/           shadcn/ui primitives (button, card, select, table, …)
│  └─ *.tsx         App components: planet card, table, orb, toolbar, states
│
├─ pages/       One file per route
└─ App.tsx      Layout shell and route definitions
```

## How it works

**Data.** `api/planets.ts` wraps `fetch` and converts any failure into an
`ApiError` carrying the HTTP status. `hooks/usePlanets.ts` wraps that in React
Query, which handles caching, retries and cancellation. A 404 is never retried,
because that page or planet will never exist.

**URL as state.** Search, page and sort all live in the query string, so any
view can be shared or bookmarked and the back button works. The layout choice is
a personal preference rather than part of the view, so it lives in
`localStorage` instead.

**Search.** The input updates on every keystroke, but `useDebounce` waits 350 ms
before the term reaches the URL, so one request is sent per pause rather than
per character.

**Planet orbs.** Each planet is drawn as an SVG sphere. Its colour comes from
`lib/biome.ts`, which looks for keywords in the terrain and climate, and its
size is proportional to the real diameter against the largest known planet
(square-rooted, so small worlds stay visible next to a gas giant). The same
classification picks the icon on each terrain badge, so colour and icon always
agree.

**Responsive layout.** Cards on phones, and a card/table switch from the `md`
breakpoint up. `useMediaQuery` decides which one renders, so only one layout is
ever in the DOM rather than hiding the other with CSS.

**Theme.** Light, dark and system, applied by an inline script in `index.html`
before the first paint so there is no flash of the wrong colour scheme.

## A note on sorting

SWAPI paginates on the server and offers no sort parameter, so **sorting can
only reorder the ten planets on the current page**. Rather than implying a
global ordering, the UI says "Sorting applies to this page only" whenever a sort
is active. Planets with an unknown diameter always sort last.

## Tech stack

| Concern    | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | React 19 + TypeScript (strict, `noUncheckedIndexedAccess`) |
| Build      | Vite 8                                                     |
| Styling    | Tailwind CSS 4 with CSS-variable design tokens            |
| Components | shadcn/ui (new-york) on Radix primitives                  |
| Icons      | `react-icons` (Lucide set)                                |
| Data       | TanStack Query                                             |
| Routing    | React Router 7                                             |
