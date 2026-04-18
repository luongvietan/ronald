import { ChevronRight, House, SearchX } from "lucide-react";
import { client } from "@/lib/sanity/client";
import { providersByCategoryQuery, categoriesQuery, allCategorySlugsQuery } from "@/lib/sanity/queries";
import ProviderCard from "@/components/ProviderCard";
import CategoryFilters from "@/components/CategoryFilters";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

type Category = { _id: string; name: string; slug: string };
type Provider = {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  location?: string;
  rating?: number;
  priceRange?: string;
  images?: Array<{ asset?: { _ref: string } }>;
  galleryImageUrls?: string[];
};

const STATIC_SLUGS = [
  "photography",
  "catering",
  "flowers-decoration",
  "music-dj",
  "venues",
  "event-planner",
  "decoration",
];

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allCategorySlugsQuery);
    if (slugs.length > 0) return slugs;
  } catch {
    /* fall back */
  }
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const label = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const t = await getTranslations({ locale, namespace: "search" });
  return {
    title: `${label} — ${t("metaTitle")}`,
    description: `${label} — Mauritius`,
    alternates: {
      canonical: `/${locale}/categories/${slug}`,
      languages: {
        en: `/en/categories/${slug}`,
        fr: `/fr/categories/${slug}`,
      },
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ location?: string; q?: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as AppLocale;
  const { location = "", q = "" } = await searchParams;
  const t = await getTranslations({ locale, namespace: "categoryPage" });

  let providers: Provider[] = [];
  let allCategories: Category[] = [];

  try {
    [providers, allCategories] = await Promise.all([
      client.fetch(providersByCategoryQuery, { slug, location, q, locale: loc }),
      client.fetch(categoriesQuery, { locale: loc }),
    ]);
  } catch {
    /* Sanity not configured */
  }

  const categoryLabel = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen" data-page="category">
      <div className="bg-surface-container-lowest border-b border-outline-variant/40 pt-24 pb-8">
        <div className="max-w-[1200px] mx-auto px-6" data-cat-header>
          <div data-cat-breadcrumb className="flex items-center gap-1.5 text-on-surface-variant text-sm mb-5">
            <Link href="/" className="hover:text-primary transition-colors">
              {t("breadcrumbHome")}
            </Link>
            <ChevronRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            <Link href="/categories/photography" className="hover:text-primary transition-colors">
              {t("breadcrumbExplore")}
            </Link>
            <ChevronRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            <span className="text-on-surface font-medium">{categoryLabel}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="section-label">
                {providers.length > 0 ? t("results", { count: providers.length }) : t("services")}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
                {categoryLabel} {t("titleSuffix")}
              </h1>
            </div>
          </div>

          {allCategories.length > 0 && (
            <div data-cat-pills className="flex flex-wrap gap-2 mt-6 -mx-1">
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  aria-current={cat.slug === slug ? "page" : undefined}
                  className={`px-4 py-1.5 rounded-[36px] text-sm font-semibold transition-colors duration-150 ${
                    cat.slug === slug
                      ? "bg-primary text-on-primary shadow-[0_1px_2px_rgba(34,34,34,0.06)]"
                      : "bg-surface-container text-text-secondary hover:bg-surface-container-high hover:text-text-primary"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div data-cat-filters>
          <CategoryFilters currentLocation={location} currentQ={q} />
        </div>

        {providers.length > 0 ? (
          <div data-cat-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                galleryImageUrls={p.galleryImageUrls}
              />
            ))}
          </div>
        ) : (
          <div data-cat-empty className="text-center py-28">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container mb-6">
              <SearchX aria-hidden className="size-12 text-outline" strokeWidth={1.25} />
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">{t("noProvidersTitle")}</h3>
            <p className="text-on-surface-variant mb-6 max-w-sm mx-auto">
              {t("noProvidersBody")}{" "}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                {t("contactUs")}
              </Link>{" "}
              {t("noProvidersEnd")}
            </p>
            <Link href="/" className="btn btn-primary">
              <House aria-hidden className="size-[18px] shrink-0" strokeWidth={2} />
              {t("backHome")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
