'use client'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Drawer
} from "@material-tailwind/react";
import "./index.less"

const DrawerToBody = (props) => {
  const { placement = "right", children, className = "", open = false, onClose } = props
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    setVisible(open)
  }, [open])
  const closeDrawer = () => {
    setVisible(false)
    if(onClose){
      onClose()
    }
  }

  return ReactDOM.createPortal(<Drawer
      placement={placement}
      open={visible}
      overlayProps={{
        className: "custom-overlay"
      }}
      onClose={closeDrawer}
      className={`p-4 drawer-container ms:w-full md:w-1/2 lg:w-2/5 ${className}`}
      size={"100%"}
    >
      {children}
    </Drawer>)
}

export default DrawerToBody