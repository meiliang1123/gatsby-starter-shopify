import * as React from "react"
import { graphql } from "gatsby"
import { ProductListing } from "@components/ProductList/ProductListing"
import { Seo } from "../../../components/seo"
import slugify from "@sindresorhus/slugify"
import { MoreButton } from "../../../components/more-button"
import "../index.less"

export default function ProductTypeIndex({
  data: { products },
  pageContext: { productType },
}) {
  return (
    <>
      <h1 className="title">{productType}</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search?p=${slugify(productType)}#more`}>
          More Products
        </MoreButton>
      )}
    </>
  )
}

export const Head = ({ pageContext: { productType } }) => (
  <Seo title={`Category: ${productType}`} />
)

export const query = graphql`
  query ($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
      sort: { publishedAt: ASC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
