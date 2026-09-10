/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://gerardomdn.github.io",
  outDir: "out",
  trailingSlash: true,
  exclude: ["/*/blog/__empty__"],
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
