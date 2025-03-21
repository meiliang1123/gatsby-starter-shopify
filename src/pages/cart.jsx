import * as React from "react"
import { Link } from "gatsby"
/* 👇 Import the withAuthenticationRequired HOC 👇 */ 
// import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { StoreContext } from "@context/store-context"
import { LineItem } from "@components/line-item"
import { formatPrice } from "@utils/format-price"
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  title,
} from "./cart.module.css"
import { Seo } from "@components/seo"

const CartPage = () => {
  // const { isAuthenticated, loginWithRedirect,user } = useAuth0();

  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0
  console.log(checkout, "checkout")
  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <>
      <div className={wrap}>
        {emptyCart ? (
          <div className={emptyStateContainer}>
            <h1 className={emptyStateHeading}>Your cart is empty</h1>
            <p>
              Looks like you haven’t found anything yet. We understand that
              sometimes it’s hard to choose — maybe this helps:
            </p>
            <Link to="/search?s=BEST_SELLING" className={emptyStateLink}>
              View trending products
            </Link>
          </div>
        ) : (
          <>
            <h1 className={title}>Your cart</h1>
            <table className={table}>
              <thead>
                <tr>
                  <th className={imageHeader}>Image</th>
                  <th className={productHeader}>Product</th>
                  <th className={collapseColumn}>Price</th>
                  <th>Qty.</th>
                  <th className={[totals, collapseColumn].join(" ")}>Total</th>
                </tr>
              </thead>
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className={summary}>
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={labelColumn}>Subtotal</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={labelColumn}>Taxes</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={labelColumn}>Shipping</td>
                  <td className={totals}>Calculated at checkout</td>
                </tr>
                <tr className={grandTotal}>
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={collapseColumn} aria-label="collapse colimn" />
                  <td className={labelColumn}>Total Price</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={checkoutButton}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  )
}
export default CartPage
// export default withAuthenticationRequired(CartPage)
export const Head = () => <Seo />
