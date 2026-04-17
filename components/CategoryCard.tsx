"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity/image";

interface CategoryCardProps {
  name: string;
  slug: string;
  image?: { asset?: { _ref: string } };
  fallbackImage?: string;
  className?: string;
}

export default function CategoryCard({
  name,
  slug,
  image,
  fallbackImage,
  className = "",
}: CategoryCardProps) {
  const t = useTranslations("categoryCard");
  const imageSrc = image?.asset?._ref ? urlFor(image).width(600).height(600).url() : fallbackImage ?? null;

  return (
    <Link
      href={`/categories/${slug}`}
      aria-label={t("browseAria", { name })}
      className={`group relative aspect-square rounded-[8px] overflow-hidden block bg-surface-container-high focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${className}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      ) : (
        <div className="w-full h-full bg-surface-container-high" aria-hidden="true" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-150 group-hover:from-black/85"
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <p className="text-white font-bold text-lg font-headline leading-tight">{name}</p>
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-white text-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150"
        >
          arrow_forward
        </span>
      </div>
    </Link>
  );
}
