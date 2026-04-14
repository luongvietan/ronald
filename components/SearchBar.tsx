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
  /** If true, show as compact inline bar (e.g. on listing pages) */
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
      // Navigate to specific category page with optional filters
      const qs = params.toString();
      router.push(`/categories/${category}${qs ? `?${qs}` : ""}`);
    } else {
      // Navigate to global search page
      params.set("q", query.trim() || "");
      if (location) params.set("location", location);
      router.push(`/search?${params.toString()}`);
    }
  }

  if (compact) {
    return (
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-2 w-full"
      >
        <div className="flex-1 flex items-center px-4 py-2.5 bg-surface-container-lowest rounded-full border border-outline-variant">
          <span className="material-symbols-outlined text-on-surface-variant text-xl mr-2">
            search
          </span>
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
    <form
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden max-w-3xl mx-auto"
    >
      {/* Fields row */}
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-surface-container-high">
        {/* Keyword Input */}
        <div className="flex-1 flex items-center px-5 py-4 gap-3">
          <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontSize: "20px" }}>
            search
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Keyword</span>
            <input
              type="text"
              placeholder="Photographer, DJ, Caterer..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-semibold text-sm outline-none placeholder:text-on-surface-variant/60 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="flex-1 flex items-center px-5 py-4 gap-3">
          <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontSize: "20px" }}>
            category
          </span>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-semibold cursor-pointer text-sm outline-none"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Select */}
        <div className="flex-1 flex items-center px-5 py-4 gap-3">
          <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontSize: "20px" }}>
            location_on
          </span>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-semibold cursor-pointer text-sm outline-none"
            >
              <option value="">All locations</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search button row */}
      <div className="bg-surface-container-lowest px-4 py-3 flex justify-end">
        <button
          type="submit"
          className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>search</span>
          Search
        </button>
      </div>
    </form>
  );
}
