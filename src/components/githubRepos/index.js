"use client";
import { useTranslations } from "next-intl";
import publicContent from "@/config/public-content.json";
import "./style.css";

export const GithubRepos = () => {
  const t = useTranslations("portfolio");
  const repos = publicContent.githubProjects;
  if (!repos.length) return null;

  return (
    <section className="github-repos-container mt-5">
      <h2>{t("reposTitle")}</h2>
      <p className="github-repos-intro">{t("reposDescription")}</p>
      <div className="github-repos mt-4">
        {repos.map((repo) => (
          <article key={repo.name} className="repo-item">
            <h3>{repo.name}</h3>
            <p>{repo.description || t("noDescription")}</p>
            {repo.language && <div className="repo-meta"><span>{repo.language}</span></div>}
            <a href={`https://github.com/gerardomdn/${encodeURIComponent(repo.name)}`} target="_blank" rel="noopener noreferrer">
              {t("viewRepo")}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
