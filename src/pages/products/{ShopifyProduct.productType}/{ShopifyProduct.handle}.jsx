import * as React from "react"
import { graphql, Link } from "gatsby"
import isEqual from "lodash.isequal"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { Carousel, Radio } from "@material-tailwind/react";

import { StoreContext } from "@context/store-context"
import { AddToCart } from "@components/add-to-cart"
import { NumericInput } from "@components/numeric-input"
import { formatPrice } from "@utils/format-price"
import { Seo } from "@components/seo"
import { CgChevronRight as ChevronIcon } from "react-icons/cg"
import {
  productBox,
  container,
  header,
  // productImageWrapper,
  // productImageList,
  // productImageListItem,
  // scrollForMore,
  noImagePreview,
  optionsWrapper,
  priceValue,
  selectVariant,
  labelFont,
  breadcrumb,
  tagList,
  addToCartStyle,
  metaSection,
  productDescription,
} from "./product-page.module.css"

export default function Product({ data: { product, suggestions } }) {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    media: images,
  } = product
  const { client } = React.useContext(StoreContext)

  const [variant, setVariant] = React.useState({ ...initialVariant })
  const [quantity, setQuantity] = React.useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  )

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (index, event) => {
    const value = event.target.value

    if (value === "") {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })

    setVariant({ ...selectedVariant })
  }

  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0
  const hasMultipleImages = true || images.length > 1
  return (
    <>
      <div className={container}>
        <div className={productBox}>
          {hasImages && (
            <Carousel
              className="rounded-xl"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
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
                images.map((image, index) => (
                  <GatsbyImage
                    objectFit="contain"
                    loading={index === 0 ? "eager" : "lazy"}
                    alt={
                      image?.image?.altText
                        ? image?.image.altText
                        : `Product Image of ${title} #${index + 1}`
                    }
                    className="h-full w-full object-cover"
                    image={image?.image?.gatsbyImageData}
                  />
                ))
              }
            </Carousel>
          )}
          {!hasImages && (
            <span className={noImagePreview}>No Preview image</span>
          )}
          <div>
            <div className={breadcrumb}>
              <Link to={product.productTypeSlug}>{product.productType}</Link>
              <ChevronIcon size={12} />
            </div>
            <h1 className={header}>{title}</h1>
            <p className={productDescription}>{description}</p>
            <h2 className={priceValue}>
              <span>{price}</span>
            </h2>
            <fieldset className={optionsWrapper}>
              {hasVariants &&
                options.map(({ id, name, values }, index) => (
                  <div className={selectVariant} key={id}>
                    <select
                      aria-label="Variants"
                      onChange={(event) => handleOptionChange(index, event)}
                    >
                      <option value="">{`Select ${name}`}</option>
                      {values.map((value) => (
                        <option value={value} key={`${name}-${value}`}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </fieldset>
            <div className={addToCartStyle}>
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                value={quantity}
                min="1"
                max="20"
              />
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
            <div className={metaSection}>
              <span className={labelFont}>Type</span>
              <span className={tagList}>
                <Link to={product.productTypeSlug}>{product.productType}</Link>
              </span>
              <span className={labelFont}>Tags</span>
              <span className={tagList}>
                {product.tags.map((tag) => (
                  <Link to={`/search?t=${tag}`}>{tag}</Link>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Head = ({ data: { product } }) => {
  const {
    title,
    description,
    media: [firstImage],
  } = product

  return (
    <>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage?.image?.gatsbyImageData)}
        />
      ) : undefined}
    </>
  )
}

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      # images {
      #   # altText
      #   id
      #   gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      # }
      media {
        ... on ShopifyMediaImage {
          image {
            gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
            altText
          }
          id
        }
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        shopifyId
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
