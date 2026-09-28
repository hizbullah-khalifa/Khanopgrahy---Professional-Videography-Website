/* Reports the transfer weight of the initial payload (what a first-time
 * visitor downloads before any interaction). */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

const html = readFileSync(process.argv[2], "utf8");
const urls = [
  ...new Set(
    [...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.(?:js|css))"/g)].map(
      (m) => m[1],
    ),
  ),
];

let raw = 0;
let gzip = 0;
let brotli = 0;
let missing = 0;

for (const url of urls) {
  const file = join(".next", url.replace(/^\/_next\//, "").replace(/\//g, "\\"));
  if (!existsSync(file)) {
    missing++;
    continue;
  }
  const bytes = readFileSync(file);
  raw += bytes.length;
  gzip += gzipSync(bytes).length;
  brotli += brotliCompressSync(bytes).length;
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const doc = Buffer.from(html, "utf8");

console.log(`initial JS + CSS   ${urls.length - missing} files`);
console.log(`  uncompressed     ${kb(raw)}`);
console.log(`  gzip             ${kb(gzip)}`);
console.log(`  brotli           ${kb(brotli)}`);
console.log(`HTML document      ${kb(doc.length)} raw / ${kb(gzipSync(doc).length)} gzip / ${kb(brotliCompressSync(doc).length)} brotli`);
if (missing) console.log(`(skipped ${missing} files not found on disk)`);
