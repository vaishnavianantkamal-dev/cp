// One-off image optimizer: shrinks src/assets images in place.
// Keeps the same filename + extension so no import paths change.
// Re-run safely; it only overwrites a file when the optimized version is smaller.
import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../src/assets", import.meta.url));
const MAX_WIDTH = 1600; // no asset displays wider than this
const JPEG_Q = 80;
const PNG_Q = 80;

const fmt = (b) => `${(b / 1048576).toFixed(2)} MB`;

async function* walk(dir) {
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let before = 0;
let after = 0;
let changed = 0;
let skipped = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const original = await readFile(file);
  let img = sharp(original, { failOn: "none" });
  const meta = await img.metadata();

  if (meta.width && meta.width > MAX_WIDTH) {
    img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  if (ext === ".png") {
    img = img.png({ compressionLevel: 9, quality: PNG_Q, effort: 8, palette: true });
  } else {
    img = img.jpeg({ quality: JPEG_Q, mozjpeg: true });
  }

  const out = await img.toBuffer();
  before += original.length;

  if (out.length < original.length) {
    await writeFile(file, out);
    after += out.length;
    changed++;
    const pct = ((1 - out.length / original.length) * 100).toFixed(0);
    if (original.length > 200 * 1024) {
      console.log(`  ${fmt(original.length)} -> ${fmt(out.length)} (-${pct}%)  ${file.replace(ROOT, "")}`);
    }
  } else {
    after += original.length; // kept original
    skipped++;
  }
}

console.log("\n────────────────────────────────────────");
console.log(`Files optimized : ${changed}`);
console.log(`Files unchanged : ${skipped}`);
console.log(`Total before    : ${fmt(before)}`);
console.log(`Total after     : ${fmt(after)}`);
console.log(`Saved           : ${fmt(before - after)} (${((1 - after / before) * 100).toFixed(1)}%)`);
