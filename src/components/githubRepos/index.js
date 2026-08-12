"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "./style.css";

export const GithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const t = useTranslations("portfolio");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/gerardomdn/repos?sort=updated&direction=desc");
        const data = await response.json();
        setRepos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="github-repos-container mt-5">
      <h2>{t("reposTitle")}</h2>

      <div className="github-repos mt-3">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-item">
            <h3>{repo.name}</h3>
            <p>{repo.description || t("noDescription")}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {t("viewRepo")}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
