"use client";
import "./portfolio.css";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { GithubRepos } from "@/components/githubRepos";
import { GithubContributions } from "@/components/githuhContributions";

export default function PortfolioClient() {
  const t = useTranslations();
  const dataportfolio = t.raw("dataportfolio");

  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">{t("portfolio.pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <div className="mb-5 po_items_ho">
        {dataportfolio.map((data, i) => (
          <div key={i} className="po_item">
            <div className="content">
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <a href={data.link} target="_blank" rel="noopener noreferrer">{t("portfolio.viewProject")}</a>
            </div>
          </div>
        ))}
      </div>
      <GithubContributions />
      <GithubRepos />
    </Container>
  );
}
