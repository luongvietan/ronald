import Image from "next/image";
import Link from "next/link";
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
  const imageSrc =
    images && images[0]?.asset?._ref
      ? urlFor(images[0]).width(800).height(450).url()
      : fallbackImage ?? null;

  return (
    <article className="bg-surface-container-lowest rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden flex-shrink-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-outline">
              image
            </span>
          </div>
        )}
        {/* Rating badge */}
        {rating !== undefined && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1">
            <span
              className="material-symbols-outlined text-secondary"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}
            >
              star
            </span>
            <span className="text-xs font-bold text-on-surface">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
        {/* Price badge */}
        {priceRange && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full">
            <span className="text-xs font-bold text-secondary">{priceRange}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {categoryLabel && (
          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
            {categoryLabel}
          </span>
        )}
        <h3 className="text-lg font-bold text-on-surface mb-1 leading-snug">
          {name}
        </h3>
        {shortDescription && (
          <p className="text-on-surface-variant text-sm line-clamp-2 mb-3 leading-relaxed flex-1">
            {shortDescription}
          </p>
        )}
        {location && (
          <div className="flex items-center text-on-surface-variant text-xs mb-4">
            <span
              className="material-symbols-outlined mr-1"
              style={{ fontSize: "14px" }}
            >
              location_on
            </span>
            {location}
          </div>
        )}
        <Link
          href={`/providers/${slug}`}
          className="block w-full py-2.5 rounded-full bg-surface-container-high font-bold text-on-surface text-center text-sm hover:bg-primary hover:text-on-primary transition-colors mt-auto"
        >
          View profile
        </Link>
      </div>
    </article>
  );
}
