import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, SINGLETON_TYPES } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "ile-host",
  title: "L'Île Host Admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter((tpl) => !SINGLETON_TYPES.has(tpl.schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) => action && !["duplicate", "delete"].includes(action),
          )
        : input,
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (tpl) => !SINGLETON_TYPES.has(tpl.templateId ?? ""),
        );
      }
      return prev;
    },
  },
});
