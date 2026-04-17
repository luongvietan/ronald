import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";
import NewsletterForm from "@/components/NewsletterForm";
import { client } from "@/lib/sanity/client";
import { featuredProvidersQuery, categoriesQuery } from "@/lib/sanity/queries";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

const STATIC_CATEGORY_SLUGS = [
  { slug: "photography", key: "photography" as const, fallbackImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
  { slug: "catering", key: "catering" as const, fallbackImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
  { slug: "flowers-decoration", key: "flowersDecoration" as const, fallbackImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80" },
  { slug: "music-dj", key: "musicDj" as const, fallbackImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" },
  { slug: "venues", key: "venues" as const, fallbackImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
  { slug: "event-planner", key: "eventPlanner" as const, fallbackImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80" },
  { slug: "decoration", key: "decoration" as const, fallbackImage: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80" },
];

const HERO_PILLS: { slug: string; key: "photography" | "venues" | "catering" | "musicDj" }[] = [
  { slug: "photography", key: "photography" },
  { slug: "venues", key: "venues" },
  { slug: "catering", key: "catering" },
  { slug: "music-dj", key: "musicDj" },
];

const DEMO_EN = [
  { name: "Culinaria Mauritius", slug: "culinaria-mauritius", shortDescription: "Gourmet catering specialists for premium weddings and corporate events.", location: "Beau Plan, Pamplemousses", rating: 4.9, fallbackImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
  { name: "Oceanic Frames", slug: "oceanic-frames", shortDescription: "Capturing timeless moments on Mauritius's most breathtaking coastlines.", location: "Tamarin, Black River", rating: 5.0, fallbackImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" },
  { name: "Elite Event Design", slug: "elite-event-design", shortDescription: "Luxury floral and décor transformations for weddings and galas island-wide.", location: "Ebene, Mauritius", rating: 4.8, fallbackImage: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80" },
];

const DEMO_FR = [
  { name: "Culinaria Mauritius", slug: "culinaria-mauritius", shortDescription: "Traiteur gastronomique pour mariages haut de gamme et événements d'entreprise.", location: "Beau Plan, Pamplemousses", rating: 4.9, fallbackImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
  { name: "Oceanic Frames", slug: "oceanic-frames", shortDescription: "Des instants intemporels sur les plus beaux rivages de Maurice.", location: "Tamarin, Rivière Noire", rating: 5.0, fallbackImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" },
  { name: "Elite Event Design", slug: "elite-event-design", shortDescription: "Fleurs et décoration de luxe pour mariages et galas dans toute l'île.", location: "Ebène, Maurice", rating: 4.8, fallbackImage: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80" },
];

type SanityCategory = { _id: string; name: string; slug: string; image?: { asset?: { _ref: string } } };
type SanityProvider = { _id: string; name: string; slug: string; shortDescription?: string; location?: string; rating?: number; priceRange?: string; images?: Array<{ asset?: { _ref: string } }> };

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

  const displayCategories =
    categories.length > 0
      ? categories.map((c) => ({ name: c.name, slug: c.slug, image: c.image, fallbackImage: undefined as string | undefined }))
      : STATIC_CATEGORY_SLUGS.map((c) => ({
          name: t(`fallbackCategories.${c.key}`),
          slug: c.slug,
          image: undefined as { asset?: { _ref: string } } | undefined,
          fallbackImage: c.fallbackImage,
        }));

  const showDemoProviders = featuredProviders.length === 0;
  const demoProviders = loc === "fr" ? DEMO_FR : DEMO_EN;

  const STATS = [
    { value: "7+", label: t("stats.categories") },
    { value: "100%", label: t("stats.verified") },
    { value: loc === "fr" ? "Gratuit" : "Free", label: t("stats.browse") },
    { value: loc === "fr" ? "Maurice" : "Mauritius", label: t("stats.islandWide") },
  ];

  const HOW_KEYS = ["1", "2", "3"] as const;

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[640px] md:min-h-[820px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-16">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 border border-white/20 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            {t("heroBadge")}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-5 tracking-tight leading-[1.1]">
            {t("heroTitleLine1")}
            <br className="hidden md:block" /> {t("heroTitleLine2")}
          </h1>
          <p className="text-base md:text-xl text-white/85 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <SearchBar />

          <div className="flex flex-wrap justify-center gap-2 mt-8">
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
              <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-primary font-headline leading-none mb-1">{stat.value}</p>
                <p className="text-xs text-on-surface-variant font-medium tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">{t("categoriesSectionLabel")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">{t("categoriesTitle")}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {displayCategories.map((cat) => (
            <CategoryCard key={cat.slug} name={cat.name} slug={cat.slug} image={cat.image} fallbackImage={cat.fallbackImage} />
          ))}
          <Link
            href="/categories/photography"
            aria-label={t("viewAllAria")}
            className="group relative aspect-square rounded-[8px] overflow-hidden flex flex-col items-center justify-center bg-primary-fixed border-2 border-dashed border-primary/30 hover:bg-primary hover:border-primary transition-colors duration-150"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary mb-3 transition-colors duration-150">
              grid_view
            </span>
            <p className="text-primary group-hover:text-on-primary font-bold text-sm text-center leading-tight transition-colors duration-150">
              {t("viewAllLine1")}
              <br />
              {t("viewAllLine2")}
            </p>
            <span aria-hidden="true" className="material-symbols-outlined text-primary group-hover:text-on-primary mt-2 transition-colors duration-150" style={{ fontSize: "18px" }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-surface-container-low py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">{t("howLabel")}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">{t("howTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-outline-variant" />
            {HOW_KEYS.map((step, i) => (
              <div key={step} className="text-center group relative">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md border border-outline-variant/40 mx-auto flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-on-primary transition-colors duration-300">
                      {step === "1" ? "search" : step === "2" ? "person_check" : "chat"}
                    </span>
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

      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">{t("featuredLabel")}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">{t("featuredTitle")}</h2>
            </div>
            <Link href="/categories/photography" className="text-primary font-bold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all self-start md:self-auto">
              {t("exploreAll")}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {showDemoProviders
              ? demoProviders.map((p) => (
                  <ProviderCard key={p.slug} name={p.name} slug={p.slug} shortDescription={p.shortDescription} location={p.location} rating={p.rating} fallbackImage={p.fallbackImage} />
                ))
              : featuredProviders.map((p) => (
                  <ProviderCard key={p._id} name={p.name} slug={p.slug} shortDescription={p.shortDescription} location={p.location} rating={p.rating} priceRange={p.priceRange} images={p.images} />
                ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-primary-container text-on-primary-container">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary rounded-full blur-[80px] opacity-40 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-secondary-container rounded-full blur-[80px] opacity-30 pointer-events-none" />

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
