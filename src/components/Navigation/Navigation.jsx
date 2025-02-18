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

  const onNavigate = (link) => {
    navigate(link)
    if (onNavChange) onNavChange()
  }

  const LinkCustom = ({to, children}) => {
    return (
      <div onClick={() => onNavigate(to)}>
        {children}
      </div>
    )
  }

  const NavListMenu = (list, title) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const renderItems = list.map((name, key) => {
      return (
        <MenuItem key={`menuitem${key}`} className="hover:text-black text-gray-900">
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
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((cur) => !cur)
              }}
            >
              {title}
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
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
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
      <List className="nav-container mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        {
          MENUS.map((menu, index) => {
            const { title, link, childrenKey } = menu
            const children = menu.children || (childrenKey ? childrenMap[childrenKey] : [])

            return children.length ? NavListMenu(children, title) : <ListItem key={`nav${index}`} className="flex items-center gap-2 py-2 pr-4 font-medium hover:text-black">
              <LinkCustom to={link} >{title}</LinkCustom>
            </ListItem>
          })
        }
      </List>
    );
  }

  return NavList()
}
