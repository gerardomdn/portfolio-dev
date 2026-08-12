"use client";
import { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Themetoggle from "@/components/themetoggle";
import LanguageToggle from "@/components/languagetoggle";

const Headermain = () => {
  const [isActive, setActive] = useState(true);
  const t = useTranslations();

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand nav_ac" href="/">{t("logotext")}</Link>
          <div className="d-flex align-items-center">
            <LanguageToggle />
            <Themetoggle />
            <button
              className="menu__button nav_ac"
              onClick={handleToggle}
              aria-label={!isActive ? t("accessibility.closeMenu") : t("accessibility.openMenu")}
              aria-expanded={!isActive}
            >
              {!isActive ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>
        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item"><Link onClick={handleToggle} href="/" className="my-3">{t("nav.home")}</Link></li>
                  <li className="menu_item"><Link onClick={handleToggle} href="/portfolio" className="my-3">{t("nav.portfolio")}</Link></li>
                  <li className="menu_item"><Link onClick={handleToggle} href="/about" className="my-3">{t("nav.about")}</Link></li>
                  <li className="menu_item"><Link onClick={handleToggle} href="/blog" className="my-3">{t("nav.blog")}</Link></li>
                  <li className="menu_item"><Link onClick={handleToggle} href="/contact" className="my-3">{t("nav.contact")}</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a href={t("social.github")} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={t("social.linkedin")} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <p className="copyright m-0">{t("footer.copyright")}</p>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;
