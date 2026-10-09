import { languageAlternates } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "./about.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("about.pageTitle")} | ${t("meta.title")}`,
    description: t("meta.description"),
    alternates: {
      languages: languageAlternates("/about"),
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const worktimeline = t.raw("worktimeline");
  const skillsList = t.raw("skills");
  const servicesList = t.raw("services");
  const education = t.raw("education");
  const languages = t.raw("languages");

  return (
    <main id="main-content" tabIndex={-1} className="container About-header">
      <div className="row mb-5 mt-3 pt-md-3">
        <div className="col-lg-8">
          <h1 className="display-4 mb-4">{t("about.pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </div>
      </div>
      <div className="row sec_sp">
        <div className="col-lg-5"><h3 className="color_sec py-4">{t("about.title")}</h3></div>
        <div className="col-lg-7 d-flex align-items-center"><div><p>{t("about.aboutme")}</p></div></div>
      </div>
      <div className="row sec_sp">
        <div className="col-lg-5"><h3 className="color_sec py-4">{t("about.workTimelineTitle")}</h3></div>
        <div className="col-lg-7 experience-list">
          {worktimeline.map((data, i) => (
            <details className="experience-card" key={i} open={i === 0}>
              <summary>
                <strong className="experience-role">{data.jobtitle}</strong>
                <span className="experience-date">{data.date}</span>
                <a className="experience-company" href={data.url} target="_blank" rel="noopener noreferrer">{data.where}</a>
                <span className="experience-location">{data.location}</span>
              </summary>
              <ul>{data.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              <p className="experience-tech"><strong>{t("about.technologiesLabel")}:</strong> {data.technologies.join(" · ")}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="row sec_sp">
        <div className="col-lg-5"><h3 className="color_sec py-4">{t("about.educationTitle")}</h3></div>
        <div className="col-lg-7 d-flex align-items-center">
          <div><h5>{education.degree}</h5><p className="mb-1">{education.school}</p><p>{education.location} · {education.date}</p></div>
        </div>
      </div>
      <div className="row sec_sp">
        <div className="col-lg-5"><h3 className="color_sec py-4">{t("about.skillsTitle")}</h3></div>
        <div className="col-lg-7">
          <div className="skills-grid">{skillsList.map((data) => (
            <div className="skill-group" key={data.category}>
              <h5>{data.category}</h5>
              <div className="skill-tags">{data.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="row sec_sp">
        <div className="col-lg-5"><h3 className="color_sec py-4">{t("about.languagesTitle")}</h3></div>
        <div className="col-lg-7">
          <div className="language-grid">
            {languages.map((language) => <div key={language.name}><strong>{language.name}</strong><span>{language.level}</span></div>)}
          </div>
        </div>
      </div>
      <div className="row sec_sp">
        <div className="col-lg-5"><h3 className="color_sec py-4">{t("about.servicesTitle")}</h3></div>
        <div className="col-lg-7">
          {servicesList.map((data, i) => (
            <div className="service_ py-4" key={i}><h5 className="service__title">{data.title}</h5><p className="service_desc">{data.description}</p></div>
          ))}
        </div>
      </div>
    </main>
  );
}
