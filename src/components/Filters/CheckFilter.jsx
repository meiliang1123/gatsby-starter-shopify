import React, { useState } from "react"
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox
} from "@material-tailwind/react";
import { CgMathMinus, CgMathPlus, CgTrash } from "react-icons/cg";

import "./index.less"

export function CheckFilter({
  items,
  name,
  selectedItems = [],
  setSelectedItems,
  open = true,
}) {

  const [alwaysOpen, setAlwaysOpen] = useState(open)
  const toggleItem = ({ currentTarget: input }) => {
    if (input.checked) {
      setSelectedItems([...selectedItems, input.value])
    } else {
      const idx = selectedItems.indexOf(input.value)
      if (idx === -1) {
        return
      }
      const newItems = [
        ...selectedItems.slice(0, idx),
        ...selectedItems.slice(idx + 1),
      ]
      setSelectedItems(newItems)
    }
  }

  const clearItems = () => {
    setSelectedItems([])
  }

  const onOpenToggle = () => {
    setAlwaysOpen(!alwaysOpen)
  }

  return (
    <Accordion open={alwaysOpen} className="filter-block-container">
      {name && (
        <AccordionHeader className="accordion-header border-none flex items-center justify-between text-md" onClick={onOpenToggle}>
          <div className="flex items-center">
            {name}{" "}
            {selectedItems.length ? (
              <CgTrash
                className="text-gray-600 ml-4"
                onClick={clearItems}
              />
            ) : null}
          </div>
          {
            alwaysOpen ? <CgMathMinus className="text-gray-400" /> : <CgMathPlus className="text-gray-400" />
          }
        </AccordionHeader>
      )}
      <AccordionBody className="flex flex-col">
        {items.map((item) => (
          <Checkbox
            className="checkbox-item"
            key={item}
            value={item}
            checked={selectedItems.includes(item)}
            label={item || "None"}
            onChange={toggleItem}
            containerProps={{
              className: "label-item py-2 -ml-2"
            }}
            labelProps={{
              className: "mt-0 font-normal"
            }}
          />
        ))}
      </AccordionBody>
    </Accordion>
  )
}
