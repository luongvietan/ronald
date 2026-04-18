"use client";

import { ChevronDown, ListFilter, MapPin, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { FILTER_LOCATIONS } from "@/lib/filterLocations";

interface CategoryFiltersProps {
  currentLocation: string;
  currentQ: string;
}

export default function CategoryFilters({ currentLocation, currentQ }: CategoryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("categoryPage");
  const [qDraft, setQDraft] = useState(currentQ);

  useEffect(() => {
    setQDraft(currentQ);
  }, [currentQ]);

  function pushFilters(location: string, q: string) {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
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
        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-[36px] border border-border-strong shadow-[0_1px_2px_rgba(34,34,34,0.06)] hover:border-text-secondary focus-within:border-primary transition-colors duration-150 min-w-[min(100%,220px)]">
          <Search aria-hidden className="text-primary size-5 shrink-0" strokeWidth={2} />
          <label htmlFor="filter-q" className="sr-only">
            {t("filterKeyword")}
          </label>
          <input
            id="filter-q"
            type="search"
            value={qDraft}
            placeholder={t("filterKeywordPlaceholder")}
            onChange={(e) => setQDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                pushFilters(currentLocation, qDraft);
              }
            }}
            className="bg-transparent border-none text-text-primary font-medium text-sm w-full min-w-0 outline-none placeholder:text-text-secondary"
          />
        </div>

        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-[36px] border border-border-strong shadow-[0_1px_2px_rgba(34,34,34,0.06)] hover:border-text-secondary focus-within:border-primary transition-colors duration-150">
          <MapPin aria-hidden className="text-primary size-5 shrink-0" strokeWidth={2} />
          <label htmlFor="filter-location" className="sr-only">
            {t("filterLocation")}
          </label>
          <select
            id="filter-location"
            value={currentLocation}
            onChange={(e) => pushFilters(e.target.value, qDraft)}
            className="bg-transparent border-none text-text-primary font-semibold tracking-wider uppercase text-[11px] cursor-pointer outline-none max-w-[200px]"
          >
            <option value="">{t("allLocations")}</option>
            {FILTER_LOCATIONS.map((l) => (
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
          <ChevronDown aria-hidden className="text-primary size-5 shrink-0" strokeWidth={2} />
        </button>

        <button
          type="button"
          disabled
          aria-disabled="true"
          title={t("comingSoon")}
          className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest rounded-[36px] border border-border-strong shadow-[0_1px_2px_rgba(34,34,34,0.06)] opacity-55 cursor-not-allowed"
        >
          <span className="font-semibold text-text-secondary tracking-wider uppercase text-[11px]">{t("style")}</span>
          <ListFilter aria-hidden className="text-primary size-5 shrink-0" strokeWidth={2} />
        </button>

        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline transition-colors duration-150 rounded px-1"
          >
            <X aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            {t("resetAll")}
          </button>
        )}
      </div>
    </div>
  );
}
