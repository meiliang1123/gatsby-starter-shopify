import * as React from "react"
import { graphql } from "gatsby"
import slugify from "@sindresorhus/slugify"
import debounce from "debounce"
import { CgChevronRight, CgChevronLeft, CgChevronDown, CgClose } from "react-icons/cg"
import { Menu, MenuHandler, MenuList, MenuItem, Drawer, Typography, Input, Button } from "@material-tailwind/react";
import FilterIcon from "@icons/filter"
// import SearchIcon from "@icons/search"
import { ProductCard } from "@components/ProductCard/ProductCard"
import { useProductSearch } from "@utils/hooks"
import { getValuesFromQuery } from "@utils/search"
import { getCurrencySymbol } from "@utils/format-price"
import { Spinner } from "@components/progress"
import { Filters } from "@components/Filters/index"
import { SearchProvider } from "@context/search-provider"
import {
  pagination,
  paginationButton,
  progressStyle,
  resultsStyle,
  modalOpen,
  emptyState,
} from "./search-page.module.css"
import "./index.less"
import { Seo } from "@components/seo"

const DEFAULT_PRODUCTS_PER_PAGE = 24
const SORT_CONFIG = [
  {
    label: "Relevance",
    key: "RELEVANCE"
  },
  {
    label: "Price",
    key: "PRICE"
  },
  {
    label: "Title",
    key: "TITLE"
  },
  {
    label: "Created",
    key: "CREATED_AT"
  },
  {
    label: "Trending",
    key: "BEST_SELLING"
  },
]

// export async function getServerData({ query, ...rest }) {
//   const { getSearchResults } = require("../utils/search")
//   const products = await getSearchResults({
//     query,
//     count: DEFAULT_PRODUCTS_PER_PAGE,
//   })

//   return {
//     props: {
//       query,
//       products,
//     },
//   }
// }

export const query = graphql`
  {
    meta: allShopifyProduct {
      productTypes: distinct(field: { productType: SELECT })
      tags: distinct(field: { tags: SELECT })
      vendors: distinct(field: { vendor: SELECT })
    }
  }
`

function SearchPage({
  serverData,
  data: {
    meta: { productTypes, vendors, tags },
  },
  location,
}) {


  serverData = {
    query:'',
    products:[]
  }

  // These default values come from the page query string
  const queryParams = getValuesFromQuery(location.search || serverData.query)

  const [filters, setFilters] = React.useState(queryParams)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialFilters = React.useMemo(() => queryParams, [])
  const [sortKey, setSortKey] = React.useState(queryParams.sortKey)
  // We clear the hash when searching, we want to make sure the next page will be fetched due the #more hash.
  const shouldLoadNextPage = React.useRef(false)

  // This modal is only used on mobile
  const [showModal, setShowModal] = React.useState(false)

  const {
    products,
    isFetching,
    filterCount,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useProductSearch(
    filters,
    {
      allProductTypes: productTypes,
      allVendors: vendors,
      allTags: tags,
    },
    sortKey,
    false,
    DEFAULT_PRODUCTS_PER_PAGE,
    serverData.products,
    initialFilters
  )

  // Scroll up when navigating
  React.useEffect(() => {
    if (!showModal) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
        // eslint-disable-next-line react-hooks/exhaustive-deps
      })
    }
  }, [products, showModal])

  // Stop page from scrolling when modal is visible
  React.useEffect(() => {
    if (showModal) {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
    }
  }, [showModal])

  // Automatically load the next page if "#more" is in the URL
  React.useEffect(() => {
    if (location.hash === "#more") {
      // save state so we can fetch it when the first page got fetched to retrieve the cursor
      shouldLoadNextPage.current = true
    }

    if (shouldLoadNextPage.current) {
      if (hasNextPage) {
        fetchNextPage()
      }

      shouldLoadNextPage.current = false
    }
  }, [location.hash, hasNextPage, fetchNextPage])

  const currencyCode = getCurrencySymbol(
    serverData.products?.[0]?.node?.priceRangeV2?.minVariantPrice?.currencyCode
  )

  return (
    <>
      <div className="search-page-container">
        <h1 className="visually-hidden">Search Results</h1>
        <div className="mx-auto max-w-7xl flex flex-col px-4 sm:px-6 lg:px-8">
          <div className="flex items-center sticky z-10 top-16 backdrop-blur-2xl bg-opacity-80 justify-between border-b border-gray-200 pt-4 pb-6">
            <SearchBar defaultTerm={filters.term} setFilters={setFilters} />
            <Menu as="div" className="flex items-center cursor-pointer relative text-left" placement="bottom">
              <MenuHandler>
                <div className="inline-flex  items-center sort-container group cursor-pointer justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ml-4">
                  Sort <CgChevronDown className="ml-2" />
                  </div>
              </MenuHandler>
              <MenuList
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {
                  SORT_CONFIG.map((option, index) => {
                    return <MenuItem 
                      className={`${sortKey === option.key ? "font-medium text-gray-900" : "text-gray-500"} block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden`} 
                      key={`${option.key}${index}`}
                      onClick={() => setSortKey(option.key)}
                    >
                      {option.label}
                    </MenuItem>
                  })
                }
              </MenuList>
            </Menu>
            <button
              className={`block lg:hidden ml-4 ${filterCount ? "active-filters" : ""}`}
              onClick={() => setShowModal(true)}
              // This is hidden because the filters are already visible to
              // screenreaders, so the modal isnt needed.
              aria-hidden
            >
              <FilterIcon />
            </button>
          </div>
          <section aria-labelledby="products-heading" className="flex-1 pt-6 pb-24 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <Filters
              className="hidden lg:block"
              setFilters={setFilters}
              filters={filters}
              tags={tags}
              vendors={vendors}
              productTypes={productTypes}
              currencyCode={currencyCode}
              visible={showModal}
              onClose={() => setShowModal(false)}
            />
            <section
              className="lg:col-span-3"
              aria-busy={isFetching}
              aria-hidden={modalOpen}
            >
              {isFetching ? (
                <p className={progressStyle}>
                  <Spinner aria-valuetext="Searching" /> Searching
                  {filters.term ? ` for "${filters.term}"…` : `…`}
                </p>
              ) : (
                <p className={resultsStyle}>
                  Search results{" "}
                  {filters.term && (
                    <>
                      for "<span>{filters.term}</span>"
                    </>
                  )}
                </p>
              )}
              {!isFetching && (
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {products.map(({ node }, index) => (
                    <li className="flex justify-center w-full" key={node.id}>
                      <ProductCard
                        eager={index === 0}
                        product={{
                          title: node.title,
                          priceRangeV2: node.priceRangeV2,
                          slug: `/products/${slugify(node.productType)}/${
                            node.handle
                          }`,
                          // The search API and Gatsby data layer have slightly different images available.
                          images: [],
                          storefrontImages: node.images,
                          vendor: node.vendor,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {!isFetching && products.length === 0 && (
                <div className={emptyState}>No results found</div>
              )}
              {hasPreviousPage || hasNextPage ? (
                <Pagination
                  previousPage={fetchPreviousPage}
                  hasPreviousPage={hasPreviousPage}
                  nextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                />
              ) : undefined}
            </section>
          </section>
        </div>
      </div>
      <Drawer 
        className="filters-drawer-container flex flex-col p-6 ms:w-full md:w-1/2 lg:w-2/5"
        open={showModal}
        placement="right"
        overlayProps={{
          className: "custom-overlay"
        }}
        size={"100%"}
        onClose={() => setShowModal(false)}
      >
        <div className="flex items-center justify-between">
          <Typography className="text-lg text-gray-900" variant="h5" color="blue-gray">
            Filters
          </Typography>
          <button className="flex mr-2 size-8 items-center justify-center cursor-pointer rounded-md hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" aria-hidden onClick={() => setShowModal(false)}>
            <CgClose className="w-10 max-w-[1.2rem] h-10 max-h-[1.2rem] text-xs text-blue-gray-500" />
          </button>
        </div>
        <Filters
          className="flex-1 overflow-auto pr-4"
          setFilters={setFilters}
          filters={filters}
          tags={tags}
          vendors={vendors}
          productTypes={productTypes}
          currencyCode={currencyCode}
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      </Drawer>
    </>
  )
}

function SearchBar({ defaultTerm, setFilters }) {
  const [term, setTerm] = React.useState(defaultTerm)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilters = React.useCallback(
    debounce((value) => {
      setFilters((filters) => ({ ...filters, term: value }))
    }, 200),
    [setFilters]
  )

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-form flex flex-1">
      <div className="relative flex-1 flex">
        <Input
          label="Search"
          className="flex-1"
          value={term}
          onChange={(e) => {
            console.log(e.target.value)
            setTerm(e.target.value)
            debouncedSetFilters(e.target.value)
          }}
          placeholder="Search..."
        />
        {
          term && <Button
          size="sm"
          color={term ? "gray" : "blue-gray"}
          className="!absolute right-1 top-1 rounded h-full"
          onClick={() => {
            setTerm("")
            setFilters((filters) => ({ ...filters, term: "" }))
          }}
        >
          Clear
        </Button>
          // term && <button
          //   className="clear-search"
          //   type="reset"
          //   onClick={() => {
          //     setTerm("")
          //     setFilters((filters) => ({ ...filters, term: "" }))
          //   }}
          //   aria-label="Clear search query"
          // >
          //   <CgClose />
          // </button>
        }
      </div>
      {/* <input
        type="text"
        value={term}
        className="flex-1"
        onChange={(e) => {
          setTerm(e.target.value)
          debouncedSetFilters(e.target.value)
        }}
        placeholder="Search..."
      />
      {term ? (
        <button
          className="clear-search"
          type="reset"
          onClick={() => {
            setTerm("")
            setFilters((filters) => ({ ...filters, term: "" }))
          }}
          aria-label="Clear search query"
        >
          <CgClose />
        </button>
      ) : undefined} */}
    </form>
  )
}
/**
 * Shopify only supports next & previous navigation
 */
function Pagination({ previousPage, hasPreviousPage, nextPage, hasNextPage }) {
  return (
    <nav className={pagination}>
      <button
        className={paginationButton}
        disabled={!hasPreviousPage}
        onClick={previousPage}
        aria-label="Previous page"
      >
        <CgChevronLeft />
      </button>
      <button
        className={paginationButton}
        disabled={!hasNextPage}
        onClick={nextPage}
        aria-label="Next page"
      >
        <CgChevronRight />
      </button>
    </nav>
  )
}

export default function SearchPageTemplate(props) {
  return (
    <SearchProvider>
      <SearchPage {...props} />
    </SearchProvider>
  )
}

export const Head = () => <Seo />
