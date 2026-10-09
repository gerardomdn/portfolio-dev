import { NextIntlClientProvider } from "next-intl";
import { languageAlternates } from "@/lib/site";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "./portfolio.css";
import SelectedWork from "@/components/selectedWork";
import { GithubRepos } from "@/components/githubRepos";
import { GithubProfile } from "@/components/githubProfile";

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
  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale });

  return (
    <main id="main-content" tabIndex={-1} className="container About-header">
      <div className="row mb-5 mt-3 pt-md-3">
        <div className="col-lg-8">
          <h1 className="display-4 mb-4">{t("portfolio.pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
          <p className="portfolio-intro">{t("portfolio.intro")}</p>
        </div>
      </div>
      <div className="mb-5"><SelectedWork headingLevel="h2" /></div>
      <NextIntlClientProvider locale={locale} messages={{ portfolio: messages.portfolio }}><GithubProfile /></NextIntlClientProvider>
      <GithubRepos />
    </main>
  );
}
