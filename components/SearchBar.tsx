"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { label: "Photography", slug: "photography" },
  { label: "Catering", slug: "catering" },
  { label: "Flowers & Decoration", slug: "flowers-decoration" },
  { label: "Music / DJ", slug: "music-dj" },
  { label: "Venues", slug: "venues" },
  { label: "Event Planner", slug: "event-planner" },
  { label: "Decoration", slug: "decoration" },
];

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
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1 flex items-center px-4 py-2.5 bg-surface-container-lowest rounded-full border border-outline-variant">
          <span className="material-symbols-outlined text-on-surface-variant text-xl mr-2">search</span>
          <input
            type="text"
            placeholder="Search providers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-on-surface-variant text-sm outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      {/* Main pill container */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white/97 backdrop-blur-xl rounded-2xl md:rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.25)] overflow-hidden border border-white/60">

        {/* Keyword */}
        <div className="flex-[1.4] flex items-center gap-3 px-5 py-4 md:py-3.5 hover:bg-black/[0.02] transition-colors group cursor-text">
          <span className="material-symbols-outlined text-primary/80 flex-shrink-0 text-[20px]">search</span>
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest mb-0.5 select-none">
              What
            </label>
            <input
              type="text"
              placeholder="Photographer, DJ, Caterer…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-medium text-sm outline-none placeholder:text-on-surface-variant/50 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-outline-variant/40 flex-shrink-0" />
        <div className="md:hidden h-px bg-outline-variant/30 mx-4" />

        {/* Category */}
        <div className="flex-1 flex items-center gap-3 px-5 py-4 md:py-3.5 hover:bg-black/[0.02] transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-primary/80 flex-shrink-0 text-[20px]">category</span>
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest mb-0.5 select-none">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-medium cursor-pointer text-sm outline-none appearance-none"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-outline-variant/40 flex-shrink-0" />
        <div className="md:hidden h-px bg-outline-variant/30 mx-4" />

        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-5 py-4 md:py-3.5 hover:bg-black/[0.02] transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-primary/80 flex-shrink-0 text-[20px]">location_on</span>
          <div className="flex flex-col min-w-0 flex-1">
            <label className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest mb-0.5 select-none">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-medium cursor-pointer text-sm outline-none appearance-none"
            >
              <option value="">All locations</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search button — inline on desktop */}
        <div className="px-3 py-3 md:py-2">
          <button
            type="submit"
            className="w-full md:w-auto bg-primary text-on-primary px-6 py-3.5 md:py-3 md:rounded-full rounded-xl font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
