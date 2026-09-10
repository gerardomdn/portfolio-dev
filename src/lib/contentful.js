import { contentUrl } from "@/lib/content-urls.mjs";
import { createClient } from "contentful";
import publicContent from "@/config/public-content.json";

function getClient() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !accessToken || spaceId.startsWith("your_") || accessToken.startsWith("your_")) return null;
  return createClient({ space: spaceId, accessToken });
}

export async function getPostBySlug(slug) {
  if (!publicContent.blogSlugs.includes(slug)) return null;
  const client = getClient();
  if (!client) return null;

  let entries;
  try {
    entries = await client.getEntries({ content_type: "blogPost", "fields.slug": slug, limit: 1 });
  } catch {
    // SDK errors can contain request details. Never include them in public CI logs.
    throw new Error("Unable to load approved blog content from Contentful.");
  }
  const item = entries.items[0];
  if (!item || item.fields.slug !== slug) return null;
  const imageUrl = item.fields.coverImage?.fields?.file?.url;
  return {
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    coverImage: contentUrl(imageUrl),
    tags: item.fields.tags || [],
    publishedDate: item.fields.publishedDate,
  };
}

export async function getAllPosts() {
  const posts = await Promise.all(publicContent.blogSlugs.map(getPostBySlug));
  return posts.filter(Boolean).sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
}

export async function getAllSlugs() {
  return (await getAllPosts()).map((post) => post.slug);
}
