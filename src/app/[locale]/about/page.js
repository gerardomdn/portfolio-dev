import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutClient from "./AboutClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("about.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: { en: "/en/about", es: "/es/about" },
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutClient />;
}
