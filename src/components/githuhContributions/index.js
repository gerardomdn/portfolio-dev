"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "./style.css";

export const GithubContributions = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const username = "gerardomdn";
  const t = useTranslations("portfolio");

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged+created:>=2024-01-01`,
        );
        const data = await response.json();
        setPullRequests(Array.isArray(data.items) ? data.items : []);
      } catch (error) {
        console.error("Error fetching pull requests:", error);
      }
    };
    fetchPullRequests();
  }, [username]);

  return (
    <div className="github-contributions-container mt-5">
      <h2>{t("prsTitle")}</h2>

      <div className="github-contributions mt-3">
        {pullRequests.length > 0 ? (
          pullRequests.map((pr) => (
            <div key={pr.id} className="pr-item">
              <h3>{pr.title}</h3>
              <p>
                Repository:{" "}
                <span>
                  {pr.repository_url.split("/").pop()}
                </span>
              </p>
              <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                {t("viewPR")}
              </a>
            </div>
          ))
        ) : (
          <p>{t("noPRs")}</p>
        )}
      </div>
    </div>
  );
};
