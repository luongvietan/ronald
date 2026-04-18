import { defineField, defineType } from "sanity";

export const provider = defineType({
  name: "provider",
  title: "Provider",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "fr", title: "French", type: "string" },
      ],
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val || typeof val !== "object") return "Name is required";
          const o = val as { en?: string; fr?: string };
          if (!o.en?.trim() && !o.fr?.trim()) {
            return "Enter at least English or French";
          }
          return true;
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          description: "Max 120 characters — listing cards",
          validation: (Rule) => Rule.max(120),
        },
        {
          name: "fr",
          title: "French",
          type: "string",
          validation: (Rule) => Rule.max(120),
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 6 },
        { name: "fr", title: "French", type: "text", rows: 6 },
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Grand Baie, Mauritius",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "galleryImageUrls",
      title: "Gallery image URLs",
      type: "array",
      of: [
        {
          type: "url",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["https"],
              allowRelative: false,
            }),
        },
      ],
      description:
        "Optional. One or more direct HTTPS image URLs. Shown in the gallery together with uploaded images (URLs after uploads).",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "fr",
          title: "French",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
      description: "List of services offered (per language)",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      description: "International format without + (e.g. 23052312345)",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "priceRange",
      title: "Price Range",
      type: "string",
      options: {
        list: ["€", "€€", "€€€", "€€€€"],
      },
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "0 to 5",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      titleEn: "name.en",
      titleFr: "name.fr",
      subtitle: "location",
      media: "images.0",
    },
    prepare({ titleEn, titleFr, subtitle, media }) {
      return {
        title: titleEn || titleFr || "Untitled",
        subtitle,
        media,
      };
    },
  },
});
