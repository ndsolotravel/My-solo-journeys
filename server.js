import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

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
