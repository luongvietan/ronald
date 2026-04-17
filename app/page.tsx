import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";
import { client } from "@/lib/sanity/client";
import { featuredProvidersQuery, categoriesQuery } from "@/lib/sanity/queries";

/* ─── Static fallback data ──────────────────────────────────── */
const STATIC_CATEGORIES = [
  { name: "Photography", slug: "photography", fallbackImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
  { name: "Catering", slug: "catering", fallbackImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
  { name: "Flowers & Decoration", slug: "flowers-decoration", fallbackImage: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80" },
  { name: "Music / DJ", slug: "music-dj", fallbackImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" },
  { name: "Venues", slug: "venues", fallbackImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
  { name: "Event Planner", slug: "event-planner", fallbackImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80" },
  { name: "Decoration", slug: "decoration", fallbackImage: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80" },
];

const DEMO_PROVIDERS = [
  { name: "Culinaria Mauritius", slug: "culinaria-mauritius", shortDescription: "Gourmet catering specialists for premium weddings and corporate events.", location: "Beau Plan, Pamplemousses", rating: 4.9, fallbackImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
  { name: "Oceanic Frames", slug: "oceanic-frames", shortDescription: "Capturing timeless moments on Mauritius's most breathtaking coastlines.", location: "Tamarin, Black River", rating: 5.0, fallbackImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" },
  { name: "Elite Event Design", slug: "elite-event-design", shortDescription: "Luxury floral and décor transformations for weddings and galas island-wide.", location: "Ebene, Mauritius", rating: 4.8, fallbackImage: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80" },
];

const STATS = [
  { value: "7+", label: "Categories" },
  { value: "100%", label: "Verified" },
  { value: "Free", label: "To browse" },
  { value: "Mauritius", label: "Island-wide" },
];

const HOW_IT_WORKS = [
  { icon: "search", step: "01", title: "Search & Browse", desc: "Explore providers by category, location, or keyword." },
  { icon: "person_check", step: "02", title: "View Profiles", desc: "Browse galleries, read descriptions, and compare prices." },
  { icon: "chat", step: "03", title: "Contact Directly", desc: "Reach out via WhatsApp or the contact form instantly." },
];

type SanityCategory = { _id: string; name: string; slug: string; image?: { asset?: { _ref: string } } };
type SanityProvider = { _id: string; name: string; slug: string; shortDescription?: string; location?: string; rating?: number; priceRange?: string; images?: Array<{ asset?: { _ref: string } }> };

export default async function HomePage() {
  let featuredProviders: SanityProvider[] = [];
  let categories: SanityCategory[] = [];

  try {
    [featuredProviders, categories] = await Promise.all([
      client.fetch(featuredProvidersQuery),
      client.fetch(categoriesQuery),
    ]);
  } catch { /* Sanity not yet configured */ }

  const displayCategories = categories.length > 0
    ? categories.map((c) => ({ name: c.name, slug: c.slug, image: c.image, fallbackImage: undefined as string | undefined }))
    : STATIC_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug, image: undefined as { asset?: { _ref: string } } | undefined, fallbackImage: c.fallbackImage }));

  const showDemoProviders = featuredProviders.length === 0;

  return (
    <div className="overflow-hidden">

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[640px] md:min-h-[820px] w-full flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury beach wedding setup in Mauritius"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-16">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 border border-white/20 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Mauritius — Indian Ocean
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-5 tracking-tight leading-[1.1]">
            Find the perfect<br className="hidden md:block" /> services for your event
          </h1>
          <p className="text-base md:text-xl text-white/85 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
            Curated local experts for weddings, galas, and intimate celebrations across the island.
          </p>
          <SearchBar />

          {/* Quick category pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Photography", "Venues", "Catering", "Music / DJ"].map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase().replace(/ \/ /g, "-").replace(/ /g, "-")}`}
                className="bg-white/15 backdrop-blur-sm text-white border border-white/20 text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/25 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats bar ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-surface-container-high">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-surface-container-high">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-primary font-headline leading-none mb-1">{stat.value}</p>
                <p className="text-xs text-on-surface-variant font-medium tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Categories ────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">What are you looking for?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">
              Explore by Category
            </h2>
          </div>
        </div>

        {/* 4-col grid: 7 category cards + 1 "View all" CTA card = perfect 4×2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {displayCategories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              image={cat.image}
              fallbackImage={cat.fallbackImage}
            />
          ))}
          {/* 8th slot — View all CTA */}
          <Link
            href="/categories/photography"
            className="group relative aspect-square rounded overflow-hidden flex flex-col items-center justify-center bg-primary-fixed border-2 border-dashed border-primary/30 hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary mb-3 transition-colors duration-300">
              grid_view
            </span>
            <p className="text-primary group-hover:text-on-primary font-bold text-sm text-center leading-tight transition-colors duration-300">
              View all<br />categories
            </p>
            <span className="material-symbols-outlined text-primary group-hover:text-on-primary mt-2 transition-colors duration-300" style={{ fontSize: "18px" }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </section>

      {/* ─── How it works ──────────────────────────────────────── */}
      <section className="bg-surface-container-low py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">Simple process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">
              How it works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-outline-variant" />

            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="text-center group relative">
                {/* Step number badge */}
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md border border-outline-variant/40 mx-auto flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-on-primary transition-colors duration-300">
                      {step.icon}
                    </span>
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-on-primary text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{step.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Providers ────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label">Top-rated in Mauritius</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">
                Featured Providers
              </h2>
            </div>
            <Link href="/categories/photography" className="text-primary font-bold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all self-start md:self-auto">
              Explore all providers
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {showDemoProviders
              ? DEMO_PROVIDERS.map((p) => (
                  <ProviderCard
                    key={p.slug}
                    name={p.name}
                    slug={p.slug}
                    shortDescription={p.shortDescription}
                    location={p.location}
                    rating={p.rating}
                    fallbackImage={p.fallbackImage}
                  />
                ))
              : featuredProviders.map((p) => (
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
        </div>
      </section>

      {/* ─── Newsletter CTA ─────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-primary-container text-on-primary-container">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary rounded-full blur-[80px] opacity-40 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-secondary-container rounded-full blur-[80px] opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-8 md:p-14">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">
                Plan your island dream event
              </h2>
              <p className="text-base opacity-85 max-w-md leading-relaxed">
                Get exclusive access to the best providers and planning guides for Mauritius.
              </p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 bg-white/15 border border-white/25 text-white placeholder:text-white/55 rounded-full px-6 py-3.5 focus:ring-2 focus:ring-white outline-none text-sm"
              />
              <button className="bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap shadow-lg">
                Join Us
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
