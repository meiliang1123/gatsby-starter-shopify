import * as React from "react"
import { Link } from "gatsby"
// import { StoreContext } from "../context/store-context"
import { StoreContext } from "@context/store-context"

// import Logo from "@icons/logo"
import { Navigation } from "@components/Navigation/Navigation"
import { CartButton } from "@components/CartButton/CartButton"
// import { CartButton } from "@components/cart-button"
import SearchIcon from "@icons/search"
import { Toast } from "@components/toast"
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "./Header.less"

export function Header({className}) {
  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)
   const [openNav, setOpenNav] = React.useState(false);

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

   React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
    }, []);

  return (
    <header className={`${className} header-container`}>
      <Navbar className="mx-auto px-4 py-2 rounded-none max-w-none shadow-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 flex-1 lg:flex-grow-0"
          >
            <Link to="/">
              HandeDock
              {/* <Logo /> */}
            </Link>
          </Typography>
          <div className="flex-1 justify-center hidden lg:flex">
            <Navigation />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="flex-1 lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
          <Link to="/search" className="search-btn">
            <SearchIcon />
          </Link>
          {/* <CartButton quantity={quantity} /> */}
          <CartButton quantity={quantity} />
        </div>
        <Collapse open={openNav}>
          <Navigation onNavChange={() => setOpenNav(false)} />
        </Collapse>
      </Navbar>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Updating…"
        ) : (
          <>
            Added to cart{" "}
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#fff"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#fff"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#fff"
              />
            </svg>
          </>
        )}
      </Toast>
    </header>
  );
}
