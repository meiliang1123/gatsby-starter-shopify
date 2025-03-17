import * as React from "react"
import { graphql, Link } from "gatsby"
import Frontpage from "@components/HomePage/Frontpage"
import Recommend from "@components/HomePage/Recommend"
import Selling from "@components/HomePage/Selling"
// import { ProductListing } from "@components/ProductList/ProductListing"
import { Button } from "@material-tailwind/react";
import { MdArrowRightAlt } from "react-icons/md";
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
      <div className="w-full bg-gray-900 h-[600px] overflow-clip home-video relative">
        <video muted autoPlay loop playsInline className="w-full">
          <source src="/static/index.webm" type="video/webm" />
          你的浏览器不支持 WebM 格式。
        </video>
        <div className="absolute flex text-white top-0 left-0 h-full w-full bg-black bg-opacity-20 backdrop-blur-md text-left">
          <div className="py-4 flex flex-col justify-center ml-10 lg:ml-[100px] lg:w-[40vw] w-full min-w-[300px]">
            <h2 className="text-3xl font-bold">
              <span className="text-white">
                Never miss a shot
              </span>
            </h2>
            <p className="text-lg">Call us at 877.503.2143 for more information about our business solutions. Or, fill out this form and we’ll contact you directly.</p>
            <Link to="/products"><Button color="white" className="flex items-center mt-8">Shopoing Now <MdArrowRightAlt className="ml-2" /></Button></Link>
          </div>
        </div>
      </div>
      <Frontpage data={data.frontpage} />
      <Recommend data={data.recommend} />
      <Selling data={data.selling} />
      {/* <ProductListing products={data?.shopifyCollection?.products} /> */}
      {/* <ProductListing products={data?.all?.nodes} /> */}
    </>
  )
}
export default IndexPage;

export const Head = () => <Seo />
