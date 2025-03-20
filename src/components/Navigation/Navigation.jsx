import { graphql, useStaticQuery, navigate } from "gatsby"
import * as React from "react"
import {
  Collapse,
  Typography,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import slugify from "@sindresorhus/slugify"
import { MENUS } from "./const"
import "./Navigation.less"
// import { MegaMenuWithHover } from "./Builder"

export function Navigation({ className, onNavChange }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    {
      allShopifyProduct {
        productTypes: distinct(field: { productType: SELECT })
      }
    }
  `)

  const [childrenMap] = React.useState({productTypes})

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("body-mask")
    } else {
      document.body.classList.remove("body-mask")
    }
  }, [isMenuOpen])

  const onNavigate = (link) => {
    navigate(link)
    if (onNavChange) onNavChange()
  }

  const LinkCustom = ({to, children}) => {
    return (
      <div role="button" alaria-label="nav link" onClick={() => onNavigate(to)}>
        {children}
      </div>
    )
  }

  const NavListMenu = (list, menu) => {

    const renderItems = list.map((name, key) => {
      return (
        <MenuItem key={`menuitem${key}${Math.random()}`} className="hover:text-black hover:bg-transparent text-gray-600 w-auto flex-shrink-0 flex-grow-0">
          {
            name ? <LinkCustom  to={`/products/${slugify(name)}`}>{name}</LinkCustom> : <LinkCustom to="/products/">All products</LinkCustom>
          }
        </MenuItem>
      );
    }
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={0}
        placement="bottom"
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray hover:bg-transparent active:bg-transparent focus:bg-transparent"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((cur) => !cur)
                onNavigate(menu.link)
              }}
            >
              {menu.title}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="dropmenu-conainer hidden w-screen lg:block border-none shadow-none z-[99] rounded-none">
          <ul className="flex justify-center outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
  }

  const NavList = () => {
    return (
      <List className={`nav-container ${isMenuOpen ? "nav-container__open" : ""} mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1`}>
        {
          MENUS.map((menu, index) => {
            const { title, link, childrenKey } = menu
            const children = menu.children || (childrenKey ? childrenMap[childrenKey] : [])

            return children.length ? NavListMenu(children, menu) : <ListItem key={`nav${index}${Math.random()}`} className="flex items-center gap-2 py-2 pr-4 font-medium hover:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent">
              <LinkCustom to={link} >{title}</LinkCustom>
            </ListItem>
          })
        }
      </List>
    );
  }

  return NavList()
}
