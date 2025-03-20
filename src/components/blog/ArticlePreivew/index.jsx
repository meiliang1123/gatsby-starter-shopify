import React, { useEffect, useState } from "react";
import Container from "./container"
// import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import ArticleTextBuilder from "@components/blog/ArticleTextBuilder"
import "./index.less"
const ArticlePreivew = ({data, type}) => {
  const [source, setSource] = useState([])

  useEffect(() => {
    let regroup = []
    switch(type){
      case "post":
        regroup = data.map(item => {
          return {
            ...item,
            time: item.publishDate,
            href: `/blog/${item.slug}`,
            description: item.description?.raw && renderRichText(item.description),
            secondTitle: item.author?.name,
            secondDescription: item.author?.title,
            gatsbyImage: item.author?.image?.gatsbyImage
          }
        })
        break;
      case "product":
        regroup = data.map(item => {
          return {
            ...item,
            title: item.name,
            time: item.createdAt,
            href: `/blog/${item.slug}`,
            description: item.description?.description,
            secondDescription: `price/${item.price}`,
            featuredImage: item.featuredProductImage?.gatsbyImage
          }
        })
        break;
      default:
        break;
    }
    setSource(regroup)
  }, [data, type])

  return <Container className={`preview-contianer preview-contianer__${type} grid gap-4 ${type === "post" ? "lg:grid-cols-3" : ""} grid-cols-1 lg:w-[80vw]`}>
    {
      source.map((item, index) => {
        return <div className={`preview-item ${type === "product" ? "flex items-start lg:items-center" : ""}`} key={`${index}post`}>
          {item.featuredImage && <GatsbyImage className="lg:!h-[11.5rem] lg:!w-[11.5rem] lg:!mx-5 !mx-3 !h-[5rem] !w-[5rem] rounded-sm" alt="" image={item.featuredImage} />}
          <ArticleTextBuilder className="flex-1" data={item} />
        </div>
      })
    }
  </Container>
}

// ArticlePreivew.defaultProps = {
//   data: [],
//   type: ""
// }

export default ArticlePreivew