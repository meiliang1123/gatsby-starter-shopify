import React from 'react'
import { Link, graphql } from 'gatsby'
// import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import Seo from '../../components/blog/seo'
// import Layout from '../../components/blog/layout'
import Hero from '../../components/blog/hero'
import Tags from '../../components/blog/tags'
import * as styles from './blog-post.module.css'

const BlogPostTemplate = ({ data }) => {
  const { contentfulBlogPost: post, previous, next } = data
  console.log(data, "博文详情", post)
    // const post = get(this.props, 'data.contentfulBlogPost')
    // const previous = get(this.props, 'data.previous')
    // const next = get(this.props, 'data.next')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(post.description.raw)
    )
    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)
    
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target
        return (
           <GatsbyImage
              image={getImage(gatsbyImage)}
              alt={description || ""}
           />
         )
        },
      },
    };

    return (
      <>
        <Seo
          title={post.title}
          description={plainTextDescription}
          image={`http:${post.heroImage.resize.src}`}
        />
        <Hero
          image={post.heroImage?.gatsbyImage}
          title={post.title}
          content={post.description}
        />
        <div className={styles.container}>
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
        </div>
      </>
    )
  }

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
        
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
