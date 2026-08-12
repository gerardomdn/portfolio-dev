"use client";
import "./contact.css";
import { useTranslations } from "next-intl";

export default function ContactClient() {
  const t = useTranslations("contact");
  const all = useTranslations();
  const email = t("email");

  return (
    <main className="contact-page">
      <div className="contact-intro">
        <p className="contact-kicker">03 / {t("pageTitle")}</p>
        <h1>{t("invitation")}</h1>
        <p className="contact-description">{t("description")}</p>
      </div>
      <section className="contact-postcard" aria-label={t("emailLabel")}>
        <div className="postcard-top"><span>{t("eyebrow")}</span><span className="postcard-stamp" aria-hidden="true">↗</span></div>
        <a className="contact-email" href={`mailto:${email}`}>
          <span className="contact-cta">{t("emailCta")}</span>
          <span className="contact-address">{email}</span>
          <span className="contact-send" aria-hidden="true">↗</span>
        </a>
        <div className="postcard-bottom"><span>gerardo</span><span>MX → JP</span></div>
      </section>
      <div className="contact-socials"><span>{all("footer.followMe")}</span><a href={all("social.github")} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={all("social.linkedin")} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
    </main>
  );
}
