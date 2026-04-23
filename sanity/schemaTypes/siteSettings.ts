import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_shared";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("siteName", "Site name"),
        localizedText("defaultDescription", "Default meta description", {
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        localizedText("tagline", "Tagline", { rows: 2 }),
        localizedString("copyright", "Copyright (supports {year})"),
        localizedString("madeIn", "Made-in line"),
      ],
    }),
    defineField({
      name: "publisher",
      title: "Publisher (Legal notices)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "company", title: "Company", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
      ],
    }),
    defineField({
      name: "hosting",
      title: "Hosting (Legal notices)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "provider", title: "Provider", type: "string" }),
        defineField({ name: "address", title: "Address", type: "string" }),
        defineField({ name: "website", title: "Website", type: "url" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
