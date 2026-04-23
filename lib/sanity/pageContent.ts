import { groq, type PortableTextBlock } from "next-sanity";
import { client } from "./client";
import type { AppLocale } from "@/i18n/routing";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type LocalizedString = { en?: string; fr?: string } | null | undefined;

export type HomeContent = {
  hero?: {
    badge?: LocalizedString;
    titleLine1?: LocalizedString;
    titleLine2?: LocalizedString;
    subtitle?: LocalizedString;
    backgroundImage?: { asset?: { _ref: string } };
    backgroundImageUrl?: string;
  };
  stats?: {
    categoriesLabel?: LocalizedString;
    verifiedLabel?: LocalizedString;
    browseLabel?: LocalizedString;
    islandWideLabel?: LocalizedString;
  };
  categoriesSection?: { label?: LocalizedString; title?: LocalizedString };
  howItWorks?: {
    label?: LocalizedString;
    title?: LocalizedString;
    step1?: { title?: LocalizedString; desc?: LocalizedString };
    step2?: { title?: LocalizedString; desc?: LocalizedString };
    step3?: { title?: LocalizedString; desc?: LocalizedString };
  };
  featuredSection?: { label?: LocalizedString; title?: LocalizedString };
  newsletter?: { title?: LocalizedString; subtitle?: LocalizedString };
};

export type AboutContent = {
  seo?: { metaTitle?: LocalizedString; metaDescription?: LocalizedString };
  hero?: { title?: LocalizedString; subtitle?: LocalizedString };
  stats?: {
    categoriesLabel?: LocalizedString;
    verifiedLabel?: LocalizedString;
    islandLabel?: LocalizedString;
    browseLabel?: LocalizedString;
  };
  mission?: {
    title?: LocalizedString;
    paragraph1?: LocalizedString;
    paragraph2?: LocalizedString;
  };
  values?: {
    title?: LocalizedString;
    quality?: { title?: LocalizedString; desc?: LocalizedString };
    local?: { title?: LocalizedString; desc?: LocalizedString };
    direct?: { title?: LocalizedString; desc?: LocalizedString };
    mobile?: { title?: LocalizedString; desc?: LocalizedString };
  };
  cta?: {
    title?: LocalizedString;
    subtitle?: LocalizedString;
    exploreLabel?: LocalizedString;
    contactLabel?: LocalizedString;
  };
};

export type ContactContent = {
  seo?: { metaTitle?: LocalizedString; metaDescription?: LocalizedString };
  hero?: { title?: LocalizedString; subtitle?: LocalizedString };
  infoTitle?: LocalizedString;
  email?: string;
  whatsappDisplay?: string;
  whatsappLink?: string;
  locationValue?: LocalizedString;
  cta?: {
    title?: LocalizedString;
    body?: LocalizedString;
    buttonLabel?: LocalizedString;
  };
  formTitle?: LocalizedString;
};

export type LegalPageKey = "cgu" | "privacy" | "mentions";

export type LegalPageContent = {
  key: LegalPageKey;
  seo?: { metaTitle?: LocalizedString; metaDescription?: LocalizedString };
  title?: LocalizedString;
  lastUpdated?: LocalizedString;
  bodyEn?: PortableTextBlock[];
  bodyFr?: PortableTextBlock[];
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Resolve a localized string, falling back to the other locale and then to
 * the translation (or any fallback) provided by the caller.
 */
export function localize(
  field: LocalizedString,
  locale: AppLocale,
  fallback: string,
): string {
  if (!field) return fallback;
  const primary = locale === "fr" ? field.fr : field.en;
  const secondary = locale === "fr" ? field.en : field.fr;
  const value = primary ?? secondary;
  return value && value.trim() ? value : fallback;
}

/** Pick the body matching the locale, otherwise the other locale. */
export function pickLocalizedPortable(
  en: PortableTextBlock[] | undefined,
  fr: PortableTextBlock[] | undefined,
  locale: AppLocale,
): PortableTextBlock[] | undefined {
  const primary = locale === "fr" ? fr : en;
  const secondary = locale === "fr" ? en : fr;
  const hasPrimary = Array.isArray(primary) && primary.length > 0;
  const hasSecondary = Array.isArray(secondary) && secondary.length > 0;
  if (hasPrimary) return primary;
  if (hasSecondary) return secondary;
  return undefined;
}

/* -------------------------------------------------------------------------- */
/*  GROQ queries                                                              */
/* -------------------------------------------------------------------------- */

const homeContentQuery = groq`*[_type == "homeContent"][0]`;
const aboutContentQuery = groq`*[_type == "aboutContent"][0]`;
const contactContentQuery = groq`*[_type == "contactContent"][0]`;
const legalPageQuery = groq`*[_type == "legalPage" && key == $key][0]`;

/* -------------------------------------------------------------------------- */
/*  Fetchers (never throw — always return null if Sanity is unreachable)      */
/* -------------------------------------------------------------------------- */

async function safeFetch<T>(query: string, params?: Record<string, unknown>) {
  try {
    return (await client.fetch<T>(query, params ?? {})) ?? null;
  } catch {
    return null;
  }
}

export function getHomeContent() {
  return safeFetch<HomeContent | null>(homeContentQuery);
}

export function getAboutContent() {
  return safeFetch<AboutContent | null>(aboutContentQuery);
}

export function getContactContent() {
  return safeFetch<ContactContent | null>(contactContentQuery);
}

export function getLegalPageContent(key: LegalPageKey) {
  return safeFetch<LegalPageContent | null>(legalPageQuery, { key });
}
