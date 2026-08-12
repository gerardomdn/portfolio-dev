import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, fileName } = node.data.target.fields.file;
      return <img src={`https:${url}`} alt={fileName} style={{ maxWidth: "100%", height: "auto", margin: "1rem 0" }} />;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
};

export default function PostContent({ content }) {
  return (
    <div className="post-content">
      {documentToReactComponents(content, renderOptions)}
    </div>
  );
}
