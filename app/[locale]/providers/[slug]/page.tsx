import { CheckCircle2, ChevronRight, Image as ImagePlaceholder, Mail, MapPin, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { client } from "@/lib/sanity/client";
import { providerBySlugQuery, allProviderSlugsQuery } from "@/lib/sanity/queries";
import { buildProviderGalleryUrls } from "@/lib/sanity/build-provider-gallery";
import ContactForm from "@/components/ContactForm";
import ProviderGalleryHero from "@/components/ProviderGalleryHero";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ilehost.mu";

type Provider = {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  location?: string;
  images?: Array<{ asset?: { _ref: string } }>;
  galleryImageUrls?: string[];
  services?: string[];
  whatsapp?: string;
  email?: string;
  rating?: number;
  priceRange?: string;
  category?: { name: string; slug: string };
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allProviderSlugsQuery);
    return slugs;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const provider: Provider | null = await client.fetch(providerBySlugQuery, {
      slug,
      locale: locale as AppLocale,
    });
    if (!provider) return {};
    return {
      title: provider.name,
      description: provider.shortDescription ?? provider.description,
      alternates: {
        canonical: `/${locale}/providers/${slug}`,
        languages: {
          en: `/en/providers/${slug}`,
          fr: `/fr/providers/${slug}`,
        },
      },
    };
  } catch {
    return {};
  }
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "providerPage" });

  let provider: Provider | null = null;
  try {
    provider = await client.fetch(providerBySlugQuery, { slug, locale: loc });
  } catch {
    /* Sanity not configured */
  }

  if (!provider) notFound();

  const galleryUrls = buildProviderGalleryUrls(provider.images, provider.galleryImageUrls);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    description: provider.shortDescription ?? provider.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: provider.location ?? "Mauritius",
      addressCountry: "MU",
    },
    ...(provider.email && { email: provider.email }),
    ...(provider.whatsapp && { telephone: `+${provider.whatsapp}` }),
    url: `${BASE_URL}/${locale}/providers/${provider.slug}`,
  };

  return (
    <div className="pt-20" data-page="provider">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section data-provider-gallery className="w-full bg-surface-container-lowest">
        {galleryUrls.length > 0 ? (
          <ProviderGalleryHero images={galleryUrls} providerName={provider.name} />
        ) : (
          <div className="h-[280px] md:h-[380px] flex flex-col items-center justify-center bg-surface-container gap-3">
            <ImagePlaceholder aria-hidden className="size-16 text-outline" strokeWidth={1.25} />
            <p className="text-on-surface-variant text-sm">{t("noPhotos")}</p>
          </div>
        )}
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("breadcrumbHome")}
          </Link>
          <ChevronRight aria-hidden className="size-4 text-current shrink-0" strokeWidth={2} />
          {provider.category && (
            <>
              <Link href={`/categories/${provider.category.slug}`} className="hover:text-primary transition-colors">
                {provider.category.name}
              </Link>
              <ChevronRight aria-hidden className="size-4 text-current shrink-0" strokeWidth={2} />
            </>
          )}
          <span className="text-on-surface font-medium">{provider.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div data-provider-head className="mb-8">
              {provider.category && (
                <span className="inline-block bg-primary-fixed text-on-primary-fixed text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {provider.category.name}
                </span>
              )}
              <h1 className="text-4xl font-extrabold text-on-surface mb-3">{provider.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-sm">
                {provider.location && (
                  <div className="flex items-center gap-1">
                    <MapPin aria-hidden className="size-4 shrink-0" strokeWidth={2} />
                    {provider.location}
                  </div>
                )}
                {provider.rating !== undefined && (
                  <div className="flex items-center gap-1" aria-label={t("ratingAria", { rating: provider.rating.toFixed(1) })}>
                    <Star aria-hidden className="size-4 fill-primary stroke-primary text-primary shrink-0" strokeWidth={1.5} />
                    <span className="font-bold text-text-primary">{provider.rating.toFixed(1)}</span>
                  </div>
                )}
                {provider.priceRange && <span className="font-bold text-text-primary">{provider.priceRange}</span>}
              </div>
            </div>

            {provider.description && (
              <div data-provider-about className="mb-10">
                <h2 className="text-xl font-bold text-on-surface mb-4">{t("about")}</h2>
                <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">{provider.description}</p>
              </div>
            )}

            {provider.services && provider.services.length > 0 && (
              <div data-provider-services>
                <h2 className="text-xl font-bold text-on-surface mb-4">{t("services")}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {provider.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 aria-hidden className="text-primary size-5 mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-on-surface">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div
              data-provider-sidebar
              className="bg-surface-container-lowest rounded-[1.5rem] p-7 shadow-md sticky top-24 border border-outline-variant/40"
            >
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t("getInTouch")}</p>
              <h2 className="text-xl font-extrabold text-on-surface mb-5 font-headline">{t("contactName", { name: provider.name })}</h2>

              <div className="flex flex-col gap-3 mb-6">
                {provider.whatsapp && (
                  <a
                    href={`https://wa.me/${provider.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("whatsappAria", { name: provider.name })}
                    className="btn w-full bg-[#25D366] text-white hover:bg-[#1fb85a] active:bg-[#199a4b] shadow-[0_1px_2px_rgba(34,34,34,0.06)]"
                  >
                    <FaWhatsapp aria-hidden className="size-5 shrink-0" />
                    {t("whatsapp")}
                  </a>
                )}

                {provider.email && (
                  <a
                    href={`mailto:${provider.email}`}
                    aria-label={t("emailAria", { name: provider.name })}
                    className="btn btn-secondary w-full border border-border-strong"
                  >
                    <Mail aria-hidden className="size-5 shrink-0" strokeWidth={2} />
                    {t("email")}
                  </a>
                )}
              </div>

              <div className="border-t border-outline-variant pt-6">
                <h3 className="font-bold text-on-surface text-sm mb-4">{t("orMessage")}</h3>
                <ContactForm providerName={provider.name} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
