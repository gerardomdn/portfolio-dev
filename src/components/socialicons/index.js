"use client";
import "./style.css";
import { useTranslations } from "next-intl";
export const Socialicons = () => {
  const t = useTranslations();
  return <footer className="site-footer"><p>{t("footer.copyright")}</p><div><a href={t("social.github")} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={t("social.linkedin")} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div><span>MX → JP</span></footer>;
};
