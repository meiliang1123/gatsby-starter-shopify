'use client'
import React from 'react'
import { /* Link, */ graphql } from 'gatsby'
// import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import Seo from '../../components/blog/seo'
// import Layout from '../../components/blog/layout'
import Hero from '../../components/blog/hero'
// import Tags from '../../components/blog/tags'
import * as styles from './blog-post.module.css'
import ProductForPost from "@components/ProductForPost"

const ProductTemplate = ({ data }) => {
  const { contentfulProduct } = data
  const { shopifyId, body, title, description, featuredProductImage } = contentfulProduct
  console.log(data, "产品详情", shopifyId, title)
    // const post = get(this.props, 'data.contentfulBlogPost')
    // const previous = get(this.props, 'data.previous')
    // const next = get(this.props, 'data.next')
    // const plainTextDescription = documentToPlainTextString(
    //   JSON.parse(post.description.raw)
    // )
    const plainTextBody = documentToPlainTextString(JSON.parse(body?.raw || '{}'))
    const { minutes: timeToRead } = readingTime(plainTextBody)
    console.log(timeToRead)
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target
        return (
           <GatsbyImage
              image={getImage(gatsbyImage)}
              alt={description}
           />
         )
        },
      },
    };
    console.log(contentfulProduct, "post")
    return (
      <>
        <Seo
          title={title || ""}
          description={description.description}
          image={`${featuredProductImage?.resize?.src}`}
        />
        <Hero
          image={featuredProductImage?.gatsbyImageData}
          title={title}
          content={description.description}
        />
        <div className={styles.body}>
          {body?.raw && renderRichText(body, options)}
        </div>
        <ProductForPost id = {shopifyId} />
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
