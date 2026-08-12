"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "./style.css";

export const GithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");
  const t = useTranslations("portfolio");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/gerardomdn/repos?sort=updated&direction=desc");
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
        const data = await response.json();
        const selectedRepos = Array.isArray(data)
          ? data.filter((repo) => !repo.fork && !repo.archived).slice(0, 6)
          : [];
        setRepos(selectedRepos);
        setStatus("ready");
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setStatus("error");
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="github-repos-container mt-5">
      <h2>{t("reposTitle")}</h2>

      <p className="github-repos-intro">{t("reposDescription")}</p>
      {status === "loading" && <p className="github-repos-status">{t("loadingRepos")}</p>}
      {status === "error" && <p className="github-repos-status">{t("reposUnavailable")}</p>}
      {status === "ready" && repos.length === 0 && <p className="github-repos-status">{t("noRepos")}</p>}
      <div className="github-repos mt-4">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-item">
            <h3>{repo.name}</h3>
            <p>{repo.description || t("noDescription")}</p>
            <div className="repo-meta">
              {repo.language && <span>{repo.language}</span>}
              <span>★ {repo.stargazers_count}</span>
            </div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {t("viewRepo")}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
