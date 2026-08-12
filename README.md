# Gerardo Medina Romero - Portfolio

Personal portfolio and engineering blog for Gerardo Medina Romero, a Fullstack Engineer based in Tokyo with 8+ years of experience in React, TypeScript, frontend architecture, Node.js, automation, and AI.

### [Live Preview](https://gerardomdn.github.io)

### Features

- Next.js App Router with static generation
- English and Spanish localization with `next-intl`
- Resume-aligned experience, skills, education, and professional highlights
- Contentful-powered blog
- Dark/light theme and responsive React-Bootstrap layout
- EmailJS contact form
- Dynamic GitHub repositories and accepted pull requests
- SEO metadata, hreflang alternates, robots.txt, and generated sitemaps

### Setup

```bash
corepack yarn install
corepack yarn dev
```

For CMS and contact integrations, configure the relevant Contentful and EmailJS credentials. All localized portfolio copy lives in `messages/en.json` and `messages/es.json`.

Build for production with:

```bash
corepack yarn build
```
