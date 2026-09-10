import PageMessages from "@/i18n/PageMessages";
import { languageAlternates } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutClient from "./AboutClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("about.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: languageAlternates("/about"),
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageMessages locale={locale} namespaces={["about", "worktimeline", "skills", "services", "education", "languages"]}><AboutClient /></PageMessages>;
}
