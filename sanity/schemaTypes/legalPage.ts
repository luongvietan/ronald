import { defineField, defineType } from "sanity";
import { localizedString, portableBlockContent } from "./_shared";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Page key",
      type: "string",
      description: "Identifies which legal route this document represents.",
      options: {
        list: [
          { title: "Terms of Use (CGU)", value: "cgu" },
          { title: "Privacy Policy", value: "privacy" },
          { title: "Legal Notices", value: "mentions" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("metaTitle", "Meta title"),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "text", rows: 2 },
            { name: "fr", title: "French", type: "text", rows: 2 },
          ],
        }),
      ],
    }),

    localizedString("title", "Page title"),

    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "object",
      description: "Short notice shown below the title.",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "fr", title: "French", type: "string" },
      ],
    }),

    defineField({
      name: "bodyEn",
      title: "Body (English)",
      type: "array",
      of: portableBlockContent,
    }),
    defineField({
      name: "bodyFr",
      title: "Body (French)",
      type: "array",
      of: portableBlockContent,
    }),
  ],
  preview: {
    select: {
      key: "key",
      titleEn: "title.en",
      titleFr: "title.fr",
    },
    prepare({ key, titleEn, titleFr }) {
      const label =
        key === "cgu"
          ? "Terms of Use"
          : key === "privacy"
            ? "Privacy Policy"
            : key === "mentions"
              ? "Legal Notices"
              : "Legal page";
      return {
        title: label,
        subtitle: titleEn || titleFr || "",
      };
    },
  },
});
