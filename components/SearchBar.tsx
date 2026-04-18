"use client";

import { LayoutGrid, MapPin, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

const CATEGORY_SLUGS = [
  { slug: "photography", key: "photography" },
  { slug: "catering", key: "catering" },
  { slug: "flowers-decoration", key: "flowersDecoration" },
  { slug: "music-dj", key: "musicDj" },
  { slug: "venues", key: "venues" },
  { slug: "event-planner", key: "eventPlanner" },
  { slug: "decoration", key: "decoration" },
] as const;

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

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const router = useRouter();
  const t = useTranslations("search");
  const tCat = useTranslations("footer.categories");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location) params.set("location", location);

    if (category) {
      const qs = params.toString();
      router.push(`/categories/${category}${qs ? `?${qs}` : ""}`);
    } else {
      params.set("q", query.trim() || "");
      router.push(`/search?${params.toString()}`);
    }
  }

  if (compact) {
    return (
      <form role="search" aria-label={t("compactAria")} onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full">
        <label className="sr-only" htmlFor="search-compact-q">
          {t("searchProvidersLabel")}
        </label>
        <div className="flex-1 flex items-center px-4 py-2.5 bg-surface-container-lowest rounded-[36px] border border-border-strong focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(181,44,63,0.15)] transition-all duration-150">
          <Search aria-hidden className="text-text-secondary size-5 mr-2 shrink-0" strokeWidth={2} />
          <input
            id="search-compact-q"
            type="text"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none w-full text-text-primary placeholder:text-text-secondary text-sm outline-none"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {t("search")}
        </button>
      </form>
    );
  }

  return (
    <form role="search" aria-label={t("findAria")} onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white/97 backdrop-blur-xl rounded-[16px] md:rounded-[36px] shadow-[0_8px_40px_rgba(0,0,0,0.25)] overflow-hidden border border-white/60">
        <div className="flex-[1.4] flex items-center gap-3 px-5 py-4 md:py-3.5 hover:bg-black/[0.02] transition-colors duration-150">
          <Search aria-hidden className="text-primary/80 size-5 shrink-0" strokeWidth={2} />
          <div className="flex flex-col min-w-0 flex-1">
            <label htmlFor="search-what" className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-0.5 select-none">
              {t("what")}
            </label>
            <input
              id="search-what"
              type="text"
              placeholder={t("whatPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none w-full text-text-primary font-medium text-sm outline-none placeholder:text-text-secondary placeholder:font-normal"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-border-strong/70 flex-shrink-0" />
        <div className="md:hidden h-px bg-border-strong/50 mx-4" />

        <div className="flex-1 flex items-center gap-3 px-5 py-4 md:py-3.5 hover:bg-black/[0.02] transition-colors duration-150">
          <LayoutGrid aria-hidden className="text-primary/80 size-5 shrink-0" strokeWidth={2} />
          <div className="flex flex-col min-w-0 flex-1">
            <label htmlFor="search-category" className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-0.5 select-none">
              {t("category")}
            </label>
            <select
              id="search-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent border-none w-full text-text-primary font-medium cursor-pointer text-sm outline-none appearance-none"
            >
              <option value="">{t("allCategories")}</option>
              {CATEGORY_SLUGS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {tCat(c.key)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-border-strong/70 flex-shrink-0" />
        <div className="md:hidden h-px bg-border-strong/50 mx-4" />

        <div className="flex-1 flex items-center gap-3 px-5 py-4 md:py-3.5 hover:bg-black/[0.02] transition-colors duration-150">
          <MapPin aria-hidden className="text-primary/80 size-5 shrink-0" strokeWidth={2} />
          <div className="flex flex-col min-w-0 flex-1">
            <label htmlFor="search-location" className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-0.5 select-none">
              {t("location")}
            </label>
            <select
              id="search-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none w-full text-text-primary font-medium cursor-pointer text-sm outline-none appearance-none"
            >
              <option value="">{t("allLocations")}</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="px-3 py-3 md:py-2">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            <Search aria-hidden className="size-[18px] shrink-0" strokeWidth={2} />
            <span>{t("search")}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
