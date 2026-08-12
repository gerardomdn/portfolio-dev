"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import "./style.css";

export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("accessibility");
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="lang-toggle" role="group" aria-label={t("languageSelector")}>
      <button className={locale === "en" ? "active" : ""} onClick={() => switchLocale("en")}>EN</button>
      <span>|</span>
      <button className={locale === "es" ? "active" : ""} onClick={() => switchLocale("es")}>ES</button>
      <span>|</span>
      <button className={locale === "ja" ? "active" : ""} onClick={() => switchLocale("ja")}>JA</button>
    </div>
  );
}
