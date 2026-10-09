"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import "./style.css";

export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("accessibility");
  const pathname = usePathname();


  return (
    <div className="lang-toggle" role="group" aria-label={t("languageSelector")}>
      <Link href={pathname} locale="en" lang="en" aria-label="English" className={locale === "en" ? "active" : ""} aria-current={locale === "en" ? "page" : undefined}>EN</Link>
      <span aria-hidden="true">|</span>
      <Link href={pathname} locale="es" lang="es" aria-label="Español" className={locale === "es" ? "active" : ""} aria-current={locale === "es" ? "page" : undefined}>ES</Link>
      <span aria-hidden="true">|</span>
      <Link href={pathname} locale="ja" lang="ja" aria-label="日本語" className={locale === "ja" ? "active" : ""} aria-current={locale === "ja" ? "page" : undefined}>JA</Link>
    </div>
  );
}
