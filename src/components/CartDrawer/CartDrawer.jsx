import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "gatsby"
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { StoreContext } from "@context/store-context"
import { LineItem } from "./LineItem/LineItem"
import { formatPrice } from "@utils/format-price"

import "./CartDrawer.less";
 
export function CartDrawer({ visible, onClose }) {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const [openRight, setOpenRight] = React.useState(visible)
  console.log(checkout, "checkout")

  useEffect(() => {
    setOpenRight(visible)
  }, [visible])

  const onCheckout = () => {
    window.open(checkout.webUrl)
  }

  const closeDrawerRight = () => {
    setOpenRight(false);
    if(onClose){
      onClose()
    }
  }
  return (
    ReactDOM.createPortal(<Drawer
      placement="right"
      open={openRight}
      overlayProps={{
        className: "custom-overlay"
      }}
      onClose={closeDrawerRight}
      className="p-4 cart-drawer-container ms:w-full md:w-1/2 lg:w-2/5"
      size={"100%"}
    >
      <div className="cart-drawer-title mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Shopping cart
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={closeDrawerRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className="cart-drawer-content">
        {emptyCart ? (
          <div className="empty-state-container">
            <h1 className="empty-state-heading">Your cart is empty</h1>
            <p>
              Looks like you haven’t found anything yet. We understand that
              sometimes it’s hard to choose — maybe this helps:
            </p>
            <Link to="/search?s=BEST_SELLING" className="empty-state-link">
              View trending products
            </Link>
          </div>
        ) : (
          <ul className="-my-6 divide-y divide-gray-200">
            {
              checkout.lineItems.map((item) => (
                <LineItem item={item} key={item.id} />
              ))
            }
          </ul>
        )}
      </div>
      {
        !emptyCart && <div className="cart-drawer-footer border-t border-gray-200 px-4 py-6 mt-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>
              {formatPrice(
                checkout.subtotalPriceV2?.currencyCode,
                checkout.subtotalPriceV2?.amount
              )}
            </p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Taxes</p>
            <p>
              {formatPrice(
                checkout.totalTaxV2.currencyCode,
                checkout.totalTaxV2.amount
              )}
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping calculated at checkout.</p>
          <Button
            onClick={onCheckout}
            className="flex items-center w-full mt-6 justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            disabled={loading}
            loading={loading}
          >
            Checkout
          </Button>
          {/* <div className="mt-6" onClick={onCheckout}>
            <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
          </div> */}
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={closeDrawerRight}>
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      }
    </Drawer>, document.body)
  );
}