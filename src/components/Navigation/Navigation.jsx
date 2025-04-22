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
} from "@material-tailwind/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

import slugify from "@sindresorhus/slugify"
import { MENUS } from "./const"
import "./Navigation.less"

export function Navigation({ className, onNavChange }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    {
      allShopifyProduct {
        productTypes: distinct(field: { productType: SELECT })
      }
    }
  `)

  const childrenMap = { productTypes }

  React.useEffect(() => {
    document.body.classList.toggle("body-mask", isMenuOpen)
  }, [isMenuOpen])

  const onNavigate = (link) => {
    navigate(link)
    if (onNavChange) onNavChange()
  }

  const LinkCustom = ({ to, children }) => (
    <div
      role="button"
      aria-label="nav link"
      onClick={() => onNavigate(to)}
    >
      {children}
    </div>
  )

  const renderMenuItems = (list, prefix = "") =>
    list.map((name, index) => {
      const key = `${prefix}-menuitem-${slugify(name || "all")}`
      return (
        <MenuItem
          key={key}
          className="hover:text-black hover:bg-transparent text-gray-600 w-auto flex-shrink-0 flex-grow-0"
        >
          <LinkCustom to={`/products/${slugify(name)}`}>
            {name || "All products"}
          </LinkCustom>
        </MenuItem>
      )
    })

  const NavListMenu = (list, menu) => {
    return (
      <>
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
              {renderMenuItems(list)}
            </ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{renderMenuItems(list, "mobile")}</Collapse>
        </div>
      </>
    )
  }

  const NavList = () => (
    <List
      className={`nav-container ${isMenuOpen ? "nav-container__open" : ""} mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1`}
    >
      {MENUS.map((menu, index) => {
        const { title, link, childrenKey } = menu
        const children = menu.children || (childrenKey ? childrenMap[childrenKey] : [])
        const key = `nav-${slugify(title)}-${index}`

        return children.length
          ? <React.Fragment key={key}>{NavListMenu(children, menu)}</React.Fragment>
          : (
            <ListItem
              key={key}
              className="flex items-center gap-2 py-2 pr-4 font-medium hover:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent"
            >
              <LinkCustom to={link}>{title}</LinkCustom>
            </ListItem>
          )
      })}
    </List>
  )

  return NavList()
}