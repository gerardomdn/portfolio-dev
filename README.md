# Gerardo Medina Romero - Portfolio

Personal portfolio built with Next.js App Router, React, and next-intl, exported as a static website.

## Features

- English, Spanish, and Japanese pages
- Resume-aligned projects, experience, skills, and education
- Contentful blog generated at build time
- Dark/light theme and responsive layout
- Email contact link, client-side GitHub profile, and curated repository links
- Language alternates, robots.txt, and generated sitemaps

## Local development

Requires Node.js 22 (matching CI).

```bash
npm ci
npm run dev
```

Open http://localhost:3000/en/ (or `/es/`, `/ja/`). Language URLs are explicit; no server middleware is needed.

```bash
npm test
npm run build
npm start
```

The build exports to `out/`. `npm start` serves that folder at http://localhost:3000 using Python 3. The exported root redirects to English and includes language links as a fallback.

## GitHub Pages

1. In the repository, open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source.
2. For blog content, add repository Actions secrets named `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`. Also select approved blog slugs in `src/config/public-content.json`. Without credentials or selected slugs, the blog displays its empty state.
3. Push these changes to `main`, or run **Deploy GitHub Pages** from the Actions tab once the workflow is on GitHub.

The workflow installs locked dependencies with `npm ci`, builds, uploads `out/`, and deploys using GitHub's Pages actions. It reads the URL and base path from the Pages configuration, supporting repository sites, user sites, and configured custom domains. For this repository, the default address is https://gerardomdn.github.io/portfolio-dev/.

Contentful credentials are used only during the build. Only explicitly selected slugs are fetched and exported. Publish approved content in Contentful and rerun the workflow to update the site. Every blog slug must exist at build time; unknown routes use the static 404 page. Server middleware, runtime SSR, and server image optimization are not used.

To reproduce a repository-path build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio-dev SITE_URL=https://gerardomdn.github.io/portfolio-dev npm run build
```

Serve that output under `/portfolio-dev/` when previewing this variant. A normal `npm run build` produces a root-path preview instead.

References: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [next-intl static routing](https://next-intl.dev/docs/routing/middleware#usage-without-proxy--middleware-static-export), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Public content selection

`src/config/public-content.json` controls additional public content. Both lists start empty:

- `githubProjects`: reviewed objects containing `name` (repository name under `gerardomdn`), `description`, and optionally `language`. Names and descriptions stay as reviewed; the site does not automatically import recently updated repositories or their descriptions.
- `blogSlugs`: exact Contentful `blogPost` slugs approved for this site. Review the full article, linked assets, and images before adding a slug. Editing an approved article in Contentful will change its exported content on the next build, so review those edits too.

Keep unpublished employer information, private client relationships, internal metrics, and internal tooling out of these lists and the translation files. A resume is not itself approval to publish employer information.

The original repository can retain old content in Git history even after files are edited. Use the separately verified, history-cleaned copy when replacing the public repository; these source changes alone do not rewrite remote history.
