import * as React from "react"
import { ProductCard } from "@components/ProductCard/ProductCard"
import "./ProductListing.less"

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
export function ProductListing({ products = [] }) {
  return (
    <div className="product-list-container mx-auto max-w-2xl px-6 py-16px sm:px-6px sm:py-24px lg:max-w-7xl lg:px-8px">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((p, index) => (
          <ProductCard product={p} key={p.id} eager={index === 0} />
        ))}
      </div>
    </div>
  )
}
