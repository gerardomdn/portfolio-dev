"use client";
import { useState } from "react";
import "./style.css";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Themetoggle from "@/components/themetoggle";
import LanguageToggle from "@/components/languagetoggle";

export default function Headermain() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();
  return <header className="site__header">
    <Link className="wordmark" href="/" onClick={() => setOpen(false)}>gerardo<b aria-hidden="true">✳</b></Link>
    <nav id="main-navigation" aria-label={t("accessibility.navigation")} className={`main-nav ${open ? "is-open" : ""}`} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
      {[["/", "home"], ["/portfolio", "portfolio"], ["/about", "about"], ["/blog", "blog"], ["/contact", "contact"]].map(([href, key]) => <Link href={href} key={key} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{t(`nav.${key}`)}</Link>)}
    </nav>
    <div className="header-controls"><LanguageToggle /><Themetoggle /><button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={t(open ? "accessibility.closeMenu" : "accessibility.openMenu")} onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button></div>
  </header>;
}
