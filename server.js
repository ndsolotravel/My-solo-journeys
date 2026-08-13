import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const entryPath = resolve(process.cwd(), ".output/server/index.mjs");

if (existsSync(entryPath)) {
  const fileUrl = pathToFileURL(entryPath).href;
  import(/* @vite-ignore */ fileUrl).catch((err) => {
    console.error("Failed to start server from .output/server/index.mjs:", err);
  });
} else {
  console.error("ERROR: .output/server/index.mjs not found. Please run 'npm run build' first.");
}

export default {
  fetch() {
    return new Response("NDSOLOTRAVEL Server Launcher");
  },
};
