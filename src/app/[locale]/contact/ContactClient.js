"use client";
import { useState } from "react";
import * as emailjs from "emailjs-com";
import "./contact.css";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function ContactClient() {
  const t = useTranslations();
  const emailjsConfig = t.raw("emailjs");

  const [formData, setFormdata] = useState({
    email: "", name: "", message: "", loading: false, show: false, alertmessage: "", variant: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata({ ...formData, loading: true });
    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: t("contact.email"),
      message: formData.message,
    };
    emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, templateParams, emailjsConfig.userId)
      .then(
        (result) => { setFormdata({ ...formData, loading: false, alertmessage: t("contact.successMessage"), variant: "success", show: true }); },
        (error) => { setFormdata({ ...formData, loading: false, alertmessage: `${t("contact.failMessage")} ${error.text}`, variant: "danger", show: true }); }
      );
  };

  const handleChange = (e) => { setFormdata({ ...formData, [e.target.name]: e.target.value }); };

  return (
    <Container>
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8"><h1 className="display-4 mb-4">{t("contact.pageTitle")}</h1><hr className="t_border my-4 ml-0 text-left" /></Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="12">
          <Alert variant={formData.variant} className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"}`} onClose={() => setFormdata({ ...formData, show: false })} dismissible>
            <p className="my-0">{formData.alertmessage}</p>
          </Alert>
        </Col>
        <Col lg="5" className="mb-5">
          <h3 className="color_sec py-4">{t("contact.getInTouch")}</h3>
          <address>
            <strong>Email:</strong> <a href={`mailto:${t("contact.email")}`}>{t("contact.email")}</a><br /><br />
            {t("contact.phone") && <p><strong>Phone:</strong> {t("contact.phone")}</p>}
          </address>
          <p>{t("contact.description")}</p>
        </Col>
        <Col lg="7" className="d-flex align-items-center">
          <form onSubmit={handleSubmit} className="contact__form w-100">
            <Row>
              <Col lg="6" className="form-group"><input className="form-control" id="name" name="name" placeholder={t("contact.namePlaceholder")} value={formData.name || ""} type="text" required onChange={handleChange} /></Col>
              <Col lg="6" className="form-group"><input className="form-control rounded-0" id="email" name="email" placeholder={t("contact.emailPlaceholder")} type="email" value={formData.email || ""} required onChange={handleChange} /></Col>
            </Row>
            <textarea className="form-control rounded-0" id="message" name="message" placeholder={t("contact.messagePlaceholder")} rows="5" value={formData.message} onChange={handleChange} required></textarea><br />
            <Row><Col lg="12" className="form-group"><button className="btn ac_btn" type="submit">{formData.loading ? t("contact.sending") : t("contact.sendButton")}</button></Col></Row>
          </form>
        </Col>
      </Row>
      {formData.loading && <div className="loading-bar"></div>}
    </Container>
  );
}
