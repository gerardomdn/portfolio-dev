import test from "node:test";
import assert from "node:assert/strict";
import { contentUrl, embeddedImage } from "../src/lib/content-urls.mjs";

test("normalizes supported URLs without duplicating the scheme", () => {
  assert.equal(contentUrl("//images.ctfassets.net/photo.jpg"), "https://images.ctfassets.net/photo.jpg");
  assert.equal(contentUrl("https://images.ctfassets.net/photo.jpg"), "https://images.ctfassets.net/photo.jpg");
  for (const url of [undefined, "", "broken", "javascript:alert(1)", "data:text/html,test", "https://user:password@example.com"]) assert.equal(contentUrl(url), null);
  assert.equal(contentUrl("mailto:hello@example.com"), null);
  assert.equal(contentUrl("mailto:hello@example.com", { allowMailto: true }), "mailto:hello@example.com");
});

test("missing or non-image assets are skipped; image descriptions supply alt text", () => {
  for (const node of [undefined, {}, { data: { target: {} } }, { data: { target: { fields: { file: { url: "https://example.com/doc.pdf", contentType: "application/pdf" } } } } }]) assert.equal(embeddedImage(node), null);
  assert.deepEqual(embeddedImage({data: {target: {fields: {description: "Product screen", file: {url: "//images.ctfassets.net/photo.jpg", contentType: "image/jpeg"}}}}}), {src: "https://images.ctfassets.net/photo.jpg", alt: "Product screen"});
});
