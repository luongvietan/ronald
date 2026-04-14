import { groq } from "next-sanity";

export const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image
  }
`;

export const providersByCategoryQuery = groq`
  *[_type == "provider"
    && category->slug.current == $slug
    && ($location == "" || location match ("*" + $location + "*"))
    && ($q == "" || name match ($q + "*") || shortDescription match ($q + "*"))
  ] | order(featured desc, rating desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    location,
    images,
    rating,
    priceRange,
    category->{ name, "slug": slug.current }
  }
`;

export const searchProvidersQuery = groq`
  *[_type == "provider"
    && ($q == "" || name match ($q + "*") || shortDescription match ($q + "*") || location match ($q + "*"))
    && ($location == "" || location match ("*" + $location + "*"))
    && ($category == "" || category->slug.current == $category)
  ] | order(featured desc, rating desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    location,
    images,
    rating,
    priceRange,
    category->{ name, "slug": slug.current }
  }
`;

export const providerBySlugQuery = groq`
  *[_type == "provider" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    description,
    location,
    images,
    services,
    whatsapp,
    email,
    rating,
    priceRange,
    category->{ name, "slug": slug.current }
  }
`;

export const featuredProvidersQuery = groq`
  *[_type == "provider" && featured == true][0...3] {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    location,
    images,
    rating,
    priceRange,
    category->{ name, "slug": slug.current }
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
