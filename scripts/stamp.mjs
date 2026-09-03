/* Stamps index.html's <script> with a hash of the built bundle.
   Without it a returning visitor keeps whatever bundle.js their browser
   cached, and never sees a change until they clear it by hand. */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const hash = createHash("sha256").update(readFileSync("bundle.js")).digest("hex").slice(0, 10);
const html = readFileSync("index.html", "utf8");
const next = html.replace(/src="bundle\.js(?:\?v=[a-f0-9]+)?"/, `src="bundle.js?v=${hash}"`);

if (next === html && !html.includes(`?v=${hash}`)) {
  console.error("stamp: could not find the bundle.js script tag in index.html");
  process.exit(1);
}
writeFileSync("index.html", next);
console.log(`  stamped bundle.js?v=${hash}`);
