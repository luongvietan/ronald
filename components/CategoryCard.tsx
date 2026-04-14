import Image from "next/image";
import Link from "next/link";
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
  const imageSrc =
    image?.asset?._ref
      ? urlFor(image).width(600).height(600).url()
      : fallbackImage ?? null;

  return (
    <Link
      href={`/categories/${slug}`}
      className={`group relative aspect-square rounded overflow-hidden cursor-pointer block ${className}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      ) : (
        <div className="w-full h-full bg-surface-container-high" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/85" />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <p className="text-white font-bold text-lg font-headline leading-tight">{name}</p>
        <span className="material-symbols-outlined text-white text-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          arrow_forward
        </span>
      </div>
    </Link>
  );
}
