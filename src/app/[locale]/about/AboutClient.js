"use client";
import "./about.css";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function AboutClient() {
  const t = useTranslations();
  const worktimeline = t.raw("worktimeline");
  const skillsList = t.raw("skills");
  const servicesList = t.raw("services");
  const education = t.raw("education");
  const languages = t.raw("languages");

  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">{t("about.pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5"><h3 className="color_sec py-4">{t("about.title")}</h3></Col>
        <Col lg="7" className="d-flex align-items-center"><div><p>{t("about.aboutme")}</p></div></Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5"><h3 className="color_sec py-4">{t("about.workTimelineTitle")}</h3></Col>
        <Col lg="7" className="experience-list">
          {worktimeline.map((data, i) => (
            <details className="experience-card" key={i} open={i === 0}>
              <summary>
                <span><strong>{data.jobtitle}</strong><a href={data.url} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>{data.where}</a></span>
                <span className="experience-meta">{data.location} · {data.date}</span>
              </summary>
              <ul>{data.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              <p className="experience-tech"><strong>{t("about.technologiesLabel")}:</strong> {data.technologies.join(" · ")}</p>
            </details>
          ))}
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5"><h3 className="color_sec py-4">{t("about.educationTitle")}</h3></Col>
        <Col lg="7" className="d-flex align-items-center">
          <div><h5>{education.degree}</h5><p className="mb-1">{education.school}</p><p>{education.location} · {education.date}</p></div>
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5"><h3 className="color_sec py-4">{t("about.skillsTitle")}</h3></Col>
        <Col lg="7">
          <div className="skills-grid">{skillsList.map((data) => (
            <div className="skill-group" key={data.category}>
              <h5>{data.category}</h5>
              <div className="skill-tags">{data.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          ))}
          </div>
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5"><h3 className="color_sec py-4">{t("about.languagesTitle")}</h3></Col>
        <Col lg="7">
          <div className="language-grid">
            {languages.map((language) => <div key={language.name}><strong>{language.name}</strong><span>{language.level}</span></div>)}
          </div>
          <p className="work-authorization">{t("about.workAuthorization")}</p>
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lang="5"><h3 className="color_sec py-4">{t("about.servicesTitle")}</h3></Col>
        <Col lg="7">
          {servicesList.map((data, i) => (
            <div className="service_ py-4" key={i}><h5 className="service__title">{data.title}</h5><p className="service_desc">{data.description}</p></div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
