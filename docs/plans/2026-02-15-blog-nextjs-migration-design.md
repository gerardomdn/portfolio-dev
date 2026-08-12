# Blog + Next.js Migration Design

## Context

Migrate the existing React/CRA portfolio SPA to Next.js to add a blog with Contentful CMS and Google AdSense monetization. Deploy on Vercel.

## Decisions

- **Framework:** Next.js 14+ with App Router and SSG
- **CMS:** Contentful (free tier, 25K records)
- **Ads:** Google AdSense on blog pages only
- **Hosting:** Vercel (free tier, auto-deploy from GitHub)
- **Domain:** sasasamaes.github.io (redirect or custom domain on Vercel)

## Architecture

### Routes

```
/ (home)           -> static page
/about             -> static page
/portfolio         -> static page
/contact           -> static page (EmailJS maintained)
/blog              -> post listing (SSG from Contentful)
/blog/[slug]       -> individual post (SSG per post)
```

### Project Structure

```
src/
├── app/
│   ├── layout.js            -> Root layout (header, footer, theme, cursor)
│   ├── page.js              -> Home
│   ├── about/page.js
│   ├── portfolio/page.js
│   ├── contact/page.js
│   └── blog/
│       ├── page.js           -> Post listing
│       └── [slug]/page.js    -> Individual post + AdSense
├── components/
│   ├── header/
│   ├── socialicons/
│   ├── themetoggle/
│   ├── githubRepos/
│   ├── githubContributions/
│   ├── blog/
│   │   ├── PostCard.js       -> Card for listing
│   │   ├── PostContent.js    -> Renders Contentful rich text
│   │   └── AdBanner.js       -> AdSense wrapper component
│   └── AnimatedCursor.js
├── lib/
│   └── contentful.js         -> Contentful client + fetch helpers
├── content_option.js          -> Portfolio content (unchanged)
└── styles/                    -> Migrated CSS
```

### Contentful Model: Blog Post

| Field         | Type              | Purpose                        |
|---------------|-------------------|--------------------------------|
| title         | Short text        | Post title                     |
| slug          | Short text (unique)| URL slug                      |
| excerpt       | Short text        | Short description for cards/SEO|
| content       | Rich Text         | Post body (code blocks, images)|
| coverImage    | Media             | Cover image                    |
| tags          | Short text (list) | Categories: "tech", "personal" |
| publishedDate | Date              | Publication date               |

### Google AdSense

- `AdBanner.js` component injects AdSense ad units
- Placed in `/blog/[slug]` pages only (not portfolio pages)
- AdSense script loaded in `layout.js` via `next/script` with `afterInteractive` strategy

### SEO

- Dynamic metadata per post using `generateMetadata`
- Auto-generated sitemap with `next-sitemap`
- Static HTML output — fully indexable

### Publishing Flow

```
Write post in Contentful -> Save/Publish
    -> Webhook triggers Vercel rebuild
    -> Post live at /blog/[slug] in ~1-2 min
```

## Key Libraries

- next (App Router)
- contentful (JS SDK)
- @contentful/rich-text-react-renderer (rich text to React)
- next-sitemap (SEO)
- react-bootstrap, react-icons, typewriter-effect, emailjs-com (existing)
