
import * as React from "react"
import { Input } from "@material-tailwind/react";

export function CurrencyField({
  className,
  ...props
}) {
  return (
    <Input 
      className={`${className}`}
      type="number"
      inputMode="numeric"
      {...props}
    />
  )
}
