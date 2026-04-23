import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_shared";

export const contactContent = defineType({
  name: "contactContent",
  title: "Contact page",
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
      name: "infoTitle",
      title: "Info section title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "fr", title: "French", type: "string" },
      ],
    }),

    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      description: "Public email displayed on the contact page.",
    }),
    defineField({
      name: "whatsappDisplay",
      title: "WhatsApp number (displayed)",
      type: "string",
      description: "e.g. +230 5XXX XXXX",
    }),
    defineField({
      name: "whatsappLink",
      title: "WhatsApp wa.me number",
      type: "string",
      description: "Digits only (international format without +). e.g. 2305XXXXXXX",
    }),
    localizedString("locationValue", "Location (displayed)"),

    defineField({
      name: "cta",
      title: "Sidebar CTA",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localizedString("title", "Title"),
        localizedText("body", "Body", { rows: 3 }),
        localizedString("buttonLabel", "Button label"),
      ],
    }),

    defineField({
      name: "formTitle",
      title: "Form title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "fr", title: "French", type: "string" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact page" };
    },
  },
});
