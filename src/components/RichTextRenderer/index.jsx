import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";

const RichTextRenderer = ({ className, content }) => {
  if (!content) return null;

  const raw = content?.raw ?? content;
  const references = content?.references ?? [];

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node?.data?.target?.sys?.id;
        if (!assetId || !references.find(i => i.id === assetId)) return null;
        const currentAsset = references.find(i => i.id === assetId);
        console.log("post assetId", currentAsset);
        const { gatsbyImageData, title } = currentAsset;
        return (
          gatsbyImageData ? <GatsbyImage
            image={gatsbyImageData}
            alt={title}
            className=""
          /> : null
        );
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        console.log("post EMBEDDED_ENTRY node", node, references);
        const entry = node?.data?.target;
        if (!entry || !entry.__typename) return null;

        switch (entry.__typename) {
          case "ContentfulProduct":
            return (
              <div className="my-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                {entry?.image?.gatsbyImageData && (
                  <GatsbyImage
                    image={getImage(entry.image.gatsbyImageData)}
                    alt={entry.title}
                    className="rounded-md"
                  />
                )}
                <p className="mt-2 text-sm text-gray-600">{entry.description}</p>
              </div>
            );

          case "ContentfulBlogCard":
            return (
              <div className="my-6 p-4 border rounded-md shadow">
                <h3 className="font-bold">{entry.title}</h3>
                <p>{entry.summary}</p>
              </div>
            );

          // 你可以继续扩展其他 content type
          default:
            return null;
        }
      },
    },
  };

  return (
    <div className={`prose max-w-none ${className}`}>
      {renderRichText({ raw }, options)}
    </div>
  );
};

export default RichTextRenderer;