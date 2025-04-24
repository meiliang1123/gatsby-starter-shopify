import React from 'react'
import { Link, graphql } from 'gatsby'
// import get from 'lodash/get'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import readingTime from 'reading-time'

import Seo from '../../components/blog/seo'
// import Layout from '../../components/blog/layout'
import RichTextRenderer from "@components/RichTextRenderer"
import Hero from '../../components/blog/hero'
import Tags from '../../components/blog/tags'
import * as styles from './blog-post.module.css'

const BlogPostTemplate = ({ data }) => {
  const { contentfulBlogPost: post, allContentfulBlogPost } = data
    console.log(data, "博文详情=====", post.body)
    // const post = get(this.props, 'data.contentfulBlogPost')
    // const previous = get(this.props, 'data.previous')
    // const next = get(this.props, 'data.next')
    const currentIndex = allContentfulBlogPost.nodes.findIndex(
      (node) => node.slug === post.slug
    )
    const previous = currentIndex > 0
      ? allContentfulBlogPost.nodes[currentIndex - 1]
      : null
    const next = currentIndex < allContentfulBlogPost.nodes.length - 1
        ? allContentfulBlogPost.nodes[currentIndex + 1]
        : null
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(post.description.raw)
    )
    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)
    
    // const options = {
    //   renderNode: {
    //     [BLOCKS.EMBEDDED_ASSET]: (node) => {
    //     const { gatsbyImage, description } = node.data.target
    //     return (
    //        <GatsbyImage
    //           image={getImage(gatsbyImage)}
    //           alt={description || ""}
    //        />
    //      )
    //     },
    //   },
    // };

    return (
      <>
        <Seo
          title={post.seo?.pageTitle}
          description={post.seo?.pageDescription?.pageDescription || plainTextDescription}
          image={`https:${post.seo?.shareImages?.[0]?.file.url}` || `http:${post.heroImage.resize.src}`}
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
              <RichTextRenderer content={post.body}/>
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
    $locale: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      node_locale
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
      tags
      description {
        raw
      }
      seo {
        internalName
        pageTitle
        pageDescription {
          pageDescription
        }
        shareImages {
          file {
            url
          }
          gatsbyImageData(width: 16)
        }
      }
    }
    allContentfulBlogPost(
      filter: { node_locale: { eq: "en-US" } }
      sort: { publishDate: ASC }
    ) {
      nodes {
        title
        slug
        publishDate
      }
    }
    previous: contentfulBlogPost(
      slug: { eq: $previousPostSlug }
      node_locale: { eq: $locale }
    ) {
      slug
      title
    }
    next: contentfulBlogPost(
      slug: { eq: $nextPostSlug }
      node_locale: { eq: $locale }
    ) {
      slug
      title
    }
  }
`
