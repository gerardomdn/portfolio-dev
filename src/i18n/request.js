import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import ja from "../../messages/ja.json";

const messagesByLocale = { en, es, ja };

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
