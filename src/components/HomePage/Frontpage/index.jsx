import React from "react";
import * as motion from "motion/react-client"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Button } from "@material-tailwind/react";
import "./index.less"
const Frontpage = ({ data }) => {
  const { products } = data

  const itemBuilder = (product, index) => {
    const { slug, title, media, priceRangeV2 } = product
    return (
        <motion.div
          key={index+slug}
          className="motion-container flex-shrink-0"
          style={{flex: `${index + 1}`}}
          // initial={{ scale: 1 }}  // 进入视口后变为 100%
          whileHover={{scale: 1.01}}
          transition={{ duration: 0.5, ease: "easeOut" }} // 过渡动画
        >
          <div className={`item-container relative rounded-md overflow-hidden mb-4`} key={index}>
            <div className="item-info absolute z-10 left-0 text-white w-[100%] bg-black bg-opacity-20 backdrop-blur-sm h-[100%] m-auto p-10 pb-16 flex flex-col justify-end text-left">
              <div className="item-title">{title}</div>
              <div className="item-price">Starting from {priceRangeV2.minVariantPrice.amount}{priceRangeV2.minVariantPrice.currencyCode}</div>
              <div className="item-description h-16 overflow-hidden text-ellipsis line-clamp-3 leading-[1.4]">Here is description of the product Here is description of the product Here is description of the product Here is description of the product Here is description of the product</div>
            </div>
          <div className="item-img">
          <GatsbyImage
            alt={media?.[0]?.image.altText}
            className="lg:h-[60vh] h-[30vh]"
            // image={firstImage?.gatsbyImageData ?? storefrontImageData}
            image={media?.[0]?.image.gatsbyImageData}
            loading="eager"
          />
          {/* <img src={product.images[0].src} alt="" /> */}
        </div>
        <Link
          className="item-button relative z-20"
          to={slug}
          aria-label={`View ${title} product page`}
        ><Button color="blue">More</Button></Link>
      </div>
      </motion.div>
      
    )
  }

  return (
    <div className="frontpage-contaner mb-[2vh]">
      <h1 className="text-4xl font-bold text-center px-5 mt-14 mb-8">Great deals and the latest tech for your business</h1>
      <div className={`lg:flex gap-4 lg:gap-8 mx-8 lg:mx-20`}>
        {
          (products || []).map((product, index) => {
            return itemBuilder(product, index)
          })
        }
      </div>
    </div>
  )
}

export default Frontpage
