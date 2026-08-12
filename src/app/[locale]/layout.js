import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Headermain from "@/header";
import { Socialicons } from "@/components/socialicons";
import ThemeProvider from "@/components/themetoggle/ThemeProvider";
import AnimatedCursorWrapper from "@/components/AnimatedCursorWrapper";
import Script from "next/script";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&family=Marcellus&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <AnimatedCursorWrapper />
            <Headermain />
            <div className="s_c">
              {children}
              <Socialicons />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
