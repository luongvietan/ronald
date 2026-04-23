import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_shared";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("metaTitle", "Meta title"),
        localizedText("metaDescription", "Meta description", { rows: 2 }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        localizedString("title", "Title"),
        localizedText("subtitle", "Subtitle", { rows: 3 }),
      ],
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("categoriesLabel", "Service categories label"),
        localizedString("verifiedLabel", "Verified providers label"),
        localizedString("islandLabel", "Island-focused label"),
        localizedString("browseLabel", "To browse label"),
      ],
    }),

    defineField({
      name: "mission",
      title: "Mission",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("title", "Title"),
        localizedText("paragraph1", "Paragraph 1", { rows: 4 }),
        localizedText("paragraph2", "Paragraph 2", { rows: 4 }),
      ],
    }),

    defineField({
      name: "values",
      title: "Values",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("title", "Section title"),
        defineField({
          name: "quality",
          title: "Value — Quality",
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("desc", "Description", { rows: 3 }),
          ],
        }),
        defineField({
          name: "local",
          title: "Value — Local expertise",
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("desc", "Description", { rows: 3 }),
          ],
        }),
        defineField({
          name: "direct",
          title: "Value — Direct connection",
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("desc", "Description", { rows: 3 }),
          ],
        }),
        defineField({
          name: "mobile",
          title: "Value — Mobile-first",
          type: "object",
          fields: [
            localizedString("title", "Title"),
            localizedText("desc", "Description", { rows: 3 }),
          ],
        }),
      ],
    }),

    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("title", "Title"),
        localizedText("subtitle", "Subtitle", { rows: 2 }),
        localizedString("exploreLabel", "Explore button label"),
        localizedString("contactLabel", "Contact button label"),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
