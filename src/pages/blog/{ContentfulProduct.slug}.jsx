'use client'
import React from 'react'
import { /* Link, */ graphql } from 'gatsby'
// import get from 'lodash/get'
// import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
// import { BLOCKS } from '@contentful/rich-text-types'
// import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import RichTextRenderer from "@components/RichTextRenderer"
import Seo from '../../components/blog/seo'
// import Layout from '../../components/blog/layout'
import Hero from '../../components/blog/hero'
// import Tags from '../../components/blog/tags'
import ProductForPost from "@components/ProductForPost"

const ProductTemplate = ({ data }) => {
  const { contentfulProduct } = data
  const { shopifyId, body, title, description, featuredProductImage, bodyReferences } = contentfulProduct
  console.log(data, "产品详情=====", shopifyId, title, body)
    // const post = get(this.props, 'data.contentfulBlogPost')
    // const previous = get(this.props, 'data.previous')
    // const next = get(this.props, 'data.next')
    // const plainTextDescription = documentToPlainTextString(
    //   JSON.parse(post.description.raw)
    // )
    const plainTextBody = documentToPlainTextString(JSON.parse(body?.raw || '{}'))
    const { minutes: timeToRead } = readingTime(plainTextBody)
    console.log(timeToRead)

    console.log(contentfulProduct, "post", bodyReferences)
    return (
      <>
        <Seo
          title={title || ""}
          description={description.description}
          image={`${featuredProductImage?.resize?.src}`}
        />
        <Hero
          className="relative"
          image={featuredProductImage?.gatsbyImageData}
          title={title}
          content={description.description}
        >
          <ProductForPost className="absolute left-0 right-0 bottom-0" id={shopifyId} />
        </Hero>
        <div className="w-full mx-auto md:max-w-[85%] lg:max-w-[70%] mt-8">
          <RichTextRenderer content={body} />
        </div>
        {/* <div className={styles.container}>
          <span className={styles.meta}>
            {post.author?.name} &middot;{' '}
            <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
            {timeToRead} minute read
          </span>
          <div className={styles.article}>
            <div className={styles.body}>
              {post.body?.raw && renderRichText(post.body, options)}
            </div>
            <Tags tags={post.tags} />
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/blog/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/blog/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div> */}
      </>
    )
  }

export default ProductTemplate

export const pageQuery = graphql`
  query ProductBySlug($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      id
      internalName
      name
      price
      shopifyId
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            id: contentful_id
            gatsbyImageData(layout: FIXED, width: 264)
            title
            description
          }
        }
      }
      bodyReferences: body {
        references {
          ... on ContentfulAsset {
            contentful_id
            gatsbyImageData(layout: FIXED)
          }
        }
      }
      description {
        description
      }
      featuredProductImage {
        gatsbyImageData(layout: FIXED)
        resize(height: 630, width: 1200) {
          src
        }
      }
      productImages {
        gatsbyImageData(layout: FIXED)
      }
    }
  }
`
