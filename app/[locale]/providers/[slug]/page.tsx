import { client } from "@/lib/sanity/client";
import { providerBySlugQuery, allProviderSlugsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ContactForm from "@/components/ContactForm";
import ProviderAnimations from "@/components/animations/ProviderAnimations";
import Image from "next/image";
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

  const images = provider.images ?? [];
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
      <ProviderAnimations />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="w-full bg-surface-container-lowest">
        {images.length > 0 ? (
          <>
            <div
              data-provider-gallery
              className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 snap-x snap-mandatory scrollbar-none"
            >
              {images.slice(0, 6).map((img, i) => (
                <div key={i} className="relative flex-none w-72 aspect-video rounded overflow-hidden snap-start">
                  {img?.asset?._ref && (
                    <Image
                      src={urlFor(img).width(576).height(324).url()}
                      alt={t("photoAlt", { name: provider!.name, n: i + 1 })}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  )}
                </div>
              ))}
            </div>
            <div data-provider-gallery className="hidden md:grid grid-cols-4 h-[480px] gap-1">
              <div className="col-span-2 row-span-2 relative overflow-hidden">
                {images[0]?.asset?._ref && (
                  <Image
                    src={urlFor(images[0]).width(900).height(900).url()}
                    alt={t("galleryAlt", { name: provider.name })}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                )}
              </div>
              {images.slice(1, 5).map((img, i) => (
                <div key={i} className="relative overflow-hidden">
                  {img?.asset?._ref && (
                    <Image
                      src={urlFor(img).width(450).height(450).url()}
                      alt={t("photoAlt", { name: provider!.name, n: i + 2 })}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-[280px] md:h-[380px] flex flex-col items-center justify-center bg-surface-container gap-3">
            <span className="material-symbols-outlined text-6xl text-outline">image</span>
            <p className="text-on-surface-variant text-sm">{t("noPhotos")}</p>
          </div>
        )}
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("breadcrumbHome")}
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          {provider.category && (
            <>
              <Link href={`/categories/${provider.category.slug}`} className="hover:text-primary transition-colors">
                {provider.category.name}
              </Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
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
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {provider.location}
                  </div>
                )}
                {provider.rating !== undefined && (
                  <div className="flex items-center gap-1" aria-label={t("ratingAria", { rating: provider.rating.toFixed(1) })}>
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
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
                      <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
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
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                      chat
                    </span>
                    {t("whatsapp")}
                  </a>
                )}

                {provider.email && (
                  <a
                    href={`mailto:${provider.email}`}
                    aria-label={t("emailAria", { name: provider.name })}
                    className="btn btn-secondary w-full border border-border-strong"
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                      mail
                    </span>
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
