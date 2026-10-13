import path from "node:path";
import { pathToFileURL } from "node:url";
const hanaRoot = process.argv[2];
if (!hanaRoot) throw new Error("Usage: node build-local.mjs <Hana checkout or server artifact directory>");
const { packExtension } = await import(pathToFileURL(path.resolve(hanaRoot, "scripts/extension-pack.mjs")).href);

const root = path.resolve(import.meta.dirname);
const out = path.join(root, "dist");
for (const id of ["zotero", "obsidian"]) {
  const result = await packExtension({
    kind: "connector",
    dir: path.join(root, id),
    publisher: "XZJ",
    out,
  });
  console.log(JSON.stringify({ id, zipPath: result.zipPath, entryPath: result.entryPath, entry: result.entry }, null, 2));
}
