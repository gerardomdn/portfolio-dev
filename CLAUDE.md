# Repository Guide

Next.js portfolio for Gerardo Medina Romero, deployed at https://gerardomdn.github.io.

Localized content is stored in `messages/en.json` and `messages/es.json`. Routes use the App Router under `src/app/[locale]`, with Contentful for blog content, EmailJS for the contact form, and GitHub API widgets for public repositories and merged pull requests.

Use `npm run build` to validate production output and regenerate sitemap files.
