const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = (process.env.SITE_URL || `https://gerardomdn.github.io${basePath}`).replace(/\/$/, "");

export function languageAlternates(path = "") {
  return Object.fromEntries(["en", "es", "ja"].map((locale) => [locale, `${siteUrl}/${locale}${path}/`]));
}
