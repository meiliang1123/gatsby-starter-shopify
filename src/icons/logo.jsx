import { initial } from "lodash"
import * as React from "react"

function Logo(props) {
  return (
    <img
      style={{width: 115, maxWidth: "initial"}}
      src="/logo.svg"
      alt="logo"
    />
  )
}

export default Logo
