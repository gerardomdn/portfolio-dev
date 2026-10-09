import { languageAlternates } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "./contact.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("contact.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: languageAlternates("/contact"),
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const all = await getTranslations({ locale });
  const email = t("email");

  return (
    <main id="main-content" tabIndex={-1} className="contact-page">
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
