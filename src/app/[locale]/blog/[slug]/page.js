import PageMessages from "@/i18n/PageMessages";
import { languageAlternates } from "@/lib/site";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPostBySlug, getAllSlugs } from "@/lib/contentful";
import BlogPostClient from "./BlogPostClient";
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

  return <PageMessages locale={locale} namespaces={["blog.backToBlog"]}><BlogPostClient post={post} /></PageMessages>;
}
