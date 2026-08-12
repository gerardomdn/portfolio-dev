# Blog + Next.js Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the CRA portfolio to Next.js 14 App Router, add a blog powered by Contentful, and integrate Google AdSense for monetization.

**Architecture:** Next.js 14 with App Router and SSG. Contentful as headless CMS for blog posts. Google AdSense on blog pages. Deploy to Vercel. All existing portfolio content stays in `content_option.js`. Page transitions replaced with Next.js native navigation.

**Tech Stack:** Next.js 14, React 18, Contentful JS SDK, @contentful/rich-text-react-renderer, react-bootstrap, react-icons, typewriter-effect, emailjs-com, next-sitemap

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: `next.config.js`
- Create: `jsconfig.json`
- Modify: `package.json`
- Delete: `src/index.js`
- Delete: `public/index.html`

**Step 1: Create a new branch for the migration**

```bash
git checkout -b feat/nextjs-migration
```

**Step 2: Remove CRA dependencies and add Next.js**

```bash
yarn remove react-scripts react-helmet-async react-router-dom react-transition-group
yarn add next @contentful/rich-text-react-renderer contentful next-sitemap
```

**Step 3: Update package.json scripts**

Replace the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postbuild": "next-sitemap"
  }
}
```

Remove the `eslintConfig` and `browserslist` sections from `package.json`.

**Step 4: Create `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.postimg.cc" },
      { hostname: "media.licdn.com" },
      { hostname: "images.ctfassets.net" },
    ],
  },
};

module.exports = nextConfig;
```

**Step 5: Create `.env.local`**

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
```

**Step 6: Delete CRA entry files**

Delete these files (they are replaced by Next.js App Router conventions):
- `src/index.js`
- `public/index.html`
- `public/manifest.json`
- `src/hooks/withRouter.js`
- `src/app/routes.js`
- `src/app/App.js`
- `src/app/App.css`
- `.env`

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js, remove CRA dependencies"
```

---

### Task 2: Create Root Layout and Global Styles

**Files:**
- Create: `src/app/layout.js`
- Modify: `src/index.css` (move to `src/app/globals.css`)
- Create: `src/app/template.js`

**Step 1: Move and merge global CSS**

Rename `src/index.css` to `src/app/globals.css`. Append the contents of `src/app/App.css` (page transitions can be removed; keep the `.s_c` mobile padding and container max-width override):

Append to the end of `src/app/globals.css`:

```css
@media only screen and (max-width: 991px) {
    .s_c {
        padding-top: 40px;
    }
}

@media (min-width: 1400px) {
    .container,
    .container-lg,
    .container-md,
    .container-sm,
    .container-xl,
    .container-xxl {
        max-width: 1140px;
    }
}
```

**Step 2: Create `src/app/layout.js`**

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Headermain from "@/header";
import { Socialicons } from "@/components/socialicons";
import ThemeProvider from "@/components/themetoggle/ThemeProvider";
import Script from "next/script";

export const metadata = {
  title: "Francisco Campos Diaz",
  description:
    "I'm a Full Stack Developer in love with Programming, Desing and Swim.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&family=Marcellus&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <Headermain />
          <div className="s_c">
            {children}
            <Socialicons />
          </div>
        </ThemeProvider>
        {/* Google AdSense - replace ca-pub-XXXXXXX with your publisher ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

**Step 3: Create `src/components/themetoggle/ThemeProvider.js`**

The theme toggle uses `document` and `localStorage`, so it must be a client component:

```jsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: create root layout with global styles and theme provider"
```

---

### Task 3: Migrate Header Component

**Files:**
- Modify: `src/header/index.js`
- Keep: `src/header/style.css` (no changes needed)

**Step 1: Convert header to Next.js**

Replace `src/header/index.js` with:

```jsx
"use client";

import { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import Link from "next/link";
import { logotext, socialprofils } from "@/content_option";
import Themetoggle from "@/components/themetoggle";

const Headermain = () => {
  const [isActive, setActive] = useState(true);

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand nav_ac" href="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
            <Themetoggle />
            <button className="menu__button nav_ac" onClick={handleToggle}>
              {!isActive ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item">
                    <Link onClick={handleToggle} href="/" className="my-3">Home</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} href="/portfolio" className="my-3">Portfolio</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} href="/about" className="my-3">About</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} href="/blog" className="my-3">Blog</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} href="/contact" className="my-3">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a href={socialprofils.facebook}>Facebook</a>
              <a href={socialprofils.github}>Github</a>
              <a href={socialprofils.twitter}>Twitter</a>
            </div>
            <p className="copyright m-0">copyright __ {logotext}</p>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;
```

Key changes: `react-router-dom` `Link` → `next/link` `Link`, `to` → `href`.

**Step 2: Update theme toggle**

Replace `src/components/themetoggle/index.js`:

```jsx
"use client";

import { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";
import "./style.css";

const Themetoggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className="nav_ac" onClick={toggle}>
      <WiMoonAltWaningCrescent4 />
    </div>
  );
};

export default Themetoggle;
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: migrate header and theme toggle to Next.js"
```

---

### Task 4: Migrate Home Page

**Files:**
- Create: `src/app/page.js`
- Create: `src/app/HomeClient.js`
- Keep: `src/pages/home/style.css` → move to `src/app/home.css`

**Step 1: Move CSS**

Move `src/pages/home/style.css` to `src/app/home.css`.

**Step 2: Create `src/app/page.js`** (Server Component for metadata)

```jsx
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Francisco Campos Diaz",
  description:
    "I'm a Full Stack Developer in love with Programming, Desing and Swim.",
};

export default function HomePage() {
  return <HomeClient />;
}
```

**Step 3: Create `src/app/HomeClient.js`** (Client Component for Typewriter)

```jsx
"use client";

import "./home.css";
import Typewriter from "typewriter-effect";
import { introdata } from "@/content_option";
import Link from "next/link";

export default function HomeClient() {
  return (
    <section id="home" className="home">
      <div className="intro_sec d-block d-lg-flex align-items-center">
        <div
          className="h_bg-image order-1 order-lg-2 h-100"
          style={{ backgroundImage: `url(${introdata.your_img_url})` }}
        ></div>
        <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
          <div className="align-self-center">
            <div className="intro mx-auto">
              <h2 className="mb-1x">{introdata.title}</h2>
              <h1 className="fluidz-48 mb-1x">
                <Typewriter
                  options={{
                    strings: [
                      introdata.animated.first,
                      introdata.animated.second,
                      introdata.animated.third,
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 10,
                  }}
                />
              </h1>
              <p className="mb-1x">{introdata.description}</p>
              <div className="intro_btn-action pb-5">
                <Link href="/portfolio" className="text_2">
                  <div id="button_p" className="ac_btn btn">
                    My Portfolio
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                </Link>
                <Link href="/contact">
                  <div id="button_h" className="ac_btn btn">
                    Contact Me
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 4: Verify dev server starts**

```bash
yarn dev
```

Visit `http://localhost:3000` — home page should render with typewriter effect.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: migrate home page to Next.js"
```

---

### Task 5: Migrate About Page

**Files:**
- Create: `src/app/about/page.js`
- Move: `src/pages/about/style.css` → `src/app/about/about.css`

**Step 1: Move CSS**

Move `src/pages/about/style.css` to `src/app/about/about.css`.

**Step 2: Create `src/app/about/page.js`**

```jsx
import "./about.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  worktimeline,
  skills,
  services,
} from "@/content_option";

export const metadata = {
  title: "About | Francisco Campos Diaz",
  description:
    "I'm a Full Stack Developer in love with Programming, Desing and Swim.",
};

export default function AboutPage() {
  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">About me</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5">
          <h3 className="color_sec py-4">{dataabout.title}</h3>
        </Col>
        <Col lg="7" className="d-flex align-items-center">
          <div>
            <p>{dataabout.aboutme}</p>
          </div>
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5">
          <h3 className="color_sec py-4">Work Timline</h3>
        </Col>
        <Col lg="7">
          <table className="table caption-top">
            <tbody>
              {worktimeline.map((data, i) => (
                <tr key={i}>
                  <th scope="row">{data.jobtitle}</th>
                  <td>{data.where}</td>
                  <td>{data.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5">
          <h3 className="color_sec py-4">Skills</h3>
        </Col>
        <Col lg="7">
          {skills.map((data, i) => (
            <div key={i}>
              <h3 className="progress-title">{data.name}</h3>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: `${data.value}%` }}
                >
                  <div className="progress-value">{data.value}%</div>
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lang="5">
          <h3 className="color_sec py-4">services</h3>
        </Col>
        <Col lg="7">
          {services.map((data, i) => (
            <div className="service_ py-4" key={i}>
              <h5 className="service__title">{data.title}</h5>
              <p className="service_desc">{data.description}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
```

Note: This is a Server Component — no `"use client"` needed since it only uses static data.

**Step 3: Verify**

```bash
yarn dev
```

Visit `http://localhost:3000/about`.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: migrate about page to Next.js"
```

---

### Task 6: Migrate Portfolio Page

**Files:**
- Create: `src/app/portfolio/page.js`
- Create: `src/app/portfolio/PortfolioClient.js`
- Move: `src/pages/portfolio/style.css` → `src/app/portfolio/portfolio.css`
- Keep: `src/components/githubRepos/` (add `"use client"` directive)
- Keep: `src/components/githuhContributions/` (add `"use client"` directive)

**Step 1: Move CSS**

Move `src/pages/portfolio/style.css` to `src/app/portfolio/portfolio.css`.

**Step 2: Add `"use client"` to GitHub components**

Add `"use client";` as the first line of:
- `src/components/githubRepos/index.js`
- `src/components/githuhContributions/index.js`

Also remove the unused import in `src/components/githubRepos/index.js`:

```diff
- import { RiH2 } from '../../../node_modules/react-icons/ri/index.esm';
```

**Step 3: Create `src/app/portfolio/page.js`**

```jsx
import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Portfolio | Francisco Campos Diaz",
  description:
    "I'm a Full Stack Developer in love with Programming, Desing and Swim.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
```

**Step 4: Create `src/app/portfolio/PortfolioClient.js`**

```jsx
"use client";

import "./portfolio.css";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio } from "@/content_option";
import { GithubRepos } from "@/components/githubRepos";
import { GithubContributions } from "@/components/githuhContributions";

export default function PortfolioClient() {
  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Portfolio</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <div className="mb-5 po_items_ho">
        {dataportfolio.map((data, i) => (
          <div key={i} className="po_item">
            <img src={data.img} alt="" />
            <div className="content">
              <p>{data.description}</p>
              <a href={data.link}>view project</a>
            </div>
          </div>
        ))}
      </div>
      <GithubContributions />
      <GithubRepos />
    </Container>
  );
}
```

**Step 5: Verify**

```bash
yarn dev
```

Visit `http://localhost:3000/portfolio`.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: migrate portfolio page to Next.js"
```

---

### Task 7: Migrate Contact Page

**Files:**
- Create: `src/app/contact/page.js`
- Create: `src/app/contact/ContactClient.js`
- Move: `src/pages/contact/style.css` → `src/app/contact/contact.css`

**Step 1: Move CSS**

Move `src/pages/contact/style.css` to `src/app/contact/contact.css`.

**Step 2: Create `src/app/contact/page.js`**

```jsx
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Francisco Campos Diaz | Contact",
  description:
    "I'm a Full Stack Developer in love with Programming, Desing and Swim.",
};

export default function ContactPage() {
  return <ContactClient />;
}
```

**Step 3: Create `src/app/contact/ContactClient.js`**

```jsx
"use client";

import { useState } from "react";
import * as emailjs from "emailjs-com";
import "./contact.css";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "@/content_option";

export default function ContactClient() {
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata({ ...formData, loading: true });

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        (result) => {
          setFormdata({
            ...formData,
            loading: false,
            alertmessage: "SUCCESS! Thank you for your message",
            variant: "success",
            show: true,
          });
        },
        (error) => {
          setFormdata({
            ...formData,
            loading: false,
            alertmessage: `Failed to send! ${error.text}`,
            variant: "danger",
            show: true,
          });
        }
      );
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Contact Me</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="12">
          <Alert
            variant={formData.variant}
            className={`rounded-0 co_alert ${
              formData.show ? "d-block" : "d-none"
            }`}
            onClose={() => setFormdata({ ...formData, show: false })}
            dismissible
          >
            <p className="my-0">{formData.alertmessage}</p>
          </Alert>
        </Col>
        <Col lg="5" className="mb-5">
          <h3 className="color_sec py-4">Get in touch</h3>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />
            {contactConfig.YOUR_FONE && (
              <p>
                <strong>Phone:</strong> {contactConfig.YOUR_FONE}
              </p>
            )}
          </address>
          <p>{contactConfig.description}</p>
        </Col>
        <Col lg="7" className="d-flex align-items-center">
          <form onSubmit={handleSubmit} className="contact__form w-100">
            <Row>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name || ""}
                  type="text"
                  required
                  onChange={handleChange}
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email || ""}
                  required
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <br />
            <Row>
              <Col lg="12" className="form-group">
                <button className="btn ac_btn" type="submit">
                  {formData.loading ? "Sending..." : "Send"}
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
      {formData.loading && <div className="loading-bar"></div>}
    </Container>
  );
}
```

**Step 4: Verify**

```bash
yarn dev
```

Visit `http://localhost:3000/contact`.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: migrate contact page to Next.js"
```

---

### Task 8: Migrate Social Icons Component

**Files:**
- Modify: `src/components/socialicons/index.js`

**Step 1: Add `"use client"` directive (it doesn't need it since it's purely presentational, but its parent layout is a Server Component and it imports icons which are client-only)**

No changes needed — this component is already functional. Just verify the import path in `layout.js` resolves correctly with the `@/` alias. The `@/` alias needs to be configured.

**Step 2: Add jsconfig.json for path aliases**

Create `jsconfig.json` at the project root:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add path aliases, finalize component migration"
```

---

### Task 9: Set Up Contentful Client

**Files:**
- Create: `src/lib/contentful.js`

**Step 1: Create the Contentful helper**

Create `src/lib/contentful.js`:

```js
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getAllPosts() {
  const entries = await client.getEntries({
    content_type: "blogPost",
    order: ["-fields.publishedDate"],
  });

  return entries.items.map((item) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    coverImage: item.fields.coverImage?.fields?.file?.url
      ? `https:${item.fields.coverImage.fields.file.url}`
      : null,
    tags: item.fields.tags || [],
    publishedDate: item.fields.publishedDate,
  }));
}

export async function getPostBySlug(slug) {
  const entries = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  if (!entries.items.length) return null;

  const item = entries.items[0];
  return {
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    coverImage: item.fields.coverImage?.fields?.file?.url
      ? `https:${item.fields.coverImage.fields.file.url}`
      : null,
    tags: item.fields.tags || [],
    publishedDate: item.fields.publishedDate,
  };
}

export async function getAllSlugs() {
  const entries = await client.getEntries({
    content_type: "blogPost",
    select: ["fields.slug"],
  });

  return entries.items.map((item) => item.fields.slug);
}
```

**Step 2: Commit**

```bash
git add src/lib/contentful.js
git commit -m "feat: add Contentful client and data fetching helpers"
```

---

### Task 10: Create Blog Listing Page

**Files:**
- Create: `src/app/blog/page.js`
- Create: `src/app/blog/blog.css`
- Create: `src/components/blog/PostCard.js`

**Step 1: Create `src/app/blog/blog.css`**

```css
.blog-listing {
  padding-bottom: 4rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.post-card {
  border: 1px solid var(--secondary-color);
  padding: 0;
  transition: 0.3s ease;
  background: var(--primary-color);
}

.post-card:hover {
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.25);
}

.post-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-card .card-body {
  padding: 1.5rem;
}

.post-card .card-body h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.post-card .card-body .date {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 0.75rem;
}

.post-card .card-body p {
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.post-card .card-body .tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.post-card .card-body .tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border: 1px solid var(--secondary-color);
}

.post-card .card-body a {
  color: var(--text-color);
  border: solid 1px var(--text-color);
  padding: 4px 12px;
  text-decoration: none;
  font-size: 0.9rem;
}
```

**Step 2: Create `src/components/blog/PostCard.js`**

```jsx
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} />
      )}
      <div className="card-body">
        <p className="date">
          {new Date(post.publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3>{post.title}</h3>
        <div className="tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <p>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>Read more</Link>
      </div>
    </div>
  );
}
```

**Step 3: Create `src/app/blog/page.js`**

```jsx
import "./blog.css";
import { Container, Row, Col } from "react-bootstrap";
import { getAllPosts } from "@/lib/contentful";
import PostCard from "@/components/blog/PostCard";

export const metadata = {
  title: "Blog | Francisco Campos Diaz",
  description: "Articles about Web3, Blockchain, Full Stack Development, and more.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Container className="blog-listing">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Blog</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      {posts.length === 0 ? (
        <p>No posts yet. Check back soon!</p>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: create blog listing page with PostCard component"
```

---

### Task 11: Create Blog Post Page with AdSense

**Files:**
- Create: `src/app/blog/[slug]/page.js`
- Create: `src/app/blog/[slug]/post.css`
- Create: `src/components/blog/PostContent.js`
- Create: `src/components/blog/AdBanner.js`

**Step 1: Create `src/components/blog/AdBanner.js`**

```jsx
"use client";

import { useEffect, useRef } from "react";

export default function AdBanner({ slot, format = "auto", responsive = true }) {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ margin: "2rem 0", textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
```

Replace `ca-pub-XXXXXXX` and the `slot` values with your actual AdSense publisher ID and ad unit slot IDs once you have them.

**Step 2: Create `src/components/blog/PostContent.js`**

```jsx
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, fileName } = node.data.target.fields.file;
      return (
        <img
          src={`https:${url}`}
          alt={fileName}
          style={{ maxWidth: "100%", height: "auto", margin: "1rem 0" }}
        />
      );
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PostContent({ content }) {
  return (
    <div className="post-content">
      {documentToReactComponents(content, renderOptions)}
    </div>
  );
}
```

**Step 3: Create `src/app/blog/[slug]/post.css`**

```css
.post-header {
  margin-bottom: 2rem;
}

.post-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.post-meta {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 1rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.post-tags .tag {
  font-size: 0.8rem;
  padding: 2px 10px;
  border: 1px solid var(--secondary-color);
}

.post-cover {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  padding-bottom: 4rem;
}

.post-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.post-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.post-content p {
  margin-bottom: 1.25rem;
}

.post-content pre {
  background: var(--primary-color);
  border: 1px solid var(--secondary-color);
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.post-content code {
  font-size: 0.9rem;
}

.post-content blockquote {
  border-left: 4px solid var(--text-color-3);
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 8px 16px;
  border: 1px solid var(--secondary-color);
  text-decoration: none;
  color: var(--text-color);
}
```

**Step 4: Create `src/app/blog/[slug]/page.js`**

```jsx
import { notFound } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import { getPostBySlug, getAllSlugs } from "@/lib/contentful";
import PostContent from "@/components/blog/PostContent";
import AdBanner from "@/components/blog/AdBanner";
import Link from "next/link";
import "./post.css";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Francisco Campos Diaz`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Container>
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="10" className="mx-auto">
          <div className="post-header">
            <h1>{post.title}</h1>
            <p className="post-meta">
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="post-cover"
            />
          )}

          <AdBanner slot="YOUR_AD_SLOT_1" />

          <PostContent content={post.content} />

          <AdBanner slot="YOUR_AD_SLOT_2" />

          <Link href="/blog" className="back-link">
            &larr; Back to Blog
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: create blog post page with AdSense and rich text rendering"
```

---

### Task 12: Configure Sitemap and SEO

**Files:**
- Create: `next-sitemap.config.js`

**Step 1: Create `next-sitemap.config.js`**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sasasamaes.github.io",
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
```

The `postbuild` script in package.json (added in Task 1) already runs `next-sitemap` after build.

**Step 2: Commit**

```bash
git add next-sitemap.config.js
git commit -m "feat: add next-sitemap for SEO"
```

---

### Task 13: Clean Up Old CRA Files

**Files:**
- Delete: `src/pages/` (entire directory)
- Delete: `src/hooks/withRouter.js`
- Delete: `src/app/App.js`
- Delete: `src/app/App.css`
- Delete: `src/app/routes.js`
- Delete: `src/index.js`
- Delete: `src/index.css`
- Delete: `public/index.html`
- Delete: `public/manifest.json`

**Step 1: Remove old files**

```bash
rm -rf src/pages
rm -f src/hooks/withRouter.js
rm -f src/index.js
rm -f src/index.css
rm -f public/index.html
rm -f public/manifest.json
```

Note: `src/app/App.js`, `src/app/App.css`, and `src/app/routes.js` should already have been replaced by the new Next.js files. If they still exist, delete them too:

```bash
rm -f src/app/App.js src/app/App.css src/app/routes.js
```

**Step 2: Verify build**

```bash
yarn build
```

Expected: Build succeeds with all pages generated.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old CRA files"
```

---

### Task 14: Set Up Contentful Space

This is a manual task done in the Contentful web UI (not code).

**Step 1: Create a free Contentful account**

Go to https://www.contentful.com/sign-up/

**Step 2: Create a new Space**

Name it "Portfolio Blog" or similar.

**Step 3: Create the "Blog Post" content type**

In the Contentful dashboard, go to Content model → Add content type:

- **Name:** Blog Post
- **API Identifier:** blogPost

Add these fields:
| Field Name    | Field Type   | Settings                     |
|---------------|-------------|------------------------------|
| title         | Short text  | Required                     |
| slug          | Short text  | Required, Unique             |
| excerpt       | Short text  | Required                     |
| content       | Rich text   | Required                     |
| coverImage    | Media       | Images only                  |
| tags          | Short text  | List (enable "List" toggle)  |
| publishedDate | Date & time | Required                     |

**Step 4: Get API keys**

Go to Settings → API keys → Add API key.

Copy the **Space ID** and **Content Delivery API access token** into your `.env.local`:

```
CONTENTFUL_SPACE_ID=your_actual_space_id
CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
```

**Step 5: Create a test post**

In Content → Add entry → Blog Post:
- Title: "Hello World"
- Slug: "hello-world"
- Excerpt: "My first blog post"
- Content: Write some test content
- Tags: "tech"
- Published Date: today

Click **Publish**.

**Step 6: Verify locally**

```bash
yarn dev
```

Visit `http://localhost:3000/blog` — should see the test post card.
Visit `http://localhost:3000/blog/hello-world` — should see the full post.

---

### Task 15: Deploy to Vercel

**Step 1: Push branch to GitHub**

```bash
git push -u origin feat/nextjs-migration
```

**Step 2: Connect to Vercel**

1. Go to https://vercel.com and sign in with GitHub
2. Click "Import Project" → select the `sasasamaes.github.io` repository
3. Framework preset: Next.js (auto-detected)
4. Add environment variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
5. Deploy

**Step 3: Set up Contentful webhook for redeployment**

1. In Vercel project settings → Git → Deploy Hooks → create a hook named "Contentful"
2. Copy the webhook URL
3. In Contentful → Settings → Webhooks → Add webhook:
   - URL: paste the Vercel deploy hook URL
   - Triggers: Entry → Publish, Unpublish

**Step 4: Set up Google AdSense**

1. Go to https://www.google.com/adsense/
2. Sign up / sign in
3. Add your Vercel domain
4. Replace `ca-pub-XXXXXXX` in `src/app/layout.js` and `src/components/blog/AdBanner.js` with your actual publisher ID
5. Create ad units and replace `YOUR_AD_SLOT_1` and `YOUR_AD_SLOT_2` in `src/app/blog/[slug]/page.js`

**Step 5: Merge to main when everything works**

```bash
git checkout master
git merge feat/nextjs-migration
git push
```
