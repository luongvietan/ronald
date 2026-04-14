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
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/40 pt-24 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-on-surface-variant text-sm mb-5">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
            <Link href="/categories/photography" className="hover:text-primary transition-colors">
              Explore
            </Link>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
            <span className="text-on-surface font-medium">{categoryLabel}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="section-label">{providers.length > 0 ? `${providers.length} result${providers.length !== 1 ? "s" : ""}` : "Services"}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
                {categoryLabel} in Mauritius
              </h1>
            </div>
          </div>

          {/* Category Pills */}
          {allCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 -mx-1">
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    cat.slug === slug
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-10">
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
          <div className="text-center py-28">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container mb-6">
              <span className="material-symbols-outlined text-5xl text-outline">
                search_off
              </span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">
              No providers yet
            </h3>
            <p className="text-on-surface-variant mb-6 max-w-sm mx-auto">
              We&apos;re growing our network. Check back soon or{" "}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                contact us
              </Link>{" "}
              to list your service.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
