import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { formatPrice } from "@utils/format-price"

import "./ProductCard.less"

export function ProductCard({ product, eager }) {
  const {
    title,
    priceRangeV2,
    slug,
    media,
    vendor,
    storefrontImages,
  } = product
  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )
  
  const defaultImageHeight = 200
  const defaultImageWidth = 200
  let storefrontImageData = {}
  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0]?.node
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: "fixed",
        width: defaultImageWidth,
        height: defaultImageHeight,
      })
    } catch (e) {
      console.error(e)
    }
  }
  const firstImage = media?.[0]
  const hasImage = firstImage || Object.getOwnPropertyNames(storefrontImageData || {}).length
  
  return (
    <Link
      className="product-card-container group relative"
      to={slug}
      aria-label={`View ${title} product page`}
    >
      {hasImage
        ? (
          <div className="product-image aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto" data-name="product-image-box">
            <GatsbyImage
              alt={firstImage?.image?.altText ?? title}
              className="rounded-sm"
              // image={firstImage?.gatsbyImageData ?? storefrontImageData}
              image={firstImage?.image?.gatsbyImageData ?? storefrontImageData}
              loading={eager ? "eager" : "lazy"}
            />
          </div>
        ) : (
          <div style={{ height: defaultImageHeight, width: defaultImageWidth }} />
        )
      }
      <div className="product-details mt-4 flex justify-between">
        <div>
          <h3 className="product-heading text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {title}
          </h3>
          <p className="product-vendor mt-1 text-sm text-gray-500">{vendor}</p>
        </div>
        <p className="product-price text-sm font-medium text-gray-900">{price}</p>
      </div>
      {/* <div className="product-details">
        <div className="product-vendor">{vendor}</div>
        <h2 as="h2" className="product-heading">
          {title}
        </h2>
        <div className="product-price">{price}</div>
      </div> */}
    </Link>
  )
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    # images {
    #   id
    #   altText
    #   gatsbyImageData(aspectRatio: 1, width: 640)
    # }
    media {
      ... on ShopifyMediaImage {
        image {
          gatsbyImageData(aspectRatio: 1, width: 640, layout: FULL_WIDTH),
          altText
        }
        id
      }
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
    description
    descriptionHtml
    productType
    seo {
      description
      title
    }
    tags
  }
`
