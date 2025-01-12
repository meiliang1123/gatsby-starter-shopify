import * as React from "react"
import debounce from "lodash.debounce"
import { StoreContext } from "@context/store-context"
import { formatPrice } from "@utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
// import DeleteIcon from "@icons/delete"
// import { NumericInput } from "@ui/NumericInput/NumericInput"
import "./LineItem.less"

export function LineItem({ item }) {
  const {
    removeLineItem,
    checkout,
    updateLineItem,
    // loading,
  } = React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  }
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount)
  )

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity
  )

  const onRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  // const handleQuantityChange = (value) => {
  //   if (value !== "" && Number(value) < 1) {
  //     return
  //   }
  //   setQuantity(value)
  //   if (Number(value) >= 1) {
  //     debouncedUli(value)
  //   }
  // }

  // function doIncrement() {
  //   handleQuantityChange(Number(quantity || 0) + 1)
  // }

  // function doDecrement() {
  //   handleQuantityChange(Number(quantity || 0) - 1)
  // }

  const image = React.useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 160,
        height: 160,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src]
  )

  return (
    <li class="flex py-6">
      <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </div>
      <div class="ml-4 flex flex-1 flex-col">
        <div>
          <div class="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{item.title}</a>
            </h3>
            <p class="ml-4">{`${price} / ${subtotal}`}</p>
          </div>
          <p class="mt-1 text-sm text-gray-500">{item.variant.title === "Default Title" ? "" : item.variant.title}</p>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <p class="text-gray-500">
            Qty: {quantity}
            {/* <NumericInput 
              disabled={loading}
              value={quantity}
              aria-label="Quantity"
              onIncrement={doIncrement}
              onDecrement={doDecrement}
              onChange={(e) => handleQuantityChange(e.currentTarget.value)}
            /> */}
          </p>

          <div class="flex">
            <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" onClick={onRemove}>Remove</button>
          </div>
        </div>
      </div>
    </li>
    // <tr>
    //   <td>
    //     {image && (
    //       <GatsbyImage
    //         key={variantImage.src}
    //         image={image}
    //         alt={variantImage.altText ?? item.variant.title}
    //       />
    //     )}
    //   </td>
    //   <td>
    //     <h2 className="title">{item.title}</h2>
    //     <div className="variant">
    //       {item.variant.title === "Default Title" ? "" : item.variant.title}
    //     </div>
    //     <div className="remove">
    //       <button onClick={onRemove}>
    //         <DeleteIcon /> Remove
    //       </button>
    //     </div>
    //   </td>
    //   <td className="price-column">{price}</td>
    //   <td>
    //     <NumericInput
    //       disabled={loading}
    //       value={quantity}
    //       aria-label="Quantity"
    //       onIncrement={doIncrement}
    //       onDecrement={doDecrement}
    //       onChange={(e) => handleQuantityChange(e.currentTarget.value)}
    //     />
    //   </td>
    //   <td className="totals">{subtotal}</td>
    // </tr>
  )
}