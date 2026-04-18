/**
 * Kiểm tra HTTP status của mọi URL ảnh trong seed/sanity/*.ndjson
 * Chạy: node scripts/check-seed-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "seed", "sanity");

function collectUrls() {
  const urls = new Set();
  for (const f of ["categories.ndjson", "providers.ndjson"]) {
    const lines = fs.readFileSync(path.join(root, f), "utf8").trim().split(/\r?\n/);
    for (const line of lines) {
      const o = JSON.parse(line);
      if (o.coverImageUrl) urls.add(o.coverImageUrl);
      if (Array.isArray(o.galleryImageUrls)) o.galleryImageUrls.forEach((u) => urls.add(u));
    }
  }
  return [...urls].sort();
}

async function checkUrl(url) {
  try {
    const r = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (r.status === 200) return { url, status: 200, ok: true };
    if (r.status === 405 || r.status === 501) {
      const g = await fetch(url, { method: "GET", redirect: "follow", headers: { Range: "bytes=0-1023" } });
      const ok = g.status === 200 || g.status === 206;
      return { url, status: g.status, ok };
    }
    return { url, status: r.status, ok: false };
  } catch (e) {
    return { url, status: "ERR", ok: false, err: String(e?.message || e) };
  }
}

const list = collectUrls();
const results = [];
for (const url of list) {
  const out = await checkUrl(url);
  results.push(out);
  console.log(out.ok ? "OK  " : "FAIL", out.status, url.slice(0, 100));
}

const bad = results.filter((x) => !x.ok);
const good = results.filter((x) => x.ok);
console.log("\n--- Tóm tắt ---");
console.log("Tổng URL:", list.length);
console.log("200 OK:", good.length);
console.log("Lỗi:", bad.length);
if (bad.length) {
  console.log("\nURL không pass:");
  for (const b of bad) console.log(b.status, b.url, b.err || "");
}

process.exit(bad.length ? 1 : 0);
