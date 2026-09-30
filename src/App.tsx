import { Route, Routes } from "react-router-dom";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import NotFoundPage from "@/pages/NotFoundPage";
import PlanetDetailsPage from "@/pages/PlanetDetailsPage";
import PlanetListPage from "@/pages/PlanetListPage";

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main
        id="main"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8"
      >
        <Routes>
          <Route path="/" element={<PlanetListPage />} />
          <Route path="/planets/:id" element={<PlanetDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}
