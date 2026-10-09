import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PostCard({ post }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="post-card">
      {post.coverImage && <img src={post.coverImage} alt={post.title} loading="lazy" decoding="async" />}
      <div className="card-body">
        <p className="date">
          {new Date(post.publishedDate).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h2>{post.title}</h2>
        <div className="tags">
          {post.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}
        </div>
        <p>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>{t("blog.readMore")}</Link>
      </div>
    </div>
  );
}
