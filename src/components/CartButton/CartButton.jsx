import * as React from "react"
// import { Link } from "gatsby"
import { CartDrawer } from "@components/CartDrawer/CartDrawer"
import CartIcon from "@icons/cart"
import "./CartButton.less"

export function CartButton({ quantity }) {
  const [visible, setVisible] = React.useState(false)

  const drawerShow = () => setVisible(true)

  return (
    <React.Fragment>
      <div className="cart-button" onClick={drawerShow}>
        <CartIcon />
        {quantity > 0 && <div className="badge">{quantity}</div>}
      </div>
      <CartDrawer visible={visible} onClose={() => setVisible(false)} />
    </React.Fragment>
    // <Link
    //   aria-label={`Shopping Cart with ${quantity} items`}
    //   to="/cart"
    //   className={cartButton}
    // >
    //   <CartIcon />
    //   {quantity > 0 && <div className={badge}>{quantity}</div>}
    // </Link>
  )
}
