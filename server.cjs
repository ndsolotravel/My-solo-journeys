const { existsSync } = require("node:fs");
const { resolve } = require("node:path");
const { pathToFileURL } = require("node:url");

const entryPath = resolve(__dirname, ".output/server/index.mjs");

if (!existsSync(entryPath)) {
  console.error("ERROR: .output/server/index.mjs not found. Please run 'npm run build' first.");
  process.exit(1);
}

const fileUrl = pathToFileURL(entryPath).href;

import(fileUrl).catch((err) => {
  console.error("Failed to start server from .output/server/index.mjs:", err);
  process.exit(1);
});
