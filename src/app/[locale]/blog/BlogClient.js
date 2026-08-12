"use client";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslations } from "next-intl";
import PostCard from "@/components/blog/PostCard";

export default function BlogClient({ posts }) {
  const t = useTranslations();

  return (
    <Container className="blog-listing">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">{t("blog.pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      {posts.length === 0 ? (
        <p>{t("blog.noPosts")}</p>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (<PostCard key={post.slug} post={post} />))}
        </div>
      )}
    </Container>
  );
}
