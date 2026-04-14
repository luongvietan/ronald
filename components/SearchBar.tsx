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
      className="bg-white p-2 md:p-3 rounded-full shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto"
    >
      {/* Keyword Input */}
      <div className="flex-1 flex items-center px-6 py-3 bg-surface-container-low rounded-full">
        <span className="material-symbols-outlined text-primary mr-3">
          search
        </span>
        <input
          type="text"
          placeholder="Search by name or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-on-surface-variant font-medium text-sm outline-none"
        />
      </div>

      {/* Category Select */}
      <div className="flex-1 flex items-center px-6 py-3 bg-surface-container-low rounded-full">
        <span className="material-symbols-outlined text-primary mr-3">
          category
        </span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-medium cursor-pointer text-sm outline-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location Select */}
      <div className="flex-1 flex items-center px-6 py-3 bg-surface-container-low rounded-full">
        <span className="material-symbols-outlined text-primary mr-3">
          location_on
        </span>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-medium cursor-pointer text-sm outline-none"
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
      >
        <span className="material-symbols-outlined">search</span>
        Search
      </button>
    </form>
  );
}
