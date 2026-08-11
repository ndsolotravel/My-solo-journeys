import path from "node:path";
import { pathToFileURL } from "node:url";

const entryPath = path.resolve(process.cwd(), ".output", "server", "index.mjs");
import(pathToFileURL(entryPath).href);

export default function () {}
