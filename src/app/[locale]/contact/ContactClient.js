"use client";
import "./contact.css";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function ContactClient() {
  const t = useTranslations("contact");
  const email = t("email");

  return (
    <Container>
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">{t("pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp justify-content-center">
        <Col lg="10">
          <section className="contact-card">
            <span className="contact-label">{t("eyebrow")}</span>
            <h2>{t("invitation")}</h2>
            <p>{t("description")}</p>
            <a className="contact-email" href={`mailto:${email}`}>
              {t("emailCta")} <span aria-hidden="true">↗</span>
              <small>{email}</small>
            </a>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
