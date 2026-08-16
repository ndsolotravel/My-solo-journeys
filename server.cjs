const { existsSync, readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { pathToFileURL } = require("node:url");

// Pre-load .env into process.env if available on disk
try {
  const envPath = resolve(__dirname, ".env");
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1).trim();
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  }
} catch {
  // Non-blocking
}

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
