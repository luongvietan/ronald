import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import {
  allProvidersForSitemapQuery,
  allCategoriesForSitemapQuery,
} from "@/lib/sanity/queries";
import { routing } from "@/i18n/routing";

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

const STATIC_PATHS = ["", "/about", "/contact", "/search", "/legal/cgu", "/legal/privacy", "/legal/mentions"];

function withLocales(
  path: string,
  opts: Omit<MetadataRoute.Sitemap[0], "url">,
): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    ...opts,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    withLocales(path, {
      lastModified: new Date(),
      priority: path === "" ? 1.0 : 0.8,
      changeFrequency: path === "" ? "daily" : "monthly",
    }),
  );

  const staticCategoryPages: MetadataRoute.Sitemap = STATIC_CATEGORIES.flatMap((slug) =>
    withLocales(`/categories/${slug}`, {
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "weekly",
    }),
  );

  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const [providers, categories] = await Promise.all([
      client.fetch<Array<{ slug: string; _updatedAt: string }>>(allProvidersForSitemapQuery),
      client.fetch<Array<{ slug: string; _updatedAt: string }>>(allCategoriesForSitemapQuery),
    ]);

    const providerPages: MetadataRoute.Sitemap = providers.flatMap((p) =>
      routing.locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/providers/${p.slug}`,
        lastModified: new Date(p._updatedAt),
        priority: 0.8,
        changeFrequency: "monthly" as const,
      })),
    );

    const categoryPages: MetadataRoute.Sitemap = categories.flatMap((c) =>
      routing.locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/categories/${c.slug}`,
        lastModified: new Date(c._updatedAt),
        priority: 0.9,
        changeFrequency: "weekly" as const,
      })),
    );

    dynamicPages = [...providerPages, ...categoryPages];
  } catch {
    dynamicPages = staticCategoryPages;
  }

  return [...staticPages, ...dynamicPages];
}
