import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Keep page-only copy out of unrelated client payloads.
export default async function PageMessages({ locale, namespaces, children }) {
  const messages = await getMessages({ locale });
  const selected = {};
  for (const path of namespaces) {
    const keys = path.split(".");
    let source = messages;
    let target = selected;
    for (const key of keys.slice(0, -1)) {
      source = source[key];
      target = target[key] ||= {};
    }
    const key = keys.at(-1);
    target[key] = source[key];
  }
  return <NextIntlClientProvider locale={locale} messages={selected}>{children}</NextIntlClientProvider>;
}
