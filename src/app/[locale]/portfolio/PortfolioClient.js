"use client";
import "./portfolio.css";
import SelectedWork from "@/components/selectedWork";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { GithubRepos } from "@/components/githubRepos";
import { GithubProfile } from "@/components/githubProfile";

export default function PortfolioClient() {
  const t = useTranslations();

  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">{t("portfolio.pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
          <p className="portfolio-intro">{t("portfolio.intro")}</p>
        </Col>
      </Row>
      <div className="mb-5"><SelectedWork headingLevel="h2" /></div>
      <GithubProfile />
      <GithubRepos />
    </Container>
  );
}
