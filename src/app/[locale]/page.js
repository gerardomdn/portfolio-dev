import { getTranslations, setRequestLocale } from "next-intl/server";
import HomeClient from "./HomeClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      languages: { en: "/en", es: "/es" },
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeClient />;
}
