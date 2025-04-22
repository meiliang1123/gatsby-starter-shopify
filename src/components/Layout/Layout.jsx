import * as React from "react"
import { SkipNavContent, /* SkipNavLink */ } from "@components/skip-nav"
import { Header } from "@components/Header/Header"
import { Footer } from "@components/Footer/Footer"
// import ClientOnly from "@components/ClientOnly"
import "./Layout.less"

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* <SkipNavLink /> */}
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  )
}

export default Layout
