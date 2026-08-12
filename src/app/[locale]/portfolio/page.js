import { getTranslations, setRequestLocale } from "next-intl/server";
import PortfolioClient from "./PortfolioClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("portfolio.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: { en: "/en/portfolio", es: "/es/portfolio" },
    },
  };
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortfolioClient />;
}
