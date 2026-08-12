import PageMessages from "@/i18n/PageMessages";
import { languageAlternates } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactClient from "./ContactClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("contact.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: languageAlternates("/contact"),
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageMessages locale={locale} namespaces={["contact", "footer.followMe", "social"]}><ContactClient /></PageMessages>;
}
