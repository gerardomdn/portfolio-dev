"use client";
import "./home.css";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomeClient() {
  const t = useTranslations();
  const work = t.raw("dataportfolio");
  return (
    <main className="home">
      <section className="hero-grid" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> {t("home.design.location")}</p>
          <p className="hero-name">{t("home.animated.first")}</p>
          <h1 id="hero-title" className="personal-heading">gerardo</h1>
          <p className="hero-description">{t("home.description")}</p>
          <div className="hero-actions">
            <Link href="/portfolio" className="solid-link">{t("home.btnPortfolio")} <span aria-hidden="true">↗</span></Link>
            <Link href="/contact" className="contact-link">{t("home.btnContact")} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="identity-art" aria-label={t("home.design.artLabel")} role="img">
          <div className="art-top"><span>GERARDO / MDN</span><span>35.68° N<br />139.69° E</span></div>
          <span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" />
          <span className="art-monogram" aria-hidden="true">g<span>m</span></span>
          <span className="art-sticker" aria-hidden="true">↗</span>
          <div className="art-bottom"><span>MX → JP</span><span>{t("home.design.artCaption")}</span></div>
        </div>
      </section>
      <div className="specialties" aria-label={t("about.skillsTitle")}><span>REACT / TYPESCRIPT</span><span aria-hidden="true">✳</span><span>{t("home.design.architecture")}</span><span aria-hidden="true">✳</span><span>{t("home.design.accessibility")}</span></div>
      <section className="home-work" aria-labelledby="selected-title">
        <div className="section-heading"><div><p className="eyebrow">01 / {t("home.design.chapter")}</p><h2 id="selected-title">{t("portfolio.pageTitle")}</h2></div><Link href="/about">{t("home.design.story")} <span aria-hidden="true">↗</span></Link></div>
        <div className="work-list">{work.map((item, i) => <a className="work-row" href={item.link} target="_blank" rel="noopener noreferrer" key={item.title}><span className="work-index">0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p><span className="work-arrow" aria-hidden="true">↗</span></a>)}</div>
      </section>
    </main>
  );
}
