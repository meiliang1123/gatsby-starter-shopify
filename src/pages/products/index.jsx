import * as React from "react"
import { graphql } from "gatsby"
import { ProductListing } from "@components/ProductList/ProductListing"
import { Seo } from "@components/seo"
import { MoreButton } from "@components/more-button"
import "./index.less"

export default function Products({ data: { products } }) {
  return (
    <>
      <h1 className="title">Products</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search#more`}>More products</MoreButton>
      )}
    </>
  )
}

export const Head = () => <Seo title="All Products" />

export const query = graphql`
  {
    products: allShopifyProduct(sort: { publishedAt: ASC }, limit: 24) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
