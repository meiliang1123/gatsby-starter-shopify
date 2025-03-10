import * as React from "react"
import { graphql } from "gatsby"
import Frontpage from "@components/HomePage/Frontpage"
import Recommend from "@components/HomePage/Recommend"
import Selling from "@components/HomePage/Selling"
import { ProductListing } from "@components/ProductList/ProductListing"
import { Seo } from "../components/seo"
import {
  container,
  // intro,
  callOut,
  callToAction,
  deployButton,
} from "./index.module.css"

export const query = graphql`
  query {
    all: allShopifyProduct {
      nodes {
        ...ProductCard
      }
    },
    recommend: shopifyCollection(handle: { eq: "recommend" }) {
      products {
        ...ProductCard
      }
    },
    frontpage: shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    },
    selling: shopifyCollection(handle: { eq: "selling" }) {
      products {
        ...ProductCard
      }
    }
  }
`
function Hero (props) {
  return (
    <div className={container}>
      {!!process.env.GATSBY_DEMO_STORE && (
        <>
          <p className={callOut}>
            It's a proof-of-concept in a box, with 10k products and 30k variants
            to help you get to proof-of-concept as soon as right now.
          </p>
          <p className={callToAction}>
            Hook it up to your own Shopify store data and start customizing in
            minutes by deploying it to Gatsby Cloud for free. Grab your Shopify
            store credentials and
            <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify&utm_campaign=shopify-starter">
              <img
                src="https://www.gatsbyjs.com/deploynow.png"
                alt="Deploy to Gatsby Cloud"
                className={deployButton}
              />
            </a>
          </p>
        </>
      )}
    </div>
  )
}

const IndexPage = ({ data }) => {
  return (
    <>
      <Hero />
      <Frontpage data={data.frontpage} />
      <Recommend data={data.recommend} />
      <Selling data={data.selling} />
      {/* <ProductListing products={data?.shopifyCollection?.products} /> */}
      <ProductListing products={data?.all?.nodes} />
    </>
  )
}
export default IndexPage;

export const Head = () => <Seo />
