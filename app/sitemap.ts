import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import {
  allProvidersForSitemapQuery,
  allCategoriesForSitemapQuery,
} from "@/lib/sanity/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilehost.mu";

const STATIC_CATEGORIES = [
  "photography",
  "catering",
  "flowers-decoration",
  "music-dj",
  "venues",
  "event-planner",
  "decoration",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/legal/cgu`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/legal/mentions`, lastModified: new Date(), priority: 0.3 },
  ];

  // Static category fallbacks
  const staticCategoryPages: MetadataRoute.Sitemap = STATIC_CATEGORIES.map(
    (slug) => ({
      url: `${BASE_URL}/categories/${slug}`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "weekly" as const,
    })
  );

  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const [providers, categories] = await Promise.all([
      client.fetch<Array<{ slug: string; _updatedAt: string }>>(
        allProvidersForSitemapQuery
      ),
      client.fetch<Array<{ slug: string; _updatedAt: string }>>(
        allCategoriesForSitemapQuery
      ),
    ]);

    const providerPages: MetadataRoute.Sitemap = providers.map((p) => ({
      url: `${BASE_URL}/providers/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    }));

    const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${BASE_URL}/categories/${c.slug}`,
      lastModified: new Date(c._updatedAt),
      priority: 0.9,
      changeFrequency: "weekly" as const,
    }));

    dynamicPages = [...providerPages, ...categoryPages];
  } catch {
    // Sanity not yet configured — use static fallbacks
    dynamicPages = staticCategoryPages;
  }

  return [...staticPages, ...dynamicPages];
}
