import { defineField, defineType } from "sanity";

export const provider = defineType({
  name: "provider",
  title: "Provider",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
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
      type: "string",
      description: "Max 120 characters — shown on listing cards",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 6,
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
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      description: "List of services offered",
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
      title: "name",
      subtitle: "location",
      media: "images.0",
    },
  },
});
