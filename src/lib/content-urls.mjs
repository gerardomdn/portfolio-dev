export function contentUrl(value, { allowMailto = false } = {}) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.startsWith("//") ? `https:${value}` : value);
    if (!["https:", "http:", ...(allowMailto ? ["mailto:"] : [])].includes(url.protocol)) return null;
    if (url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function embeddedImage(node) {
  const fields = node?.data?.target?.fields;
  const file = fields?.file;
  const src = contentUrl(file?.url);
  if (!src || !file?.contentType?.startsWith("image/")) return null;
  return { src, alt: fields.description || fields.title || "" };
}
