import { languageAlternates } from "@/lib/site";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPostBySlug, getAllSlugs } from "@/lib/contentful";
import PostContent from "@/components/blog/PostContent";
import { Link } from "@/i18n/navigation";

import "./post.css";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  // Static export requires a parameter even when Contentful has no posts.
  // This reserved route resolves to notFound(), never to a placeholder article.
  return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: "__empty__" }];
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${t("meta.title")}`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.coverImage ? [post.coverImage] : [] },
    alternates: {
      languages: languageAlternates(`/blog/${slug}`),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (slug === "__empty__") notFound();
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale });

  return (
    <main id="main-content" tabIndex={-1} className="container">
      <div className="row mb-5 mt-3 pt-md-3">
        <div className="col-lg-10 mx-auto">
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
        </div>
      </div>
    </main>
  );
}
