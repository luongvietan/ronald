import { aboutContent } from "./aboutContent";
import { category } from "./category";
import { contactContent } from "./contactContent";
import { homeContent } from "./homeContent";
import { legalPage } from "./legalPage";
import { provider } from "./provider";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  category,
  provider,
  siteSettings,
  homeContent,
  aboutContent,
  contactContent,
  legalPage,
];

export const SINGLETON_TYPES = new Set<string>([
  "siteSettings",
  "homeContent",
  "aboutContent",
  "contactContent",
]);

/**
 * Fixed document IDs for singletons so the Studio, GROQ queries and seed
 * scripts always target the same document.
 */
export const SINGLETON_IDS = {
  siteSettings: "siteSettings",
  homeContent: "homeContent",
  aboutContent: "aboutContent",
  contactContent: "contactContent",
} as const;
