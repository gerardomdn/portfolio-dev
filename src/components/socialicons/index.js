"use client";
import React from "react";
import "./style.css";
import {
  FaGithub,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaYoutube,
  FaTwitch,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaCircle
} from "react-icons/fa";
import { useTranslations } from "next-intl";

const ICON_MAPPING = {
  default: FaCircle,
  facebook: FaFacebookF,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  snapchat: FaSnapchatGhost,
  tiktok: FaTiktok,
  twitter: FaTwitter,
  twitch: FaTwitch,
  youtube: FaYoutube
};

export const Socialicons = (params) => {
  const t = useTranslations();
  const socialprofils = t.raw("social");

  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}>
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>{t("footer.followMe")}</p>
    </div>
  );
};
