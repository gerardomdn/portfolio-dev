# Gerardo Medina Romero - Portfolio

Personal portfolio built with Next.js App Router, React, and next-intl, exported as a static website.

## Features

- English, Spanish, and Japanese pages
- Resume-aligned projects, experience, skills, and education
- Contentful blog generated at build time
- Dark/light theme and responsive layout
- Email contact link and client-side GitHub profile/repositories
- Language alternates, robots.txt, and generated sitemaps

## Local development

Requires Node.js 22 (matching CI).

```bash
npm ci
npm run dev
```

Open http://localhost:3000/en/ (or `/es/`, `/ja/`). Language URLs are explicit; no server middleware is needed.

```bash
npm run build
npm start
```

The build exports to `out/`. `npm start` serves that folder at http://localhost:3000 using Python 3. The exported root redirects to English and includes language links as a fallback.

## GitHub Pages

1. In the repository, open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source.
2. For blog content, add repository Actions secrets named `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`. Without them, the blog displays its empty state.
3. Push these changes to `main`, or run **Deploy GitHub Pages** from the Actions tab once the workflow is on GitHub.

The workflow installs locked dependencies with `npm ci`, builds, uploads `out/`, and deploys using GitHub's Pages actions. It reads the URL and base path from the Pages configuration, supporting repository sites, user sites, and configured custom domains. For this repository, the default address is https://gerardomdn.github.io/portfolio-dev/.

Contentful credentials are used only during the build. Publish content in Contentful and rerun the workflow to update the site. Every blog slug must exist at build time; unknown routes use the static 404 page. Server middleware, runtime SSR, and server image optimization are not used.

To reproduce a repository-path build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio-dev SITE_URL=https://gerardomdn.github.io/portfolio-dev npm run build
```

Serve that output under `/portfolio-dev/` when previewing this variant. A normal `npm run build` produces a root-path preview instead.

References: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [next-intl static routing](https://next-intl.dev/docs/routing/middleware#usage-without-proxy--middleware-static-export), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
