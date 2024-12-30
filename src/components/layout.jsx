import * as React from "react"
import { SkipNavContent, SkipNavLink } from "./skip-nav"
import { Header } from "./header"
import { Footer } from "./footer"
import "./layout.less"

export function Layout({ children }) {
  return (
    <div className="layout-container">
      <SkipNavLink />
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  )
}
