"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PostCard({ post }) {
  const t = useTranslations();

  return (
    <div className="post-card">
      {post.coverImage && <img src={post.coverImage} alt={post.title} />}
      <div className="card-body">
        <p className="date">
          {new Date(post.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h3>{post.title}</h3>
        <div className="tags">
          {post.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}
        </div>
        <p>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>{t("blog.readMore")}</Link>
      </div>
    </div>
  );
}
