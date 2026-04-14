import { client } from "@/lib/sanity/client";
import { searchProvidersQuery } from "@/lib/sanity/queries";
import ProviderCard from "@/components/ProviderCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import type { Metadata } from "next";

type Provider = {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  location?: string;
  rating?: number;
  priceRange?: string;
  images?: Array<{ asset?: { _ref: string } }>;
  category?: { name: string; slug: string };
};

export const metadata: Metadata = {
  title: "Search Providers | L'Île Host",
  description:
    "Search event service providers in Mauritius by keyword, category, or location.",
};

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; category?: string }>;
}) {
  const { q = "", location = "", category = "" } = await searchParams;

  let providers: Provider[] = [];

  try {
    providers = await client.fetch(searchProvidersQuery, {
      q,
      location,
      category,
    });
  } catch {
    // Sanity not configured
  }

  const hasFilters = q || location || category;

  return (
    <div className="pt-24 pb-20">
      {/* Search Header */}
      <div className="bg-surface-container-low py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-on-surface mb-6">
            {q ? `Results for "${q}"` : "Search Providers"}
          </h1>
          <SearchBar compact />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Active filters */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm text-on-surface-variant font-medium">
              Active filters:
            </span>
            {q && (
              <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-1.5 rounded-full text-sm font-semibold">
                <span className="material-symbols-outlined text-base">
                  search
                </span>
                {q}
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-1.5 rounded-full text-sm font-semibold">
                <span className="material-symbols-outlined text-base">
                  category
                </span>
                {category.replace("-", " ")}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-1.5 rounded-full text-sm font-semibold">
                <span className="material-symbols-outlined text-base">
                  location_on
                </span>
                {location}
              </span>
            )}
            <Link
              href="/search"
              className="text-primary text-sm font-medium hover:underline ml-2"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* Result count */}
        <p className="text-on-surface-variant text-sm mb-8">
          {providers.length > 0
            ? `${providers.length} provider${providers.length !== 1 ? "s" : ""} found`
            : hasFilters
              ? "No providers match your search."
              : "Start searching to find providers."}
        </p>

        {/* Results grid */}
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((p) => (
              <ProviderCard
                key={p._id}
                name={p.name}
                slug={p.slug}
                shortDescription={p.shortDescription}
                location={p.location}
                rating={p.rating}
                priceRange={p.priceRange}
                images={p.images}
                categoryLabel={p.category?.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-6xl text-outline mb-4 block">
              search_off
            </span>
            <h3 className="text-xl font-bold text-on-surface mb-2">
              No results found
            </h3>
            <p className="text-on-surface-variant mb-6">
              Try different keywords or browse by category.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-all"
            >
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
