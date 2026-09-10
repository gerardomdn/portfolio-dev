import PageMessages from "@/i18n/PageMessages";
import { languageAlternates } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PortfolioClient from "./PortfolioClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("portfolio.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: languageAlternates("/portfolio"),
    },
  };
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageMessages locale={locale} namespaces={["portfolio", "dataportfolio"]}><PortfolioClient /></PageMessages>;
}
