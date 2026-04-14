import { client } from "@/lib/sanity/client";
import {
  providersByCategoryQuery,
  categoriesQuery,
  allCategorySlugsQuery,
} from "@/lib/sanity/queries";
import ProviderCard from "@/components/ProviderCard";
import CategoryFilters from "@/components/CategoryFilters";
import Link from "next/link";
import type { Metadata } from "next";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Provider = {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  location?: string;
  rating?: number;
  priceRange?: string;
  images?: Array<{ asset?: { _ref: string } }>;
};

export async function generateStaticParams() {
  const STATIC_SLUGS = [
    "photography",
    "catering",
    "flowers-decoration",
    "music-dj",
    "venues",
    "event-planner",
    "decoration",
  ];
  try {
    const slugs = await client.fetch(allCategorySlugsQuery);
    if (slugs.length > 0) return slugs;
  } catch {
    // fall back to static slugs
  }
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const label = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${label} Services in Mauritius`,
    description: `Browse the best ${label.toLowerCase()} providers for events in Mauritius.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ location?: string; q?: string }>;
}) {
  const { slug } = await params;
  const { location = "", q = "" } = await searchParams;

  let providers: Provider[] = [];
  let allCategories: Category[] = [];

  try {
    [providers, allCategories] = await Promise.all([
      client.fetch(providersByCategoryQuery, { slug, location, q }),
      client.fetch(categoriesQuery),
    ]);
  } catch {
    // Sanity not configured yet
  }

  const categoryLabel = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="pt-24 pb-20 max-w-[1200px] mx-auto px-6">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface font-medium">{categoryLabel}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2">
          {categoryLabel} Services
        </h1>
        <p className="text-on-surface-variant text-lg">
          {providers.length > 0
            ? `${providers.length} result${providers.length !== 1 ? "s" : ""} found`
            : "No providers found yet — check back soon."}
        </p>
      </header>

      {/* Category Pills */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 -mx-1">
          {allCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                cat.slug === slug
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Filter Bar — Client Component */}
      <CategoryFilters currentLocation={location} currentQ={q} />

      {/* Provider Grid */}
      {providers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-6xl text-outline mb-4 block">
            search_off
          </span>
          <h3 className="text-xl font-bold text-on-surface mb-2">
            No providers yet
          </h3>
          <p className="text-on-surface-variant">
            Add providers via the{" "}
            <Link href="/studio" className="text-primary hover:underline">
              admin panel
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
