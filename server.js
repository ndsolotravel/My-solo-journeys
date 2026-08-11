import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Load .env variables into process.env if present
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const val = match[2].trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (e) {
  console.error("Error loading .env file:", e);
}

const possibleEntries = [
  path.resolve(process.cwd(), ".output", "server", "index.mjs"),
  path.resolve(process.cwd(), "server", "index.mjs"),
  path.resolve(process.cwd(), "index.mjs"),
];

const target = possibleEntries.find((p) => fs.existsSync(p));
if (target && target !== path.resolve(process.cwd(), "server.js")) {
  import(pathToFileURL(target).href);
} else {
  console.error("No valid Nitro server entry point found at:", possibleEntries);
}

export default function () {}
