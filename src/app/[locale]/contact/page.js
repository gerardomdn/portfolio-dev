import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactClient from "./ContactClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("contact.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: { en: "/en/contact", es: "/es/contact" },
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactClient />;
}
