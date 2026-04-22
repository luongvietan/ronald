import Image from "next/image";
import { ArrowRight, LayoutGrid, MessageCircle, Search, UserCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";
import NewsletterForm from "@/components/NewsletterForm";
import { client } from "@/lib/sanity/client";
import { featuredProvidersQuery, categoriesQuery } from "@/lib/sanity/queries";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

const HERO_PILLS: { slug: string; key: "photography" | "venues" | "catering" | "musicDj" }[] = [
  { slug: "photography", key: "photography" },
  { slug: "venues", key: "venues" },
  { slug: "catering", key: "catering" },
  { slug: "music-dj", key: "musicDj" },
];

type SanityCategory = {
  _id: string;
  name: string;
  slug: string;
  image?: { asset?: { _ref: string } };
  coverImageUrl?: string;
};
type SanityProvider = {
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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "home" });

  let featuredProviders: SanityProvider[] = [];
  let categories: SanityCategory[] = [];

  try {
    [featuredProviders, categories] = await Promise.all([
      client.fetch(featuredProvidersQuery, { locale: loc }),
      client.fetch(categoriesQuery, { locale: loc }),
    ]);
  } catch {
    /* Sanity not yet configured */
  }

  const displayCategories = categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image,
    fallbackImage: c.coverImageUrl,
  }));

  const STATS = [
    { value: "7+", label: t("stats.categories") },
    { value: "100%", label: t("stats.verified") },
    { value: loc === "fr" ? "Gratuit" : "Free", label: t("stats.browse") },
    { value: loc === "fr" ? "Maurice" : "Mauritius", label: t("stats.islandWide") },
  ];

  const HOW_KEYS = ["1", "2", "3"] as const;

  return (
    <div className="overflow-hidden" data-page="home">
      <section
        data-hero
        className="relative min-h-[640px] md:min-h-[820px] w-full flex items-center justify-center"
      >
        <div data-hero-bg className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1UIxBjfPNrLYRWHngEVO9bLwfJFugLFPldM7gJs7DA-eDEVZyFaJRUh8iv3ryoOODRXCVAbLF-eG8TCSOqcAVlLoacKJCr3o8dV8FFsdpwx0drhyZ-8Yk3J29tkZaH_EWe2xfHJVaqTW2_12Xod1QYNlQkwg0BHI9lSsUKklyk6GlMQvzPNLt87RqXELs0oZmgwg93Q-YoDt91wE3cEJQdX2dE-wX2b4eJFRc_LnbR0nVTRxUkRf8NurOBcshoiNCFEkzAgdvALNM"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-16">
          <span
            data-hero-badge
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 border border-white/20 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            {t("heroBadge")}
          </span>
          <h1
            data-hero-title
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold !text-white mb-5 tracking-tight leading-[1.1]"
          >
            {t("heroTitleLine1")}
            {" "}
            {t("heroTitleLine2")}
          </h1>
          <p
            data-hero-sub
            className="text-base md:text-xl text-white/85 mb-10 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {t("heroSubtitle")}
          </p>
          <div data-hero-search>
            <SearchBar />
          </div>

          <div data-hero-pills className="flex flex-wrap justify-center gap-2 mt-8">
            {HERO_PILLS.map(({ slug, key }) => (
              <Link key={slug} href={`/categories/${slug}`} className="bg-white/15 backdrop-blur-sm text-white border border-white/20 text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/25 transition-colors">
                {t(`pills.${key}`)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white border-b border-surface-container-high">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-surface-container-high">
            {STATS.map((stat, i) => (
              <div
                key={i}
                data-stat-item
                className="flex flex-col items-center justify-center py-6 px-4 text-center"
              >
                <p
                  data-stat-value
                  className="text-2xl md:text-3xl font-extrabold text-primary font-headline leading-none mb-1"
                >
                  {stat.value}
                </p>
                <p className="text-xs text-on-surface-variant font-medium tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section data-categories className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">{t("categoriesSectionLabel")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">{t("categoriesTitle")}</h2>
          </div>
        </div>

        {displayCategories.length === 0 ? (
          <p className="text-center text-on-surface-variant py-12 max-w-md mx-auto leading-relaxed">{t("emptyCategories")}</p>
        ) : (
          <div data-categories-grid className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {displayCategories.map((cat) => (
              <CategoryCard key={cat.slug} name={cat.name} slug={cat.slug} image={cat.image} fallbackImage={cat.fallbackImage} />
            ))}
            <Link
              href={`/categories/${displayCategories[0]?.slug ?? "photography"}`}
              aria-label={t("viewAllAria")}
              className="group relative aspect-square rounded-[8px] overflow-hidden flex flex-col items-center justify-center bg-primary-fixed border-2 border-dashed border-primary/30 hover:bg-primary hover:border-primary transition-colors duration-150"
            >
              <LayoutGrid
                aria-hidden
                className="size-10 text-primary group-hover:text-on-primary mb-3 transition-colors duration-150"
                strokeWidth={1.75}
              />
              <p className="text-primary group-hover:text-on-primary font-bold text-sm text-center leading-tight transition-colors duration-150">
                {t("viewAllLine1")}
                <br />
                {t("viewAllLine2")}
              </p>
              <ArrowRight
                aria-hidden
                className="size-[18px] text-primary group-hover:text-on-primary mt-2 transition-colors duration-150"
                strokeWidth={2}
              />
            </Link>
          </div>
        )}
      </section>

      <section data-how className="bg-surface-container-low py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">{t("howLabel")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">{t("howTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div
              data-how-line
              className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-outline-variant"
            />
            {HOW_KEYS.map((step, i) => (
              <div key={step} data-how-step className="text-center group relative">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md border border-outline-variant/40 mx-auto flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    {step === "1" ? (
                      <Search aria-hidden className="text-primary size-7 group-hover:text-on-primary transition-colors duration-300" strokeWidth={2} />
                    ) : step === "2" ? (
                      <UserCheck aria-hidden className="text-primary size-7 group-hover:text-on-primary transition-colors duration-300" strokeWidth={2} />
                    ) : (
                      <MessageCircle aria-hidden className="text-primary size-7 group-hover:text-on-primary transition-colors duration-300" strokeWidth={2} />
                    )}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-on-primary text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{t(`steps.${step}.title`)}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs mx-auto">{t(`steps.${step}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-featured className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            data-featured-head
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
          >
            <div>
              <span className="section-label">{t("featuredLabel")}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">{t("featuredTitle")}</h2>
            </div>
            <Link href="/search" className="text-primary font-bold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all self-start md:self-auto">
              {t("exploreAll")}
              <ArrowRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            </Link>
          </div>

          {featuredProviders.length === 0 ? (
            <p className="text-center text-on-surface-variant py-12 max-w-md mx-auto leading-relaxed">{t("emptyFeatured")}</p>
          ) : (
            <div data-featured-grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {featuredProviders.map((p) => (
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
          )}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div
          data-newsletter
          className="relative overflow-hidden rounded-xl md:rounded-2xl bg-primary-container text-on-primary-container"
        >
          <div data-glow className="absolute -top-20 -right-20 w-72 h-72 bg-primary rounded-full blur-[80px] opacity-40 pointer-events-none" />
          <div data-glow className="absolute -bottom-16 -left-16 w-56 h-56 bg-secondary-container rounded-full blur-[80px] opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-8 md:p-14">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">{t("newsletterTitle")}</h2>
              <p className="text-base opacity-85 max-w-md leading-relaxed">{t("newsletterSubtitle")}</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
