/**
 * Seed les singletons de page (siteSettings, homeContent, aboutContent,
 * contactContent) ainsi que les 3 pages légales (CGU, privacy, mentions)
 * avec le contenu actuel des fichiers de traduction `messages/en.json` et
 * `messages/fr.json`.
 *
 * Idempotent : utilise `createOrReplace` avec des `_id` fixes — ré-exécuter
 * la commande réécrit exactement les mêmes documents.
 *
 * Prérequis (.env.local ou variables d'environnement) :
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET     (optionnel, défaut: production)
 *   SANITY_API_WRITE_TOKEN          (token avec droits d'écriture)
 *
 * Commande : npm run seed:content
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvLocal() {
  const p = join(root, ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env) || process.env[key] === "") {
      process.env[key] = val;
    }
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId) {
  console.error("Manque NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}
if (!token) {
  console.error(
    "Manque SANITY_API_WRITE_TOKEN. Créez un token Editor sur https://www.sanity.io/manage → API → Tokens puis ajoutez-le dans .env.local",
  );
  process.exit(1);
}

const en = JSON.parse(readFileSync(join(root, "messages/en.json"), "utf8"));
const fr = JSON.parse(readFileSync(join(root, "messages/fr.json"), "utf8"));

/* -------------------------------------------------------------------------- */
/*  Helpers localized string + portable text                                  */
/* -------------------------------------------------------------------------- */

const L = (enValue, frValue) => ({ en: enValue, fr: frValue });

/** Générateur déterministe de `_key` (un compteur par appel de seed). */
let keyCounter = 0;
const k = () => `k${(keyCounter++).toString(36)}`;

function span(text, marks = []) {
  return { _type: "span", _key: k(), text, marks };
}

function block(style, children, extra = {}) {
  return {
    _type: "block",
    _key: k(),
    style,
    markDefs: [],
    children,
    ...extra,
  };
}

const h2 = (text) => block("h2", [span(text)]);
const p = (text) => block("normal", [span(text)]);
const li = (text) =>
  block("normal", [span(text)], { listItem: "bullet", level: 1 });

/** Paragraphe avec un lien en fin : `prefix <a>label</a>.` */
function pWithLink(prefix, label, href, suffix = ".") {
  const linkKey = k();
  return {
    _type: "block",
    _key: k(),
    style: "normal",
    markDefs: [{ _type: "link", _key: linkKey, href, external: href.startsWith("http") }],
    children: [
      span(prefix.endsWith(" ") ? prefix : prefix + " "),
      span(label, [linkKey]),
      ...(suffix ? [span(suffix)] : []),
    ],
  };
}

/** Ligne "**Label** valeur". */
function pLabelValue(label, value) {
  return block("normal", [span(label + " ", ["strong"]), span(value)]);
}

/** Ligne "**Label** <a>link</a>". */
function pLabelLink(label, linkText, href) {
  const linkKey = k();
  return {
    _type: "block",
    _key: k(),
    style: "normal",
    markDefs: [{ _type: "link", _key: linkKey, href, external: href.startsWith("http") }],
    children: [
      span(label + " ", ["strong"]),
      span(linkText, [linkKey]),
    ],
  };
}

/* -------------------------------------------------------------------------- */
/*  Page body builders (CGU / Privacy / Mentions)                             */
/* -------------------------------------------------------------------------- */

function buildCguBody(src) {
  const c = src.legal.cgu;
  return [
    h2(c.s1h), p(c.s1p),
    h2(c.s2h), p(c.s2p),
    h2(c.s3h), li(c.s3l1), li(c.s3l2), li(c.s3l3), li(c.s3l4),
    h2(c.s4h), p(c.s4p),
    h2(c.s5h), p(c.s5p),
    h2(c.s6h), p(c.s6p),
    h2(c.s7h), p(c.s7p),
    h2(c.s8h), p(c.s8p),
    h2(c.s9h), pWithLink(c.s9p, "legal@ilehost.mu", "mailto:legal@ilehost.mu"),
  ];
}

function buildPrivacyBody(src) {
  const c = src.legal.privacy;
  return [
    h2(c.s1h), p(c.s1p),
    h2(c.s2h), p(c.s2intro), li(c.s2l1), li(c.s2l2), li(c.s2l3),
    h2(c.s3h), li(c.s3l1), li(c.s3l2), li(c.s3l3), li(c.s3l4),
    h2(c.s4h),
    pWithLink(
      c.s4p,
      "Google Analytics Opt-out Browser Add-on",
      "https://tools.google.com/dlpage/gaoptout",
    ),
    h2(c.s5h), p(c.s5p),
    h2(c.s6h), p(c.s6p),
    h2(c.s7h), p(c.s7intro),
    li(c.s7l1), li(c.s7l2), li(c.s7l3), li(c.s7l4),
    pWithLink(c.s7contact, "privacy@ilehost.mu", "mailto:privacy@ilehost.mu"),
    h2(c.s8h), p(c.s8p),
    h2(c.s9h), p(c.s9p),
  ];
}

function buildMentionsBody(src) {
  const c = src.legal.mentions;
  return [
    h2(c.publisherTitle),
    pLabelValue(c.company, "L'Île Host"),
    pLabelValue(c.country, "Republic of Mauritius"),
    pLabelLink(c.email, "hello@ilehost.mu", "mailto:hello@ilehost.mu"),

    h2(c.hostingTitle),
    pLabelValue(c.provider, "Vercel Inc."),
    pLabelValue(c.address, "340 Pine Street, San Francisco, CA 94104, USA"),
    pLabelLink(c.website, "vercel.com", "https://vercel.com"),

    h2(c.ipTitle), p(c.ipP),
    h2(c.liabTitle), p(c.liabP),
    h2(c.lawTitle), p(c.lawP),
    h2(c.contactTitle),
    pWithLink(c.contactP, "legal@ilehost.mu", "mailto:legal@ilehost.mu"),
  ];
}

/* -------------------------------------------------------------------------- */
/*  Documents                                                                 */
/* -------------------------------------------------------------------------- */

const siteSettingsDoc = {
  _id: "siteSettings",
  _type: "siteSettings",
  seo: {
    siteName: L(en.meta.siteName, fr.meta.siteName),
    defaultDescription: L(en.meta.defaultDescription, fr.meta.defaultDescription),
  },
  footer: {
    tagline: L(en.footer.tagline, fr.footer.tagline),
    copyright: L(en.footer.copyright, fr.footer.copyright),
    madeIn: L(en.footer.madeIn, fr.footer.madeIn),
  },
  publisher: {
    company: "L'Île Host",
    country: "Republic of Mauritius",
    email: "hello@ilehost.mu",
  },
  hosting: {
    provider: "Vercel Inc.",
    address: "340 Pine Street, San Francisco, CA 94104, USA",
    website: "https://vercel.com",
  },
};

const homeContentDoc = {
  _id: "homeContent",
  _type: "homeContent",
  title: "Homepage",
  hero: {
    badge: L(en.home.heroBadge, fr.home.heroBadge),
    titleLine1: L(en.home.heroTitleLine1, fr.home.heroTitleLine1),
    titleLine2: L(en.home.heroTitleLine2, fr.home.heroTitleLine2),
    subtitle: L(en.home.heroSubtitle, fr.home.heroSubtitle),
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80",
  },
  stats: {
    categoriesLabel: L(en.home.stats.categories, fr.home.stats.categories),
    verifiedLabel: L(en.home.stats.verified, fr.home.stats.verified),
    browseLabel: L(en.home.stats.browse, fr.home.stats.browse),
    islandWideLabel: L(en.home.stats.islandWide, fr.home.stats.islandWide),
  },
  categoriesSection: {
    label: L(en.home.categoriesSectionLabel, fr.home.categoriesSectionLabel),
    title: L(en.home.categoriesTitle, fr.home.categoriesTitle),
  },
  howItWorks: {
    label: L(en.home.howLabel, fr.home.howLabel),
    title: L(en.home.howTitle, fr.home.howTitle),
    step1: {
      title: L(en.home.steps["1"].title, fr.home.steps["1"].title),
      desc: L(en.home.steps["1"].desc, fr.home.steps["1"].desc),
    },
    step2: {
      title: L(en.home.steps["2"].title, fr.home.steps["2"].title),
      desc: L(en.home.steps["2"].desc, fr.home.steps["2"].desc),
    },
    step3: {
      title: L(en.home.steps["3"].title, fr.home.steps["3"].title),
      desc: L(en.home.steps["3"].desc, fr.home.steps["3"].desc),
    },
  },
  featuredSection: {
    label: L(en.home.featuredLabel, fr.home.featuredLabel),
    title: L(en.home.featuredTitle, fr.home.featuredTitle),
  },
  newsletter: {
    title: L(en.home.newsletterTitle, fr.home.newsletterTitle),
    subtitle: L(en.home.newsletterSubtitle, fr.home.newsletterSubtitle),
  },
};

const aboutContentDoc = {
  _id: "aboutContent",
  _type: "aboutContent",
  seo: {
    metaTitle: L(en.about.metaTitle, fr.about.metaTitle),
    metaDescription: L(en.about.metaDescription, fr.about.metaDescription),
  },
  hero: {
    title: L(en.about.heroTitle, fr.about.heroTitle),
    subtitle: L(en.about.heroSubtitle, fr.about.heroSubtitle),
  },
  stats: {
    categoriesLabel: L(en.about.stats.categories, fr.about.stats.categories),
    verifiedLabel: L(en.about.stats.verified, fr.about.stats.verified),
    islandLabel: L(en.about.stats.island, fr.about.stats.island),
    browseLabel: L(en.about.stats.browse, fr.about.stats.browse),
  },
  mission: {
    title: L(en.about.missionTitle, fr.about.missionTitle),
    paragraph1: L(en.about.missionP1, fr.about.missionP1),
    paragraph2: L(en.about.missionP2, fr.about.missionP2),
  },
  values: {
    title: L(en.about.valuesTitle, fr.about.valuesTitle),
    quality: {
      title: L(en.about.values.quality.title, fr.about.values.quality.title),
      desc: L(en.about.values.quality.desc, fr.about.values.quality.desc),
    },
    local: {
      title: L(en.about.values.local.title, fr.about.values.local.title),
      desc: L(en.about.values.local.desc, fr.about.values.local.desc),
    },
    direct: {
      title: L(en.about.values.direct.title, fr.about.values.direct.title),
      desc: L(en.about.values.direct.desc, fr.about.values.direct.desc),
    },
    mobile: {
      title: L(en.about.values.mobile.title, fr.about.values.mobile.title),
      desc: L(en.about.values.mobile.desc, fr.about.values.mobile.desc),
    },
  },
  cta: {
    title: L(en.about.ctaTitle, fr.about.ctaTitle),
    subtitle: L(en.about.ctaSubtitle, fr.about.ctaSubtitle),
    exploreLabel: L(en.about.explore, fr.about.explore),
    contactLabel: L(en.about.getInTouch, fr.about.getInTouch),
  },
};

const contactContentDoc = {
  _id: "contactContent",
  _type: "contactContent",
  seo: {
    metaTitle: L(en.contact.metaTitle, fr.contact.metaTitle),
    metaDescription: L(en.contact.metaDescription, fr.contact.metaDescription),
  },
  hero: {
    title: L(en.contact.title, fr.contact.title),
    subtitle: L(en.contact.subtitle, fr.contact.subtitle),
  },
  infoTitle: L(en.contact.infoTitle, fr.contact.infoTitle),
  email: "hello@ilehost.mu",
  whatsappDisplay: "+230 5XXX XXXX",
  whatsappLink: "2305XXXXXXX",
  locationValue: L(en.contact.locationValue, fr.contact.locationValue),
  cta: {
    title: L(en.contact.ctaTitle, fr.contact.ctaTitle),
    body: L(en.contact.ctaBody, fr.contact.ctaBody),
    buttonLabel: L(en.contact.ctaButton, fr.contact.ctaButton),
  },
  formTitle: L(en.contact.formTitle, fr.contact.formTitle),
};

/* -- Legal pages --------------------------------------------------------- */

const legalCguDoc = {
  _id: "legalPage-cgu",
  _type: "legalPage",
  key: "cgu",
  seo: {
    metaTitle: L(en.legal.cgu.metaTitle, fr.legal.cgu.metaTitle),
    metaDescription: L(en.legal.cgu.metaDescription, fr.legal.cgu.metaDescription),
  },
  title: L(en.legal.cgu.title, fr.legal.cgu.title),
  lastUpdated: L(en.legal.updated, fr.legal.updated),
  bodyEn: buildCguBody(en),
  bodyFr: buildCguBody(fr),
};

const legalPrivacyDoc = {
  _id: "legalPage-privacy",
  _type: "legalPage",
  key: "privacy",
  seo: {
    metaTitle: L(en.legal.privacy.metaTitle, fr.legal.privacy.metaTitle),
    metaDescription: L(en.legal.privacy.metaDescription, fr.legal.privacy.metaDescription),
  },
  title: L(en.legal.privacy.title, fr.legal.privacy.title),
  lastUpdated: L(en.legal.updated, fr.legal.updated),
  bodyEn: buildPrivacyBody(en),
  bodyFr: buildPrivacyBody(fr),
};

const legalMentionsDoc = {
  _id: "legalPage-mentions",
  _type: "legalPage",
  key: "mentions",
  seo: {
    metaTitle: L(en.legal.mentions.metaTitle, fr.legal.mentions.metaTitle),
    metaDescription: L(en.legal.mentions.metaDescription, fr.legal.mentions.metaDescription),
  },
  title: L(en.legal.mentions.title, fr.legal.mentions.title),
  lastUpdated: L(en.legal.updated, fr.legal.updated),
  bodyEn: buildMentionsBody(en),
  bodyFr: buildMentionsBody(fr),
};

/* -------------------------------------------------------------------------- */
/*  Commit                                                                    */
/* -------------------------------------------------------------------------- */

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const docs = [
  siteSettingsDoc,
  homeContentDoc,
  aboutContentDoc,
  contactContentDoc,
  legalCguDoc,
  legalPrivacyDoc,
  legalMentionsDoc,
];

const tx = client.transaction();
for (const doc of docs) tx.createOrReplace(doc);
await tx.commit();

console.log(
  `OK — ${docs.length} documents de page créés/remplacés sur le dataset « ${dataset} » :`,
);
for (const d of docs) console.log(`  • ${d._type.padEnd(16)} _id=${d._id}`);
