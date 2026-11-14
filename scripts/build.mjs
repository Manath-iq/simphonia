import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const { metafile } = await build({
  entryPoints: { app: "src/main.jsx", style: "style.css" },
  outdir: "assets",
  entryNames: "[name]-[hash]",
  bundle: true,
  external: ["./oswald-latin.woff2", "./oswald-cyrillic.woff2"],
  minify: true,
  metafile: true,
  define: { "process.env.NODE_ENV": '"production"' },
});
let html = await readFile("index.html", "utf8");
for (const [file, output] of Object.entries(metafile.outputs)) {
  if (!output.entryPoint) continue;
  const isStyle = file.endsWith(".css");
  const reference = isStyle
    ? /(<link rel="stylesheet" href=")[^"]+/
    : /(<script defer src=")[^"]+/;
  if (!reference.test(html)) throw Error("Missing HTML reference for " + file);
  html = html.replace(reference, "$1./assets/" + basename(file));
}
await writeFile("index.html", html);
