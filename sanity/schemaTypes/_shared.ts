import { defineField, type FieldDefinition } from "sanity";

/** Localized short string ({en, fr}). */
export function localizedString(
  name: string,
  title: string,
  opts: { description?: string; rows?: number } = {},
): FieldDefinition<"object"> {
  return defineField({
    name,
    title,
    type: "object",
    description: opts.description,
    fields: [
      { name: "en", title: "English", type: "string" },
      { name: "fr", title: "French", type: "string" },
    ],
  });
}

/** Localized long text ({en, fr}). */
export function localizedText(
  name: string,
  title: string,
  opts: { description?: string; rows?: number } = {},
): FieldDefinition<"object"> {
  const rows = opts.rows ?? 4;
  return defineField({
    name,
    title,
    type: "object",
    description: opts.description,
    fields: [
      { name: "en", title: "English", type: "text", rows },
      { name: "fr", title: "French", type: "text", rows },
    ],
  });
}

/** Portable-text block content (headings, paragraphs, lists, links). */
export const portableBlockContent = [
  {
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading 2", value: "h2" },
      { title: "Heading 3", value: "h3" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
      ],
      annotations: [
        {
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            {
              name: "href",
              title: "URL",
              type: "url",
              validation: (Rule: { uri: (opts: unknown) => unknown }) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                  allowRelative: false,
                }),
            },
            {
              name: "external",
              title: "Open in new tab",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    },
  },
];
