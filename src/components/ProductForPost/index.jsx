import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { urqlClient } from "@context/search-provider"
import { StoreContext } from "@context/store-context"

import "./index.less"
import { lowerCase } from "lodash"

const ProductForPost = (props) => {
  const { client } = React.useContext(StoreContext)
  const [data, setData] = useState({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      const gid = atob(props.id)
      console.log(gid)
      fetchProduct(gid)
      client.product.fetch(gid).then((fetchedProduct) => {
        console.log(fetchedProduct, "result=====")
      })
    }
  }, [])

  const fetchProduct = async (id) => {
    const results = await urqlClient.query(
      `query ($id: ID!) {
        product(id: $id) {
          id
          title
          productType
          handle
          featuredImage {
            height
            altText
          }
          description
          descriptionHtml
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          seo {
            description
            title
          }
          tags
          vendor
          variants(first: 10) {
            nodes {
              id
              title
            }
          }
        }
      }`,
      {id}
    ).toPromise()
    setData(results.data?.product || {})
    console.log("fetchProduct", results)
  }
  
  return (
    <>
      <div>{data.title}</div>
      <Link to={`/products/${lowerCase(data.productType)}/${data.handle}`}>
        buy now
      </Link>
    </>
  )
}

export default ProductForPost
