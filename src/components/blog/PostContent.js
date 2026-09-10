import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { contentUrl, embeddedImage } from "@/lib/content-urls.mjs";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const image = embeddedImage(node);
      if (!image) return null;
      return <img src={image.src} alt={image.alt} loading="lazy" decoding="async" style={{ maxWidth: "100%", height: "auto", margin: "1rem 0" }} />;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const href = contentUrl(node?.data?.uri, { allowMailto: true });
      return href ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> : <>{children}</>;
    },
  },
};

export default function PostContent({ content }) {
  if (!content || content.nodeType !== BLOCKS.DOCUMENT || !Array.isArray(content.content)) return null;
  return <div className="post-content">{documentToReactComponents(content, renderOptions)}</div>;
}
