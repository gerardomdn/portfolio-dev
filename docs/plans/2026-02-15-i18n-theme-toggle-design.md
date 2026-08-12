# i18n + Theme Toggle Design

## Context

Add multi-language support (EN/ES) with prefixed routes and replace the current theme toggle icon with an animated sun/moon switch.

## Decisions

- **i18n library:** next-intl
- **Route strategy:** Prefixed routes `/en/`, `/es/`
- **Default locale:** English (EN)
- **Language detection:** Browser Accept-Language header via Next.js middleware, saved to cookie
- **Language selector:** EN | ES toggle button in header
- **Theme toggle:** Animated sun/moon CSS switch replacing WiMoonAltWaningCrescent4 icon

## Route Structure

```
/en/                → Home (English)
/en/about           → About
/en/portfolio       → Portfolio
/en/blog            → Blog listing
/en/blog/[slug]     → Blog post
/en/contact         → Contact

/es/                → Home (Spanish)
/es/about           → Acerca de
/es/portfolio       → Portafolio
/es/blog            → Blog listing
/es/blog/[slug]     → Blog post
/es/contact         → Contacto

/                   → Redirect to browser language
```

## App Router Structure

```
src/app/
├── [locale]/
│   ├── layout.js
│   ├── page.js
│   ├── about/page.js
│   ├── portfolio/page.js
│   ├── contact/page.js
│   └── blog/
│       ├── page.js
│       └── [slug]/page.js
├── layout.js         → Minimal root layout
└── globals.css
```

## Translation Files

```
messages/
├── en.json
└── es.json
```

Content from `content_option.js` moves entirely into these JSON files. The file is eliminated.

JSON structure includes: nav, home, about, contact, blog, portfolio, worktimeline, skills, services, dataportfolio sections.

## Theme Toggle

- CSS-only animated switch (sun/moon icons)
- Maintains existing localStorage + CSS variables system
- Placed in header next to language toggle

## SEO

- hreflang alternate links on every page
- Sitemap includes both /en/ and /es/ URLs
- generateMetadata uses locale param for translated titles/descriptions

## Dependencies

- next-intl (only new dependency)
