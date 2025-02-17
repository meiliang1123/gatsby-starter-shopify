import * as React from "react"
import { Typography } from "@material-tailwind/react"
import { Link } from "gatsby"
import Logo from "@icons/logo"
import "./Footer.less"

export function Footer() {
  return (
    <footer className="footer-container w-full bg-white p-4 text-gray-600">
      <hr className="my-8 border-blue-gray-50" />
      <div className="gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <Typography color="gray" variant="paragraph" className="block text-center font-normal">
          <Logo className="inline-block mr-4" />Copyright &copy; {new Date().getFullYear()} · All rights reserved
        </Typography>
         <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 justify-center underline underline-offset-2">
           <li>
             <Typography
               color="gray" variant="paragraph"
               className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
             >
              <Link to="/about">About Us</Link>
             </Typography>
           </li>
           <li>
             <Typography
               color="gray" variant="paragraph"
               className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
             >
              <Link to="/contact">Contact Us</Link>
             </Typography>
           </li>
         </ul>
       </div>
    </footer>
  )
}
