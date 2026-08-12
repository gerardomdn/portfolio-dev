"use client";
import { Container, Row, Col } from "react-bootstrap";
import { useLocale, useTranslations } from "next-intl";
import PostContent from "@/components/blog/PostContent";
import { Link } from "@/i18n/navigation";

export default function BlogPostClient({ post }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Container>
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="10" className="mx-auto">
          <div className="post-header">
            <h1>{post.title}</h1>
            <p className="post-meta">
              {new Date(post.publishedDate).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <div className="post-tags">
              {post.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}
            </div>
          </div>
          {post.coverImage && <img src={post.coverImage} alt={post.title} className="post-cover" />}
          <PostContent content={post.content} />
          <Link href="/blog" className="back-link">&larr; {t("blog.backToBlog")}</Link>
        </Col>
      </Row>
    </Container>
  );
}
