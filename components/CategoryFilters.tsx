"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

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

export default function CategoryFilters({ currentLocation, currentQ }: CategoryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("categoryPage");

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

  const hasFilters = Boolean(currentLocation || currentQ);

  return (
    <div className="sticky top-[72px] z-40 mb-12 py-4 bg-surface/85 backdrop-blur-md" role="region" aria-label={t("filtersAria")}>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-[36px] border border-border-strong shadow-[0_1px_2px_rgba(34,34,34,0.06)] hover:border-text-secondary focus-within:border-primary transition-colors duration-150">
          <span aria-hidden="true" className="material-symbols-outlined text-primary text-lg">
            location_on
          </span>
          <label htmlFor="filter-location" className="sr-only">
            {t("filterLocation")}
          </label>
          <select
            id="filter-location"
            value={currentLocation}
            onChange={(e) => applyFilter(e.target.value)}
            className="bg-transparent border-none text-text-primary font-semibold tracking-wider uppercase text-[11px] cursor-pointer outline-none"
          >
            <option value="">{t("allLocations")}</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled
          aria-disabled="true"
          title={t("comingSoon")}
          className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-[36px] border border-border-strong shadow-[0_1px_2px_rgba(34,34,34,0.06)] opacity-55 cursor-not-allowed"
        >
          <span className="font-semibold text-text-secondary tracking-wider uppercase text-[11px]">{t("price")}</span>
          <span aria-hidden="true" className="material-symbols-outlined text-primary text-lg">
            expand_more
          </span>
        </button>

        <button
          type="button"
          disabled
          aria-disabled="true"
          title={t("comingSoon")}
          className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-[36px] border border-border-strong shadow-[0_1px_2px_rgba(34,34,34,0.06)] opacity-55 cursor-not-allowed"
        >
          <span className="font-semibold text-text-secondary tracking-wider uppercase text-[11px]">{t("style")}</span>
          <span aria-hidden="true" className="material-symbols-outlined text-primary text-lg">
            filter_list
          </span>
        </button>

        {currentQ && (
          <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-1.5 rounded-[36px] text-xs font-semibold">
            <span aria-hidden="true" className="material-symbols-outlined text-sm">
              search
            </span>
            {currentQ}
          </span>
        )}

        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline transition-colors duration-150 rounded px-1"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-base">
              close
            </span>
            {t("resetAll")}
          </button>
        )}
      </div>
    </div>
  );
}
