import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_shared";

export const homeContent = defineType({
  name: "homeContent",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Homepage",
      readOnly: true,
      hidden: true,
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        localizedString("badge", "Badge"),
        localizedString("titleLine1", "Title line 1"),
        localizedString("titleLine2", "Title line 2"),
        localizedText("subtitle", "Subtitle", { rows: 3 }),
        defineField({
          name: "backgroundImage",
          title: "Background image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "backgroundImageUrl",
          title: "Background image URL (fallback)",
          type: "url",
          description: "Used if no image is uploaded above.",
          validation: (Rule) =>
            Rule.uri({ scheme: ["https"], allowRelative: false }),
        }),
      ],
    }),

    defineField({
      name: "stats",
      title: "Stats strip",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("categoriesLabel", "Categories label"),
        localizedString("verifiedLabel", "Verified label"),
        localizedString("browseLabel", "Browse label"),
        localizedString("islandWideLabel", "Island-wide label"),
      ],
    }),

    defineField({
      name: "categoriesSection",
      title: "Categories section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("label", "Label"),
        localizedString("title", "Title"),
      ],
    }),

    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("label", "Label"),
        localizedString("title", "Title"),
        defineField({
          name: "step1",
          title: "Step 1",
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("desc", "Description", { rows: 2 }),
          ],
        }),
        defineField({
          name: "step2",
          title: "Step 2",
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("desc", "Description", { rows: 2 }),
          ],
        }),
        defineField({
          name: "step3",
          title: "Step 3",
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("desc", "Description", { rows: 2 }),
          ],
        }),
      ],
    }),

    defineField({
      name: "featuredSection",
      title: "Featured providers section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("label", "Label"),
        localizedString("title", "Title"),
      ],
    }),

    defineField({
      name: "newsletter",
      title: "Newsletter block",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("title", "Title"),
        localizedText("subtitle", "Subtitle", { rows: 2 }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
