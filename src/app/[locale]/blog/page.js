import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/contentful";
import "./blog.css";
import BlogClient from "./BlogClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("blog.pageTitle")} | ${t("meta.title")}`,
    description: t("blog.description"),
    alternates: {
      languages: { en: "/en/blog", es: "/es/blog" },
    },
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let posts = [];
  try {
    posts = await getAllPosts();
  } catch (e) {
    console.error("Failed to fetch posts:", e);
    posts = [];
  }

  return <BlogClient posts={posts} />;
}
