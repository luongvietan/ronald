/**
 * Supprime tous les documents `provider` puis `category` du dataset Sanity.
 * (Providers en premier à cause des références category.)
 *
 * Même variables que le seed : NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 *
 * Commande : npm run clear:sanity
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
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
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
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
  console.error("Manque SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const providerIds = await client.fetch(`*[_type == "provider"]._id`);
const categoryIds = await client.fetch(`*[_type == "category"]._id`);

if (providerIds.length === 0 && categoryIds.length === 0) {
  console.log("Aucun document provider ni category à supprimer.");
  process.exit(0);
}

const tx = client.transaction();
for (const id of providerIds) tx.delete(id);
for (const id of categoryIds) tx.delete(id);
await tx.commit();

console.log(`Supprimé ${providerIds.length} provider(s) et ${categoryIds.length} catégorie(s) sur « ${dataset} ».`);
