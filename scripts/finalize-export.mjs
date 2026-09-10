import { rm, writeFile } from "node:fs/promises";

// Remove only the build-generated empty-blog fallback pages.
for (const locale of ["en", "es", "ja"]) {
  await rm(`out/${locale}/blog/__empty__`, { recursive: true, force: true });
}

// Relative links work both on a user site and beneath a repository base path.
await writeFile("out/index.html", `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0;url=./en/">
<title>Gerardo Medina Romero</title></head>
<body><p><a href="./en/">Continue in English</a></p>
<nav aria-label="Language"><a href="./es/" lang="es">Español</a> · <a href="./ja/" lang="ja">日本語</a></nav></body></html>`);
await writeFile("out/.nojekyll", "");
