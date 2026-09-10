"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "./style.css";

export const GithubProfile = () => {
  const [profile, setProfile] = useState(null);
  const username = "gerardomdn";
  const t = useTranslations("portfolio");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) return;
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };
    fetchProfile();
  }, [username]);

  if (!profile) return null;

  return (
    <section className="github-profile mt-5" aria-labelledby="github-profile-title">
      <div className="github-profile-copy">
        <span className="github-eyebrow">GitHub</span>
        <h2 id="github-profile-title">{t("githubTitle")}</h2>
        <p>{t("githubDescription")}</p>
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
          {t("viewGithub")} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <dl className="github-stats">
        <div><dt>{profile.public_repos}</dt><dd>{t("publicRepos")}</dd></div>
        <div><dt>{profile.followers}</dt><dd>{t("followers")}</dd></div>
        <div><dt>{profile.following}</dt><dd>{t("following")}</dd></div>
      </dl>
    </section>
  );
};
