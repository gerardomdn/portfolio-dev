# i18n + Theme Toggle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add multi-language support (EN/ES) with prefixed routes `/en/`, `/es/` using next-intl, and replace the theme toggle icon with an animated sun/moon CSS switch.

**Architecture:** next-intl handles routing, middleware language detection, and translation loading. All pages move under `src/app/[locale]/`. Translation JSON files replace `content_option.js`. The theme toggle becomes a pure CSS animated switch. Language toggle (EN|ES) sits next to the theme switch in the header.

**Tech Stack:** next-intl, Next.js 14 App Router, CSS animations

---

### Task 1: Install next-intl and Configure Routing

**Files:**
- Modify: `package.json`
- Create: `src/i18n/routing.js`
- Create: `src/i18n/request.js`
- Create: `src/middleware.js`
- Modify: `next.config.js`

**Step 1: Install next-intl**

```bash
corepack yarn add next-intl
```

**Step 2: Create `src/i18n/routing.js`**

```js
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
});
```

**Step 3: Create `src/i18n/request.js`**

```js
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

**Step 4: Create `src/middleware.js`**

```js
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

**Step 5: Update `next.config.js`**

```js
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

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

module.exports = withNextIntl(nextConfig);
```

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: install next-intl and configure i18n routing"
```

---

### Task 2: Create Translation Files

**Files:**
- Create: `messages/en.json`
- Create: `messages/es.json`
- Delete: `src/content_option.js` (after migration)

**Step 1: Create `messages/en.json`**

```json
{
  "logotext": "sasasamaes",
  "nav": {
    "home": "Home",
    "about": "About",
    "portfolio": "Portfolio",
    "blog": "Blog",
    "contact": "Contact"
  },
  "home": {
    "title": "I'm Francisco Campos Diaz",
    "animated": {
      "first": "I love coding",
      "second": "I develop blockchain and Web3 apps",
      "third": "I Sensei in Dev.f"
    },
    "description": "Full Stack Developer with expertise in Web3, Blockchain, Next.js, TypeScript, Cairo, and Solidity. Skilled in building dApps, integrating AI, and working with MongoDB and PostgreSQL for scalable solutions. Passionate about creating secure, innovative digital experiences.",
    "yourImgUrl": "https://media.licdn.com/dms/image/v2/D4E03AQFk2oVtP_WTNw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666820900761?e=1736380800&v=beta&t=AA_Ia7gFpzb6vJt7Y5jWENh7LFtz74yjOx90CWlkWYk",
    "btnPortfolio": "My Portfolio",
    "btnContact": "Contact Me"
  },
  "about": {
    "pageTitle": "About me",
    "title": "About me",
    "aboutme": "Experienced Full Stack Developer specializing in Web3 and Blockchain solutions, with proficiency in Next.js, TypeScript, Cairo, and Solidity. Skilled in developing decentralized applications (dApps) and smart contracts with a deep understanding of both front-end and back-end ecosystems. Strong background in AI integration, enhancing applications with data-driven insights and automation. Extensive experience with databases like MongoDB and PostgreSQL, ensuring robust and scalable storage solutions. Passionate about leveraging cutting-edge technology to build secure and innovative digital experiences.",
    "workTimelineTitle": "Work Timeline",
    "skillsTitle": "Skills",
    "servicesTitle": "Services"
  },
  "worktimeline": [
    { "jobtitle": "Open Source Developer", "where": "Only Dust", "url": "https://onlydust.com", "date": "2024" },
    { "jobtitle": "Sensei", "where": "DEV.f", "url": "https://devf.mx", "date": "2019 - 2024" },
    { "jobtitle": "Frontend Developer", "where": "Elevar Salud", "url": "https://www.elevarsalud.com", "date": "2023 - 2024" },
    { "jobtitle": "Full Stack Developer", "where": "Arrenda", "url": "https://ziff.com.mx", "date": "2022 - 2023" },
    { "jobtitle": "Frontend Developer", "where": "Gamanza", "url": "https://gamanza.com", "date": "2019 - 2021" },
    { "jobtitle": "Student Mentor", "where": "GDG Pura Vida", "url": "https://gdg.community.dev/gdg-pura-vida/", "date": "2020" },
    { "jobtitle": "Frontend Developer", "where": "CreativeDrive", "url": "https://www.linkedin.com/company/wearecd/posts/?feedView=all", "date": "2017 - 2019" }
  ],
  "skills": [
    { "name": "Javascript", "value": 100 },
    { "name": "React", "value": 90 },
    { "name": "Next.js", "value": 90 },
    { "name": "TypeScript", "value": 90 },
    { "name": "Python", "value": 65 },
    { "name": "Django", "value": 60 },
    { "name": "Php", "value": 80 },
    { "name": "Cairo", "value": 60 },
    { "name": "PostgreSQL", "value": 60 },
    { "name": "MongoDB", "value": 60 },
    { "name": "Solidity", "value": 60 },
    { "name": "UML", "value": 80 },
    { "name": "Scrum", "value": 100 },
    { "name": "Entity Model", "value": 100 },
    { "name": "Ai", "value": 80 },
    { "name": "StarkNet", "value": 60 },
    { "name": "Open Source", "value": 70 }
  ],
  "services": [
    { "title": "Web3 & Blockchain", "description": "I offer comprehensive Web3 and Blockchain development services, focusing on creating secure, scalable, and user-friendly decentralized applications (dApps) and smart contracts. With expertise in Solidity, Cairo, and modern blockchain frameworks, I develop solutions for Ethereum, StarkNet, and other networks, including tokenization, NFTs, and DeFi projects. My services ensure transparent, optimized digital experiences, guiding projects from concept to deployment with a strong emphasis on security, performance, and real-world usability." },
    { "title": "Full stack Development", "description": "I provide Full Stack Development services focused on delivering dynamic, responsive, and scalable web applications. With expertise in modern frameworks like Next.js and TypeScript, I create seamless user experiences on the front end, while ensuring efficient data handling and robust functionality on the back end. Proficient in both relational and non-relational databases like PostgreSQL and MongoDB, I build solutions that prioritize security, performance, and usability. My approach is rooted in leveraging best practices and the latest technologies to deliver innovative digital solutions tailored to each project's unique needs." },
    { "title": "Sensei", "description": "As a Sensei at DEV.F, I mentor and guide aspiring developers, sharing insights and hands-on experience in Full Stack and Web3 technologies. Through workshops, code reviews, and personalized feedback, I help students build a strong technical foundation and practical skills in areas like JavaScript, Next.js, TypeScript, and Blockchain. My goal is to empower developers to solve real-world problems effectively, foster a collaborative learning environment, and inspire continuous growth and innovation in the tech community." }
  ],
  "dataportfolio": [
    { "title": "Only Dust", "img": "https://i.postimg.cc/g0Ss7DNm/onlydust.png", "description": "Each month, I join Only Dust hackathons, contributing to open-source blockchain projects, building Web3 solutions, and collaborating to tackle real-world challenges in decentralized technology.", "link": "https://onlydust.com" },
    { "title": "ETH Pura Vida Hackaton", "img": "https://i.postimg.cc/Y9t7XtnJ/Screenshot-2024-11-06-at-1-09-02-AM.png", "description": "Create a decentralized financial tool that facilitates access to trusts for farmers and agricultural workers in general in Costa Rica, through the resources provided by BlockChain technology.", "link": "https://devfolio.co/projects/revolutionary-farmers-b88c" },
    { "title": "DEV.f", "img": "https://i.postimg.cc/Dwhx4mSk/devf.png", "description": "As a Sensei at DEV.F, I mentor aspiring developers, offering guidance in Full Stack and Web3 technologies. Through workshops and code reviews, I help students build strong technical skills in JavaScript, html, js, css.", "link": "https://devf.mx" },
    { "title": "StarkHack Hackathon", "img": "https://i.postimg.cc/g2KNVdhw/starkhack.png", "description": "I participated in an online hackathon where we developed a product for an academy focused on learning Starknet and Cairo.", "link": "https://ethglobal.com/showcase/ninja-academy-hvt1d" },
    { "title": "Elevar Salud", "img": "https://i.postimg.cc/ZRWHzdM3/elevar-Salud.png", "description": "I contributed to all stages of the software development lifecycle, helping design and develop two key telemedicine applications for patients and doctors using React, Next.js, and TypeScript.", "link": "https://www.elevarsalud.com" },
    { "title": "Arrenda", "img": "https://i.postimg.cc/BZdYsmsv/arrenda.png", "description": "At Arrenda, my role spanned both frontend and backend development, where I contributed to the design and creation of modules using Node.js and Vue.js.", "link": "https://ziff.com.mx/" },
    { "title": "Gamanza", "img": "https://i.postimg.cc/q7MQQYc1/gamanza.png", "description": "I developed specialized CRM systems for the casino industry, from design to implementation, improving customer interaction and optimizing operations.", "link": "https://gamanza.com/real-time-crm/" }
  ],
  "contact": {
    "pageTitle": "Contact Me",
    "getInTouch": "Get in touch",
    "email": "hey@francampos.me",
    "phone": "(+506)7219-9678",
    "description": "Get in touch with me for collaboration, consultations, or any inquiries. Whether you need help with Full Stack development, Web3 solutions, or blockchain projects, I'm here to assist. Reach out, and let's discuss how we can work together to bring your ideas to life!",
    "namePlaceholder": "Name",
    "emailPlaceholder": "Email",
    "messagePlaceholder": "Message",
    "sendButton": "Send",
    "sending": "Sending...",
    "successMessage": "SUCCESS! Thank you for your message",
    "failMessage": "Failed to send!"
  },
  "blog": {
    "pageTitle": "Blog",
    "description": "Articles about Web3, Blockchain, Full Stack Development, and more.",
    "noPosts": "No posts yet. Check back soon!",
    "readMore": "Read more",
    "backToBlog": "Back to Blog"
  },
  "portfolio": {
    "pageTitle": "Portfolio",
    "viewProject": "view project",
    "reposTitle": "Github repositories",
    "prsTitle": "Accepted Pull Requests",
    "viewRepo": "View Repository",
    "viewPR": "View Pull Request",
    "noPRs": "No accepted pull requests found.",
    "noDescription": "No description available"
  },
  "social": {
    "github": "https://github.com/sasasamaes",
    "facebook": "https://facebook.com/sasasamaes",
    "linkedin": "https://linkedin.com/in/francisco-campos-5225b842/",
    "twitter": "https://x.com/sasasamaes"
  },
  "footer": {
    "copyright": "copyright __ sasasamaes",
    "followMe": "Follow Me"
  },
  "emailjs": {
    "serviceId": "service_id",
    "templateId": "template_id",
    "userId": "user_id"
  },
  "meta": {
    "title": "Francisco Campos Diaz",
    "description": "I'm a Full Stack Developer in love with Programming, Desing and Swim."
  }
}
```

**Step 2: Create `messages/es.json`**

Same structure but with Spanish translations. Key differences:

```json
{
  "logotext": "sasasamaes",
  "nav": {
    "home": "Inicio",
    "about": "Acerca de",
    "portfolio": "Portafolio",
    "blog": "Blog",
    "contact": "Contacto"
  },
  "home": {
    "title": "Soy Francisco Campos Diaz",
    "animated": {
      "first": "Amo programar",
      "second": "Desarrollo apps blockchain y Web3",
      "third": "Soy Sensei en Dev.f"
    },
    "description": "Desarrollador Full Stack con experiencia en Web3, Blockchain, Next.js, TypeScript, Cairo y Solidity. Experto en construir dApps, integrar IA y trabajar con MongoDB y PostgreSQL para soluciones escalables. Apasionado por crear experiencias digitales seguras e innovadoras.",
    "yourImgUrl": "https://media.licdn.com/dms/image/v2/D4E03AQFk2oVtP_WTNw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666820900761?e=1736380800&v=beta&t=AA_Ia7gFpzb6vJt7Y5jWENh7LFtz74yjOx90CWlkWYk",
    "btnPortfolio": "Mi Portafolio",
    "btnContact": "Contactame"
  },
  "about": {
    "pageTitle": "Acerca de mi",
    "title": "Acerca de mi",
    "aboutme": "Desarrollador Full Stack experimentado especializado en soluciones Web3 y Blockchain, con dominio de Next.js, TypeScript, Cairo y Solidity. Experto en el desarrollo de aplicaciones descentralizadas (dApps) y contratos inteligentes con un profundo conocimiento de ecosistemas front-end y back-end. Amplia experiencia en integracion de IA, mejorando aplicaciones con analisis de datos y automatizacion. Extensa experiencia con bases de datos como MongoDB y PostgreSQL, asegurando soluciones de almacenamiento robustas y escalables. Apasionado por aprovechar la tecnologia de vanguardia para construir experiencias digitales seguras e innovadoras.",
    "workTimelineTitle": "Experiencia Laboral",
    "skillsTitle": "Habilidades",
    "servicesTitle": "Servicios"
  },
  "worktimeline": [
    { "jobtitle": "Desarrollador Open Source", "where": "Only Dust", "url": "https://onlydust.com", "date": "2024" },
    { "jobtitle": "Sensei", "where": "DEV.f", "url": "https://devf.mx", "date": "2019 - 2024" },
    { "jobtitle": "Desarrollador Frontend", "where": "Elevar Salud", "url": "https://www.elevarsalud.com", "date": "2023 - 2024" },
    { "jobtitle": "Desarrollador Full Stack", "where": "Arrenda", "url": "https://ziff.com.mx", "date": "2022 - 2023" },
    { "jobtitle": "Desarrollador Frontend", "where": "Gamanza", "url": "https://gamanza.com", "date": "2019 - 2021" },
    { "jobtitle": "Mentor Estudiantil", "where": "GDG Pura Vida", "url": "https://gdg.community.dev/gdg-pura-vida/", "date": "2020" },
    { "jobtitle": "Desarrollador Frontend", "where": "CreativeDrive", "url": "https://www.linkedin.com/company/wearecd/posts/?feedView=all", "date": "2017 - 2019" }
  ],
  "skills": [
    { "name": "Javascript", "value": 100 },
    { "name": "React", "value": 90 },
    { "name": "Next.js", "value": 90 },
    { "name": "TypeScript", "value": 90 },
    { "name": "Python", "value": 65 },
    { "name": "Django", "value": 60 },
    { "name": "Php", "value": 80 },
    { "name": "Cairo", "value": 60 },
    { "name": "PostgreSQL", "value": 60 },
    { "name": "MongoDB", "value": 60 },
    { "name": "Solidity", "value": 60 },
    { "name": "UML", "value": 80 },
    { "name": "Scrum", "value": 100 },
    { "name": "Modelo Entidad", "value": 100 },
    { "name": "IA", "value": 80 },
    { "name": "StarkNet", "value": 60 },
    { "name": "Open Source", "value": 70 }
  ],
  "services": [
    { "title": "Web3 & Blockchain", "description": "Ofrezco servicios integrales de desarrollo Web3 y Blockchain, enfocados en crear aplicaciones descentralizadas (dApps) y contratos inteligentes seguros, escalables y faciles de usar. Con experiencia en Solidity, Cairo y frameworks blockchain modernos, desarrollo soluciones para Ethereum, StarkNet y otras redes, incluyendo tokenizacion, NFTs y proyectos DeFi." },
    { "title": "Desarrollo Full Stack", "description": "Proporciono servicios de Desarrollo Full Stack enfocados en entregar aplicaciones web dinamicas, responsivas y escalables. Con experiencia en frameworks modernos como Next.js y TypeScript, creo experiencias de usuario fluidas en el front-end, asegurando un manejo eficiente de datos y funcionalidad robusta en el back-end." },
    { "title": "Sensei", "description": "Como Sensei en DEV.F, mentoreo y guio a desarrolladores aspirantes, compartiendo conocimientos y experiencia practica en tecnologias Full Stack y Web3. A traves de talleres, revisiones de codigo y retroalimentacion personalizada, ayudo a los estudiantes a construir una base tecnica solida." }
  ],
  "dataportfolio": [
    { "title": "Only Dust", "img": "https://i.postimg.cc/g0Ss7DNm/onlydust.png", "description": "Cada mes, participo en hackathones de Only Dust, contribuyendo a proyectos blockchain de codigo abierto, construyendo soluciones Web3 y colaborando para enfrentar desafios del mundo real en tecnologia descentralizada.", "link": "https://onlydust.com" },
    { "title": "ETH Pura Vida Hackaton", "img": "https://i.postimg.cc/Y9t7XtnJ/Screenshot-2024-11-06-at-1-09-02-AM.png", "description": "Crear una herramienta financiera descentralizada que facilite el acceso a fideicomisos para agricultores y trabajadores agricolas en Costa Rica, a traves de los recursos que proporciona la tecnologia Blockchain.", "link": "https://devfolio.co/projects/revolutionary-farmers-b88c" },
    { "title": "DEV.f", "img": "https://i.postimg.cc/Dwhx4mSk/devf.png", "description": "Como Sensei en DEV.F, mentoreo a desarrolladores aspirantes, ofreciendo orientacion en tecnologias Full Stack y Web3. A traves de talleres y revisiones de codigo, ayudo a los estudiantes a construir habilidades tecnicas solidas.", "link": "https://devf.mx" },
    { "title": "StarkHack Hackathon", "img": "https://i.postimg.cc/g2KNVdhw/starkhack.png", "description": "Participe en un hackathon en linea donde desarrollamos un producto para una academia enfocada en aprender Starknet y Cairo.", "link": "https://ethglobal.com/showcase/ninja-academy-hvt1d" },
    { "title": "Elevar Salud", "img": "https://i.postimg.cc/ZRWHzdM3/elevar-Salud.png", "description": "Contribui a todas las etapas del ciclo de desarrollo de software, ayudando a disenar y desarrollar dos aplicaciones clave de telemedicina para pacientes y medicos usando React, Next.js y TypeScript.", "link": "https://www.elevarsalud.com" },
    { "title": "Arrenda", "img": "https://i.postimg.cc/BZdYsmsv/arrenda.png", "description": "En Arrenda, mi rol abarcaba tanto el desarrollo frontend como backend, donde contribui al diseno y creacion de modulos usando Node.js y Vue.js.", "link": "https://ziff.com.mx/" },
    { "title": "Gamanza", "img": "https://i.postimg.cc/q7MQQYc1/gamanza.png", "description": "Desarrolle sistemas CRM especializados para la industria de casinos, desde el diseno hasta la implementacion, mejorando la interaccion con clientes y optimizando operaciones.", "link": "https://gamanza.com/real-time-crm/" }
  ],
  "contact": {
    "pageTitle": "Contacto",
    "getInTouch": "Ponte en contacto",
    "email": "hey@francampos.me",
    "phone": "(+506)7219-9678",
    "description": "Contactame para colaboraciones, consultorias o cualquier consulta. Ya sea que necesites ayuda con desarrollo Full Stack, soluciones Web3 o proyectos blockchain, estoy aqui para ayudarte. Escribeme y discutamos como podemos trabajar juntos para hacer realidad tus ideas.",
    "namePlaceholder": "Nombre",
    "emailPlaceholder": "Correo",
    "messagePlaceholder": "Mensaje",
    "sendButton": "Enviar",
    "sending": "Enviando...",
    "successMessage": "EXITO! Gracias por tu mensaje",
    "failMessage": "Error al enviar!"
  },
  "blog": {
    "pageTitle": "Blog",
    "description": "Articulos sobre Web3, Blockchain, Desarrollo Full Stack y mas.",
    "noPosts": "Aun no hay publicaciones. Vuelve pronto!",
    "readMore": "Leer mas",
    "backToBlog": "Volver al Blog"
  },
  "portfolio": {
    "pageTitle": "Portafolio",
    "viewProject": "ver proyecto",
    "reposTitle": "Repositorios de Github",
    "prsTitle": "Pull Requests Aceptados",
    "viewRepo": "Ver Repositorio",
    "viewPR": "Ver Pull Request",
    "noPRs": "No se encontraron pull requests aceptados.",
    "noDescription": "Sin descripcion disponible"
  },
  "social": {
    "github": "https://github.com/sasasamaes",
    "facebook": "https://facebook.com/sasasamaes",
    "linkedin": "https://linkedin.com/in/francisco-campos-5225b842/",
    "twitter": "https://x.com/sasasamaes"
  },
  "footer": {
    "copyright": "copyright __ sasasamaes",
    "followMe": "Sigueme"
  },
  "emailjs": {
    "serviceId": "service_id",
    "templateId": "template_id",
    "userId": "user_id"
  },
  "meta": {
    "title": "Francisco Campos Diaz",
    "description": "Soy un Desarrollador Full Stack apasionado por la Programacion, el Diseno y la Natacion."
  }
}
```

**Step 3: Delete `src/content_option.js`**

```bash
rm src/content_option.js
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add EN/ES translation files, remove content_option.js"
```

---

### Task 3: Restructure App Router for [locale]

**Files:**
- Create: `src/app/[locale]/layout.js`
- Modify: `src/app/layout.js` (strip down to minimal root)
- Move: all page files into `src/app/[locale]/`

**Step 1: Create minimal root layout `src/app/layout.js`**

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return children;
}
```

This is the minimal root — no `<html>` or `<body>` tags here. Those move to the locale layout.

**Step 2: Create `src/app/[locale]/layout.js`**

```jsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Headermain from "@/header";
import { Socialicons } from "@/components/socialicons";
import ThemeProvider from "@/components/themetoggle/ThemeProvider";
import AnimatedCursorWrapper from "@/components/AnimatedCursorWrapper";
import Script from "next/script";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&family=Marcellus&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <AnimatedCursorWrapper />
            <Headermain />
            <div className="s_c">
              {children}
              <Socialicons />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
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

**Step 3: Move all page files from `src/app/` to `src/app/[locale]/`**

```bash
mkdir -p src/app/\[locale\]
mv src/app/page.js src/app/\[locale\]/page.js
mv src/app/HomeClient.js src/app/\[locale\]/HomeClient.js
mv src/app/home.css src/app/\[locale\]/home.css
mv src/app/about src/app/\[locale\]/about
mv src/app/portfolio src/app/\[locale\]/portfolio
mv src/app/contact src/app/\[locale\]/contact
mv src/app/blog src/app/\[locale\]/blog
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: restructure app router with [locale] segment"
```

---

### Task 4: Update All Pages to Use Translations

**Files:**
- Modify: `src/app/[locale]/page.js`
- Modify: `src/app/[locale]/HomeClient.js`
- Modify: `src/app/[locale]/about/page.js`
- Modify: `src/app/[locale]/about/AboutClient.js`
- Modify: `src/app/[locale]/portfolio/page.js`
- Modify: `src/app/[locale]/portfolio/PortfolioClient.js`
- Modify: `src/app/[locale]/contact/page.js`
- Modify: `src/app/[locale]/contact/ContactClient.js`
- Modify: `src/app/[locale]/blog/page.js`
- Modify: `src/app/[locale]/blog/BlogClient.js`
- Modify: `src/app/[locale]/blog/[slug]/page.js`
- Modify: `src/app/[locale]/blog/[slug]/BlogPostClient.js`

**Key pattern for every page:**

Server components (page.js files):
- Add `import { getTranslations, setRequestLocale } from "next-intl/server";`
- Get locale from `params`
- Call `setRequestLocale(locale)` for static rendering
- Use `const t = await getTranslations();` for metadata
- Remove all imports from `@/content_option`

Client components:
- Add `import { useTranslations } from "next-intl";`
- Use `const t = useTranslations();` to get translated strings
- Access nested keys: `t("home.title")`, `t("nav.home")`
- For arrays (worktimeline, skills, etc.): use `t.raw("worktimeline")` to get the raw JSON array
- Remove all imports from `@/content_option`

**Example — `src/app/[locale]/page.js`:**

```jsx
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomeClient from "./HomeClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeClient />;
}
```

**Example — `src/app/[locale]/HomeClient.js`:**

```jsx
"use client";
import "./home.css";
import Typewriter from "typewriter-effect";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomeClient() {
  const t = useTranslations();
  return (
    <section id="home" className="home">
      <div className="intro_sec d-block d-lg-flex align-items-center">
        <div className="h_bg-image order-1 order-lg-2 h-100" style={{ backgroundImage: `url(${t("home.yourImgUrl")})` }}></div>
        <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
          <div className="align-self-center">
            <div className="intro mx-auto">
              <h2 className="mb-1x">{t("home.title")}</h2>
              <h1 className="fluidz-48 mb-1x">
                <Typewriter options={{ strings: [t("home.animated.first"), t("home.animated.second"), t("home.animated.third")], autoStart: true, loop: true, deleteSpeed: 10 }} />
              </h1>
              <p className="mb-1x">{t("home.description")}</p>
              <div className="intro_btn-action pb-5">
                <Link href="/portfolio" className="text_2">
                  <div id="button_p" className="ac_btn btn">{t("home.btnPortfolio")}<div className="ring one"></div><div className="ring two"></div><div className="ring three"></div></div>
                </Link>
                <Link href="/contact">
                  <div id="button_h" className="ac_btn btn">{t("home.btnContact")}<div className="ring one"></div><div className="ring two"></div><div className="ring three"></div></div>
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

Apply the same pattern to ALL client components. For arrays use `t.raw()`:

```jsx
// In AboutClient.js
const worktimeline = t.raw("worktimeline");
const skillsList = t.raw("skills");
const servicesList = t.raw("services");
// Then map over them as before
```

**Also update all `Link` components** — next-intl automatically prefixes the locale, so `href="/about"` becomes `/en/about` or `/es/about` automatically. But you must use `next-intl`'s Link:

```jsx
import { Link } from "@/i18n/navigation";
```

Create `src/i18n/navigation.js`:

```js
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

Replace ALL `import Link from "next/link"` with `import { Link } from "@/i18n/navigation"` in every component.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: update all pages and components to use translations"
```

---

### Task 5: Update Header with Language Toggle

**Files:**
- Modify: `src/header/index.js`
- Create: `src/components/languagetoggle/index.js`
- Create: `src/components/languagetoggle/style.css`

**Step 1: Create `src/components/languagetoggle/style.css`**

```css
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  font-family: Marcellus;
  font-size: 0.9rem;
  font-weight: bold;
  height: 50px;
  z-index: 1000;
}

.lang-toggle button {
  background: none;
  border: none;
  color: var(--text-color-2);
  opacity: 0.4;
  cursor: pointer;
  padding: 2px 4px;
  font-family: Marcellus;
  font-size: 0.9rem;
  font-weight: bold;
  transition: opacity 0.2s;
}

.lang-toggle button.active {
  opacity: 1;
}

.lang-toggle span {
  color: var(--text-color-2);
  opacity: 0.4;
}
```

**Step 2: Create `src/components/languagetoggle/index.js`**

```jsx
"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import "./style.css";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="lang-toggle">
      <button className={locale === "en" ? "active" : ""} onClick={() => switchLocale("en")}>EN</button>
      <span>|</span>
      <button className={locale === "es" ? "active" : ""} onClick={() => switchLocale("es")}>ES</button>
    </div>
  );
}
```

**Step 3: Update `src/header/index.js`**

- Replace `import { logotext, socialprofils } from "@/content_option"` with `import { useTranslations } from "next-intl"`
- Replace `import Link from "next/link"` with `import { Link } from "@/i18n/navigation"`
- Add `import LanguageToggle from "@/components/languagetoggle"`
- Use `t("logotext")`, `t("nav.home")`, etc. for all text
- Add `<LanguageToggle />` next to `<Themetoggle />`

**Step 4: Update `src/components/socialicons/index.js`**

- Replace `import { socialprofils } from "@/content_option"` with `import { useTranslations } from "next-intl"`
- Use `const t = useTranslations(); const socialprofils = t.raw("social");`

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add language toggle to header, update social icons"
```

---

### Task 6: Animated Theme Toggle (Sun/Moon)

**Files:**
- Modify: `src/components/themetoggle/index.js`
- Modify: `src/components/themetoggle/style.css`

**Step 1: Replace `src/components/themetoggle/style.css`**

```css
.theme-switch {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  z-index: 1000;
}

.theme-switch__toggle {
  position: relative;
  width: 48px;
  height: 24px;
  background: var(--secondary-color);
  border-radius: 12px;
  cursor: pointer;
  border: none;
  padding: 0;
  transition: background 0.3s;
}

.theme-switch__circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  transition: transform 0.3s ease, background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-switch__circle svg {
  width: 14px;
  height: 14px;
  fill: var(--secondary-color);
}

.theme-switch--light .theme-switch__circle {
  transform: translateX(24px);
}
```

**Step 2: Replace `src/components/themetoggle/index.js`**

```jsx
"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
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
    <div className="theme-switch">
      <button
        className={`theme-switch__toggle ${theme === "light" ? "theme-switch--light" : ""}`}
        onClick={toggle}
        aria-label="Toggle theme"
      >
        <div className="theme-switch__circle">
          {theme === "dark" ? <FiMoon /> : <FiSun />}
        </div>
      </button>
    </div>
  );
};

export default Themetoggle;
```

`FiSun` and `FiMoon` are from `react-icons/fi` (Feather Icons), already installed via `react-icons`.

**Step 3: Verify dev server**

```bash
corepack yarn dev
```

Check that the toggle animates and switches between sun/moon icons.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: replace theme toggle with animated sun/moon switch"
```

---

### Task 7: Update GitHub Components with Translations

**Files:**
- Modify: `src/components/githubRepos/index.js`
- Modify: `src/components/githuhContributions/index.js`

**Step 1: Update `src/components/githubRepos/index.js`**

- Add `import { useTranslations } from "next-intl";`
- Use `const t = useTranslations("portfolio");`
- Replace hardcoded strings: `t("reposTitle")`, `t("viewRepo")`, `t("noDescription")`

**Step 2: Update `src/components/githuhContributions/index.js`**

- Add `import { useTranslations } from "next-intl";`
- Use `const t = useTranslations("portfolio");`
- Replace hardcoded strings: `t("prsTitle")`, `t("viewPR")`, `t("noPRs")`

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add translations to GitHub components"
```

---

### Task 8: Update SEO (hreflang + sitemap)

**Files:**
- Modify: `next-sitemap.config.js`
- Modify: each `page.js` `generateMetadata` function

**Step 1: Update `next-sitemap.config.js`**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sasasamaes.github.io",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  alternateRefs: [
    { href: "https://sasasamaes.github.io/en", hreflang: "en" },
    { href: "https://sasasamaes.github.io/es", hreflang: "es" },
  ],
};
```

**Step 2: Ensure `generateMetadata` in each page includes alternates**

The locale layout already has `alternates.languages` in its metadata. Each page's `generateMetadata` should also include page-specific alternates:

```jsx
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("about.pageTitle") + " | " + t("meta.title"),
    description: t("meta.description"),
    alternates: {
      languages: { en: "/en/about", es: "/es/about" },
    },
  };
}
```

Apply this pattern to every `page.js`.

**Step 3: Verify build**

```bash
corepack yarn build
```

Expected: all routes generate under `/en/` and `/es/`.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hreflang alternates and update sitemap for i18n"
```

---

### Task 9: Cleanup and Final Verification

**Files:**
- Verify no remaining imports from `@/content_option`
- Verify build passes
- Verify all routes work

**Step 1: Search for leftover content_option imports**

```bash
grep -r "content_option" src/
```

Expected: no results. If any remain, update them to use translations.

**Step 2: Verify build**

```bash
corepack yarn build
```

Expected: all routes generate correctly under both `/en/` and `/es/`.

**Step 3: Test locally**

```bash
corepack yarn dev
```

- Visit `http://localhost:3000` → should redirect to `/en/`
- Visit `/en/` → English home page
- Visit `/es/` → Spanish home page
- Click EN|ES toggle → switches language
- Click sun/moon toggle → switches theme
- Navigate all pages in both languages

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: cleanup and verify i18n + theme toggle"
```
