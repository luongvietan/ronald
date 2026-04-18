/**
 * Import seed documents (categories then providers) into Sanity.
 *
 * Prérequis (.env.local ou variables d'environnement) :
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET   (optionnel, défaut: production)
 *   SANITY_API_WRITE_TOKEN        (token avec droit d'écriture sur le dataset)
 *
 * Commande : npm run seed:sanity
 * Pour tout effacer puis réimporter : npm run clear:sanity && npm run seed:sanity
 *
 * Token : https://www.sanity.io/manage → projet → API → Add API token (Editor)
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
  const text = readFileSync(p, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env) || process.env[key] === "") {
      process.env[key] = val;
    }
  }
}

function readNdjson(filePath) {
  const text = readFileSync(filePath, "utf8");
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line, i) => {
      try {
        return JSON.parse(line);
      } catch {
        throw new Error(`JSON invalide dans ${filePath} ligne ${i + 1}`);
      }
    });
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId) {
  console.error("Manque NEXT_PUBLIC_SANITY_PROJECT_ID (dans .env.local ou l'environnement).");
  process.exit(1);
}
if (!token) {
  console.error(
    "Manque SANITY_API_WRITE_TOKEN. Créez un token Editor sur https://www.sanity.io/manage → API → Tokens, puis ajoutez-le dans .env.local",
  );
  process.exit(1);
}

const categoriesPath = join(root, "seed", "sanity", "categories.ndjson");
const providersPath = join(root, "seed", "sanity", "providers.ndjson");

const categories = readNdjson(categoriesPath);
const providers = readNdjson(providersPath);

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const tx = client.transaction();
for (const doc of categories) tx.createOrReplace(doc);
for (const doc of providers) tx.createOrReplace(doc);
await tx.commit();

console.log(
  `OK — ${categories.length} catégories et ${providers.length} providers importés (createOrReplace) sur le dataset « ${dataset} ».`,
);
