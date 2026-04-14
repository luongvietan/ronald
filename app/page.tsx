import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";
import { client } from "@/lib/sanity/client";
import {
  featuredProvidersQuery,
  categoriesQuery,
} from "@/lib/sanity/queries";

// Fallback categories shown before Sanity is seeded
const STATIC_CATEGORIES = [
  {
    name: "Photography",
    slug: "photography",
    fallbackImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiiArF6KD-TbHoympV0U_yTrtVSuuxkH28_2dK7r4Ts-yruk_S2D3I-iObad6cZCcBP2lVgZl_oYICkG2nlAX88I40t_k5B9w7rh-MXKzuFIglso2P0J1ofiR5R0keE6DD_ISe2IyvPlNf8w_va3U4BJ2ard2ax3EEQhzG8Zqs2gzDuK0Alz9ZrGd0wHGyCmhFTozTiXfl4cn-vX4xSkHRE9TECPzuNS9bQwGdPEhWz0hDuQcG4dvh1M1HKXgbbqmTvmJcncalUbwN",
  },
  {
    name: "Catering",
    slug: "catering",
    fallbackImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSPY4ynTrF1wCOpmpES82-c9veW9_vGW-AMT1Slx_onRSpAVzJt4tpFG0DnPjCYCV3txLAAW7c5E3-c4Dpde4yi1FVTV0NPbeXEIix5Oa6BQDcleFAGO1HEBRvWCnYchbj9kE5KTDKCcyFdhhmxhfsMYcIIORWs-gHmK0Dy1ltxatn9c9GzRVI-pZupYIAo411fIrXyQsOjYBZTxJhtqy6s-PgTNrt42mg7zsbkrDDzrsFadPCAlotQHlCmUITffhY0LHUYgBl1N6c",
  },
  {
    name: "Flowers & Decoration",
    slug: "flowers-decoration",
    fallbackImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDx0nXhwvTetCL4cmojJrsYqhdFlPQHDDcSiH4CjBVLy669-oGwcGTRYxf3DWRw3JxiWaZ3cORatYev0fB94lO8yLhB2cu_srCXhiQ2_JEQTea-jPWVdZ6ZtlGtZLWCIb8ZiNvxtKDylYjcuBV69xq5OYa3d2SUXN_qbmQ1M78lgk918xIxo3ecZLs-Hk7hbQ6VhdFHGYeTv6YVBPaLmq5KaKZpx8IrITgfrLUm_Uqe5nyUKZuE-B9OrfR7PhZVPD51o_FFXqoC44kG",
  },
  {
    name: "Music / DJ",
    slug: "music-dj",
    fallbackImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD01z4NVRwAtNt50DvLGIfoWcTa5HYcK2cYNUJNPFe-bbepIBfLxAi7L2_v5pHMFekkSr4BuJ1hd8ODoAOv-ScrcgrMKzWBpoBK4T44_EuTxG157vR9BaaJf_PXnTaaLwAuSCJbULHIvUW52TK4saeL4Mj-YbPvX66SWbePWtzLWi3kolYpv-oTcfgw9Zg5pMH2YEuQI0C2tz6TQnBTRmqiKIfRO981h_NH_-sIjhW4rQ5f_8Qb4-8rsfupfp8mcjhJcDIZY_BzpBBY",
  },
  {
    name: "Venues",
    slug: "venues",
    fallbackImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIcuFM7iUcekGQN-q8Xs3IBb4BRAkG0ij9Z42UXZGsMUgLKpxTtsbflyTGqeKrwfZlAQOLLEYe12BfUldWl3CVjsR8xKbVUgy5DPEq9qaaOqvllXhjAmI2BXge-oQBUObh6xu3e5Umlfq3FXyUlxUrOOoUFWsbWTZEvhOmL6OEBSJnSYEIYBESwP-X_ndEdfeeAUvt64Vg7KLaSFY3jVbogqDjeAoxwaTaQMdm1i6EQHwdOBKdEQpYTvmA-MW0v_QSp62Kb48atgI3",
  },
  {
    name: "Event Planner",
    slug: "event-planner",
    fallbackImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCa46dzPf1yB75NFJRz8gB4q-REJXkiJc0EQZN6ocM3iG3ImXGv308iwgNNMpz9NUWrJXtEpoiW2wdKtwFGFc-kNoHFtij-jNoid9IQtue-hpEgRZpeg9LWJkfpQ2DwJc4bB-OKCepGuUtCPK9NFAipUqoQe88l3qnwVzYvPMOFviJYwShwZWLcaNZU8TGxIVvGr7xF-8uGmfj7Gj6mc4Kj9g-3NcsYR_wBL_NtBgmnl_B9Rkk7Px_0jTk-I1qYFHgrGwkHGTmNRx99",
  },
  {
    name: "Decoration",
    slug: "decoration",
    fallbackImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANp07CV-QImGcjGea57oE5STbT81aHOV0s37pS1pw_tCrGQ2jrPUV9rFtZ1p7afWI5FFppOEFv0MqmhHTTQMbWlXz4L64ViatP0AQb0bK1oGKiDAqCk9YhzUUDTkWMJqkvTNBu6X1UT9X_7zx1zt9mOXQaRxWjH4UlB5YSHoVyEyeesbfdEeS-fZ-Gu5K8bnaiyBoSHiM4WpvSGobeUTEYcdJSQAIs4Hg9p5Yy1YR_AO27--zEvVxea0XBjJ7ZgI1UMTU48fHA6qSl",
  },
];

type SanityCategory = {
  _id: string;
  name: string;
  slug: string;
  image?: { asset?: { _ref: string } };
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
};

export default async function HomePage() {
  let featuredProviders: SanityProvider[] = [];
  let categories: SanityCategory[] = [];

  try {
    [featuredProviders, categories] = await Promise.all([
      client.fetch(featuredProvidersQuery),
      client.fetch(categoriesQuery),
    ]);
  } catch {
    // Sanity not yet configured — fall back to static data
  }

  const displayCategories =
    categories.length > 0
      ? categories.map((c) => ({
          name: c.name,
          slug: c.slug,
          image: c.image,
          fallbackImage: undefined as string | undefined,
        }))
      : STATIC_CATEGORIES.map((c) => ({
          name: c.name,
          slug: c.slug,
          image: undefined as { asset?: { _ref: string } } | undefined,
          fallbackImage: c.fallbackImage,
        }));

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[819px] w-full flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1UIxBjfPNrLYRWHngEVO9bLwfJFugLFPldM7gJs7DA-eDEVZyFaJRUh8iv3ryoOODRXCVAbLF-eG8TCSOqcAVlLoacKJCr3o8dV8FFsdpwx0drhyZ-8Yk3J29tkZaH_EWe2xfHJVaqTW2_12Xod1QYNlQkwg0BHI9lSsUKklyk6GlMQvzPNLt87RqXELs0oZmgwg93Q-YoDt91wE3cEJQdX2dE-wX2b4eJFRc_LnbR0nVTRxUkRf8NurOBcshoiNCFEkzAgdvALNM"
            alt="Luxury beach wedding in Mauritius"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Find the perfect services for your event
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-medium">
            Curated local experts for weddings, galas, and intimate celebrations
            in Mauritius.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
              Curation
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">
              Explore by Category
            </h2>
          </div>
          <div className="hidden md:block h-[2px] flex-1 bg-surface-container-high mx-12 mb-4" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              image={cat.image}
              fallbackImage={cat.fallbackImage}
              className={i === 6 ? "md:col-span-2 lg:col-span-1" : ""}
            />
          ))}
        </div>
      </section>

      {/* Featured Providers */}
      {featuredProviders.length > 0 && (
        <section className="bg-surface-container-low py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface">
                Featured Providers
              </h2>
              <a
                href="/categories/photography"
                className="text-primary font-bold flex items-center gap-1 hover:underline"
              >
                Explore all{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="bg-primary-container rounded p-12 relative overflow-hidden text-on-primary-container flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-30 -mr-32 -mt-32" />
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Plan your island dream event
            </h2>
            <p className="text-lg opacity-90 max-w-lg">
              Get exclusive access to the best providers and planning guides for
              Mauritius.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 relative z-10">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-full px-8 py-4 min-w-[300px] focus:ring-2 focus:ring-white outline-none"
            />
            <button className="bg-white text-primary font-bold px-10 py-4 rounded-full hover:scale-105 transition-all">
              Join Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
