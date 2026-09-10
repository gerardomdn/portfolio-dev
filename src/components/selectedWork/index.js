"use client";

import { useTranslations } from "next-intl";
import "./style.css";

export default function SelectedWork({ headingLevel = "h3" }) {
  const Heading = headingLevel;
  const t = useTranslations();
  const projects = t.raw("dataportfolio");

  return (
    <ol className="selected-work-list">
      {projects.map((project, index) => (
        <li key={project.title} className="selected-work-item">
          <a className="selected-work-link" href={project.link} target="_blank" rel="noopener noreferrer">
            <span className="selected-work-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Heading className="selected-work-title">{project.title}</Heading>
            <div className="selected-work-detail">
              <p>{project.description}</p>
              <span className="selected-work-cta">{t("portfolio.viewProject")}</span>
            </div>
            <span className="selected-work-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
