import { groq } from "next-sanity";

/** Localized string: object {en,fr} or legacy string */
const L = (field: string) => /* groq */ `
  coalesce(
    select(
      defined(${field}.en) || defined(${field}.fr) =>
        select($locale == "fr" => coalesce(${field}.fr, ${field}.en), coalesce(${field}.en, ${field}.fr))
    ),
    ${field}
  )
`;

const sortName = /* groq */ `coalesce(name.en, name.fr, name)`;

const catName = /* groq */ `
  coalesce(
    select(
      defined(name.en) || defined(name.fr) =>
        select($locale == "fr" => coalesce(name.fr, name.en), coalesce(name.en, name.fr))
    ),
    name
  )
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(${sortName} asc) {
    _id,
    "name": ${catName},
    "slug": slug.current,
    "description": ${L("description")},
    image,
    coverImageUrl
  }
`;

export const providersByCategoryQuery = groq`
  *[_type == "provider"
    && category->slug.current == $slug
    && ($location == "" || location match ("*" + $location + "*"))
    && ($q == "" ||
      coalesce(name.en, name) match ($q + "*") ||
      coalesce(name.fr, name.en, name) match ($q + "*") ||
      coalesce(shortDescription.en, shortDescription) match ($q + "*") ||
      coalesce(shortDescription.fr, shortDescription.en, shortDescription) match ($q + "*")
    )
  ] | order(featured desc, rating desc, ${sortName} asc) {
    _id,
    "name": ${L("name")},
    "slug": slug.current,
    "shortDescription": ${L("shortDescription")},
    location,
    images,
    galleryImageUrls,
    rating,
    priceRange,
    category->{ "name": ${catName}, "slug": slug.current }
  }
`;

export const searchProvidersQuery = groq`
  *[_type == "provider"
    && ($q == "" ||
      coalesce(name.en, name) match ($q + "*") ||
      coalesce(name.fr, name.en, name) match ($q + "*") ||
      coalesce(shortDescription.en, shortDescription) match ($q + "*") ||
      coalesce(shortDescription.fr, shortDescription.en, shortDescription) match ($q + "*") ||
      location match ($q + "*")
    )
    && ($location == "" || location match ("*" + $location + "*"))
    && ($category == "" || category->slug.current == $category)
  ] | order(featured desc, rating desc, ${sortName} asc) {
    _id,
    "name": ${L("name")},
    "slug": slug.current,
    "shortDescription": ${L("shortDescription")},
    location,
    images,
    galleryImageUrls,
    rating,
    priceRange,
    category->{ "name": ${catName}, "slug": slug.current }
  }
`;

export const providerBySlugQuery = groq`
  *[_type == "provider" && slug.current == $slug][0] {
    _id,
    "name": ${L("name")},
    "slug": slug.current,
    "shortDescription": ${L("shortDescription")},
    "description": ${L("description")},
    location,
    images,
    galleryImageUrls,
    "services": select(
      defined(services.en) || defined(services.fr) =>
        select($locale == "fr" => coalesce(services.fr, services.en), coalesce(services.en, services.fr)),
      services
    ),
    whatsapp,
    email,
    rating,
    priceRange,
    category->{ "name": ${catName}, "slug": slug.current }
  }
`;

export const featuredProvidersQuery = groq`
  *[_type == "provider" && featured == true][0...3] {
    _id,
    "name": ${L("name")},
    "slug": slug.current,
    "shortDescription": ${L("shortDescription")},
    location,
    images,
    galleryImageUrls,
    rating,
    priceRange,
    category->{ "name": ${catName}, "slug": slug.current }
  }
`;

export const allProviderSlugsQuery = groq`
  *[_type == "provider"] { "slug": slug.current }
`;

export const allCategorySlugsQuery = groq`
  *[_type == "category"] { "slug": slug.current }
`;

export const allProvidersForSitemapQuery = groq`
  *[_type == "provider"] {
    "slug": slug.current,
    _updatedAt
  }
`;

export const allCategoriesForSitemapQuery = groq`
  *[_type == "category"] {
    "slug": slug.current,
    _updatedAt
  }
`;
