import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPostBySlug, getAllSlugs } from "@/lib/contentful";
import BlogPostClient from "./BlogPostClient";
import "./post.css";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
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
      languages: { en: `/en/blog/${slug}`, es: `/es/blog/${slug}` },
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
