"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity/image";

interface ProviderCardProps {
  name: string;
  slug: string;
  shortDescription?: string;
  location?: string;
  rating?: number;
  priceRange?: string;
  images?: Array<{ asset?: { _ref: string } }>;
  fallbackImage?: string;
  categoryLabel?: string;
}

export default function ProviderCard({
  name,
  slug,
  shortDescription,
  location,
  rating,
  priceRange,
  images,
  fallbackImage,
  categoryLabel,
}: ProviderCardProps) {
  const t = useTranslations("providerCard");
  const imageSrc =
    images && images[0]?.asset?._ref
      ? urlFor(images[0]).width(800).height(450).url()
      : fallbackImage ?? null;

  return (
    <article className="card flex flex-col transition-[transform,box-shadow] duration-150 hover:shadow-[0_12px_32px_rgba(34,34,34,0.12)] hover:-translate-y-0.5 group focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-2">
      <div className="relative aspect-video overflow-hidden flex-shrink-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center" aria-hidden="true">
            <span className="material-symbols-outlined text-5xl text-outline">image</span>
          </div>
        )}
        {rating !== undefined && (
          <div
            className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-[36px] flex items-center gap-1 shadow-[0_1px_2px_rgba(34,34,34,0.06)]"
            aria-label={t("ratingAria", { rating: rating.toFixed(1) })}
          >
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}
            >
              star
            </span>
            <span className="text-xs font-bold text-text-primary">{rating.toFixed(1)}</span>
          </div>
        )}
        {priceRange && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-[36px] shadow-[0_1px_2px_rgba(34,34,34,0.06)]">
            <span className="text-xs font-bold text-text-primary">{priceRange}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {categoryLabel && (
          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{categoryLabel}</span>
        )}
        <h3 className="text-lg font-bold text-text-primary mb-1 leading-snug">{name}</h3>
        {shortDescription && (
          <p className="text-text-secondary text-sm line-clamp-2 mb-3 leading-relaxed flex-1">{shortDescription}</p>
        )}
        {location && (
          <div className="flex items-center text-text-secondary text-xs mb-4">
            <span aria-hidden="true" className="material-symbols-outlined mr-1" style={{ fontSize: "14px" }}>
              location_on
            </span>
            {location}
          </div>
        )}
        <Link
          href={`/providers/${slug}`}
          aria-label={t("viewProfileAria", { name })}
          className="btn btn-secondary mt-auto w-full"
        >
          {t("viewProfile")}
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-base transition-transform duration-150 group-hover:translate-x-0.5"
            style={{ fontSize: "16px" }}
          >
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}
