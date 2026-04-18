import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
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
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "fr", title: "French", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImageUrl",
      title: "Cover image URL",
      type: "url",
      description:
        "Optional. Direct HTTPS image URL (e.g. Unsplash). Used if no uploaded cover above, or as a quick preview.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
          allowRelative: false,
        }),
    }),
  ],
});
