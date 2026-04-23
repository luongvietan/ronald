import type { StructureResolver } from "sanity/structure";
import { SINGLETON_IDS } from "./schemaTypes";

/**
 * Studio sidebar: singletons appear as single editable documents at the top,
 * then Providers, Categories and Legal pages as regular lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SINGLETON_IDS.siteSettings),
        ),
      S.divider(),
      S.listItem()
        .title("Homepage")
        .id("homeContent")
        .child(
          S.document()
            .schemaType("homeContent")
            .documentId(SINGLETON_IDS.homeContent),
        ),
      S.listItem()
        .title("About page")
        .id("aboutContent")
        .child(
          S.document()
            .schemaType("aboutContent")
            .documentId(SINGLETON_IDS.aboutContent),
        ),
      S.listItem()
        .title("Contact page")
        .id("contactContent")
        .child(
          S.document()
            .schemaType("contactContent")
            .documentId(SINGLETON_IDS.contactContent),
        ),
      S.listItem()
        .title("Legal pages")
        .child(
          S.documentTypeList("legalPage")
            .title("Legal pages")
            .filter('_type == "legalPage"'),
        ),
      S.divider(),
      S.documentTypeListItem("provider").title("Providers"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
