"use client";

import { useRouter, usePathname } from "next/navigation";

const LOCATIONS = [
  "Grand Baie",
  "Flic en Flac",
  "Le Morne",
  "Belle Mare",
  "Port Louis",
  "Tamarin",
  "Blue Bay",
  "Ebene",
];

interface CategoryFiltersProps {
  currentLocation: string;
  currentQ: string;
}

export default function CategoryFilters({
  currentLocation,
  currentQ,
}: CategoryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  function applyFilter(location: string) {
    const params = new URLSearchParams();
    if (currentQ) params.set("q", currentQ);
    if (location) params.set("location", location);
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  }

  function clearAll() {
    router.push(pathname);
  }

  const hasFilters = currentLocation || currentQ;

  return (
    <div className="sticky top-[72px] z-40 mb-12 py-4 bg-surface/80 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-3">
        {/* Location filter */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-full shadow-sm">
          <span className="material-symbols-outlined text-primary text-lg">
            location_on
          </span>
          <select
            value={currentLocation}
            onChange={(e) => applyFilter(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-on-surface-variant font-semibold tracking-wider uppercase text-[11px] cursor-pointer outline-none"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Price (placeholder for Phase 2) */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-full shadow-sm cursor-not-allowed opacity-60">
          <span className="font-semibold text-on-surface-variant tracking-wider uppercase text-[11px]">
            Price
          </span>
          <span className="material-symbols-outlined text-primary text-lg">
            expand_more
          </span>
        </div>

        {/* Style (placeholder for Phase 2) */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-full shadow-sm cursor-not-allowed opacity-60">
          <span className="font-semibold text-on-surface-variant tracking-wider uppercase text-[11px]">
            Style
          </span>
          <span className="material-symbols-outlined text-primary text-lg">
            filter_list
          </span>
        </div>

        {/* Active filter chips */}
        {currentQ && (
          <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-1.5 rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-sm">search</span>
            {currentQ}
          </span>
        )}

        {/* Reset */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="ml-auto flex items-center gap-1 text-primary font-medium text-sm hover:underline"
          >
            <span className="material-symbols-outlined text-base">close</span>
            Reset all
          </button>
        )}
      </div>
    </div>
  );
}
