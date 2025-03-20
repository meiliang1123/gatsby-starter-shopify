import React from "react"
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { CgRedo } from "react-icons/cg";
import { CheckFilter } from "./CheckFilter"
import { CurrencyField } from "./CurrencyField"

export function Filters({
  currencyCode,
  productTypes,
  tags,
  vendors,
  filters,
  setFilters,
  className
}) {
  const updateFilter = (key, value) => {
    setFilters((filters) => ({ ...filters, [key]: value }))
  }

  const updateNumeric = (key, value) => {
    if (
      !isNaN(Number(value)) ||
      (value.endsWith(".") && !isNaN(Number(value.substring(0, -1))))
    ) {
      updateFilter(key, value)
    }
  }

  return (
    <div className={`${className}`}>
      <CheckFilter
        name="Type"
        items={productTypes}
        selectedItems={filters.productTypes}
        setSelectedItems={(value) => updateFilter("productTypes", value)}
      />
      <hr />
      <Accordion open={true} className="filter-block-container">
        <AccordionHeader className="accordion-header border-none flex items-center justify-between text-md">
          <div className="flex items-center">
            Price
            {(filters.maxPrice || filters.minPrice) && (
              <button
                className="text-gray-600 ml-4"
                onClick={() =>
                  setFilters((filters) => ({
                    ...filters,
                    maxPrice: "",
                    minPrice: "",
                  }))
                }
              >
                <CgRedo />
              </button>
            )}
          </div>
        </AccordionHeader>
        <AccordionBody>
          <CurrencyField
            {...currencyCode}
            aria-label="Minimum price"
            label="Minimum price"
            placeholder="Minimum price"
            value={filters.minPrice}
            onChange={(event) =>
              updateNumeric("minPrice", event.currentTarget.value)
            }
          />{" "}
          –{" "}
          <CurrencyField
            {...currencyCode}
            aria-label="Maximum price"
            label="Maximum price"
            placeholder="Maximum price"
            value={filters.maxPrice}
            onChange={(event) =>
              updateNumeric("maxPrice", event.currentTarget.value)
            }
          />
        </AccordionBody>
      </Accordion>
      <hr />
      <CheckFilter
        name="Brands"
        items={vendors}
        selectedItems={filters.vendors}
        setSelectedItems={(value) => updateFilter("vendors", value)}
      />
      <hr />
      <CheckFilter
        open={true}
        name="Tags"
        items={tags}
        selectedItems={filters.tags}
        setSelectedItems={(value) => updateFilter("tags", value)}
      />
    </div>
  )
}
