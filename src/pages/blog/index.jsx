import React from 'react'
import { graphql } from 'gatsby'
import * as motion from "motion/react-client"
// import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Carousel } from "@material-tailwind/react";
// import { Button } from "@material-tailwind/react";
// import get from 'lodash/get'

// import Layout from '../../components/blog/layout'
// import Hero from '@components/blog/hero'
// import ArticlePreview from '@components/blog/article-preview'
import ArticlePreview from "@components/blog/ArticlePreivew"

const BlogIndex = ({ data }) => {
  console.log(data, "博文list" )
  const { allContentfulBlogPost, allContentfulLandingPage, allContentfulProduct } = data
  const posts = allContentfulBlogPost.nodes || []
  // const author = allContentfulPerson.nodes?.[0] || {}
  const landingPages = allContentfulLandingPage.nodes || []
  const products = allContentfulProduct.nodes || []
  // const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
  // const [author] = get(this, 'props.data.allContentfulPerson.nodes')

  const itemBuilder = (page, index) => {
    const { /*slug, */internalName, heroBannerImage, heroBannerHeadline } = page
    return (
      <div className="item-container relative" key={index}>
        <motion.div
          key={`motion${index}`}
          className="motion-container absolute z-10 left-0 text-white w-[100%] h-[100%] bg-black bg-opacity-20 backdrop-blur-sm"
          whileInView={{ opacity: 1 }}  // 初始宽度 80%
          initial={{ opacity: 0 }}  // 进入视口后变为 100%
          transition={{ duration: 0.5, ease: "easeOut" }} // 过渡动画
        >
          <div className="item-info lg:w-[50vw] sm:w-[100vw] h-[100%] m-auto p-10 pb-16 flex flex-col justify-end text-left">
            <div className="item-title">{internalName}</div>
            {/* <div className="item-price">{priceRangeV2.minVariantPrice.amount}</div> */}
            <div className="item-description h-16 overflow-hidden text-ellipsis line-clamp-3 leading-[1.4]">{heroBannerHeadline}</div>
          </div>
        </motion.div>
        <div className="item-img">
          <GatsbyImage
            alt={heroBannerImage.title}
            className="lg:h-[70vh] h-[40vh]"
            // image={firstImage?.gatsbyImageData ?? storefrontImageData}
            image={heroBannerImage.gatsbyImage}
            loading="eager"
          />
          {/* <img src={product.images[0].src} alt="" /> */}
        </div>
      </div>
    )
  }

  return (
    <>
      <Carousel
        autoplay={true}
        loop={true}
        prevArrow={() => null}
        nextArrow={() => null}
        autoplayDelay={3000}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <button
                key={i}
                aria-label="slide"
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {
          (landingPages || []).map((page, index) => {
            return itemBuilder(page, index)
          })
        }
      </Carousel>
      {/* <Hero
        image={author.heroImage.gatsbyImage}
        title={author.name}
        content={author.shortBio}
      /> */}
      <h1 className="text-4xl font-bold text-center px-5 mt-14 mb-8">News atest</h1>
      <ArticlePreview type="post" data={posts} />
      <h1 className="text-4xl font-bold text-center px-5 mt-14 mb-8">Artical about product</h1>
      <ArticlePreview type="product" data={products} />
      {/* <ArticlePreview posts={posts} />
      <ArticlePreview posts={products.map(item => {
        return {
          ...item,
          heroImage: item.featuredProductImage
        }
      })} /> */}
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(
      sort: { publishDate: DESC }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      distinct(field: {slug: SELECT})
      nodes {
        id
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
        author {
          image {
            gatsbyImage(width: 424)
          }
          name
          phone
          title
        }
      }
    }
    allContentfulProduct {
      distinct(field: {id: SELECT})
      nodes {
        price
        internalName
        description {
          description
        }
        name
        slug
        id
        featuredProductImage {
          gatsbyImage(layout: FIXED, width: 424)
        }
        createdAt
      }
    }
    allContentfulLandingPage {
      distinct(field: {internalName: SELECT})
      nodes {
        id
        internalName
        heroBannerImage {
          title
          url
          gatsbyImage(layout: FULL_WIDTH, aspectRatio: 1, width: 640)
          description
        }
        heroBannerHeadline
        heroBannerHeadlineColor
        products {
          id
          slug
          productImages {
            gatsbyImageData(width: 640)
            description
            title
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      distinct(field: {contentful_id: SELECT})
      nodes {
        name
        shortBio {
          raw
        }
        title
        heroImage: image {
          gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
        }
      }
    }
  }
`
