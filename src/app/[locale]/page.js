import PageMessages from "@/i18n/PageMessages";
import { languageAlternates } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomeClient from "./HomeClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      languages: languageAlternates(),
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageMessages locale={locale} namespaces={["home", "about.skillsTitle", "portfolio.pageTitle", "portfolio.viewProject", "dataportfolio"]}><HomeClient /></PageMessages>;
}
