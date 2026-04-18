import { urlFor } from "./image";

/** Build ordered gallery URLs: uploaded Sanity images first, then external HTTPS URLs. */
export function buildProviderGalleryUrls(
  images?: Array<{ asset?: { _ref: string } } | null> | null,
  galleryImageUrls?: string[] | null
): string[] {
  const fromSanity = (images ?? [])
    .filter((img) => img?.asset?._ref)
    .map((img) => urlFor(img!).width(1600).height(900).url());
  const fromUrls = (galleryImageUrls ?? []).filter((u): u is string => typeof u === "string" && u.length > 0);
  return [...fromSanity, ...fromUrls];
}
