import { languageAlternates } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/contentful";
import "./blog.css";
import PostCard from "@/components/blog/PostCard";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t("blog.pageTitle")} | ${t("meta.title")}`,
    description: t("blog.description"),
    alternates: {
      languages: languageAlternates("/blog"),
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

  const t = await getTranslations({ locale });

  return (
    <main id="main-content" tabIndex={-1} className="container blog-listing">
      <div className="row mb-5 mt-3 pt-md-3">
        <div className="col-lg-8">
          <h1 className="display-4 mb-4">{t("blog.pageTitle")}</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </div>
      </div>
      {posts.length === 0 ? (
        <p>{t("blog.noPosts")}</p>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (<PostCard key={post.slug} post={post} />))}
        </div>
      )}
    </main>
  );
}
