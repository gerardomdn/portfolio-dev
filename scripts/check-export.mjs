import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Run after a static build: content and language navigation must exist without JS.
for (const locale of ["en", "es", "ja"]) {
  for (const route of ["", "about/", "portfolio/", "blog/", "contact/"]) {
    const html = await readFile(`out/${locale}/${route}index.html`, "utf8");
    const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").split("<body>")[1];
    assert.match(body, /<h1\b/, `${locale}/${route}: missing rendered content`);
    assert.equal((body.match(/<main\b/g) || []).length, 1, `${locale}/${route}: expected one main landmark`);
    assert.match(body, /<main\b[^>]*id="main-content"[^>]*tabindex="-1"/, `${locale}/${route}: missing focusable skip target`);
    assert.match(body, /href="#main-content"/, `${locale}/${route}: missing skip link`);
    assert.match(body, /<footer\b/, `${locale}/${route}: missing footer`);
    for (const language of ["en", "es", "ja"]) {
      assert.ok(body.includes(`href="${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${language}/${route}"`), `${locale}/${route}: missing ${language} link`);
    }
  }
}
console.log("Verified content and language links in all 15 exported pages.");
