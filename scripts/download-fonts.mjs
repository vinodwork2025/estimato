/**
 * Downloads full Inter WOFF fonts from inter-ui@3.19.3 (npm CDN).
 * Uses full, non-subsetted font files so react-pdf can render A-Z + ₹ + all Latin glyphs.
 * WOFF format — zlib compression only, no WASM/Brotli needed in the browser.
 * Run automatically via `postinstall`. Safe to re-run (skips existing files).
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../../");
const DEST = path.join(ROOT, "public", "fonts");

const FONTS = [
  [
    "https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/Inter%20(web)/Inter-Regular.woff",
    "inter-400.woff",
  ],
  [
    "https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/Inter%20(web)/Inter-SemiBold.woff",
    "inter-600.woff",
  ],
  [
    "https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/Inter%20(web)/Inter-Bold.woff",
    "inter-700.woff",
  ],
];

function download(url, filename) {
  const dest = path.join(DEST, filename);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
    console.log(`skip (exists): ${filename}`);
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    function get(u) {
      https
        .get(u, { rejectUnauthorized: false }, (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            get(res.headers.location);
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${u}`));
            return;
          }
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`downloaded: ${filename}`);
            resolve();
          });
        })
        .on("error", reject);
    }
    get(url);
  });
}

fs.mkdirSync(DEST, { recursive: true });

Promise.all(FONTS.map(([url, file]) => download(url, file)))
  .then(() => console.log("fonts ready"))
  .catch((err) => {
    console.error("font download failed:", err.message);
    // Non-fatal — fonts may already exist from git or a prior run.
  });
