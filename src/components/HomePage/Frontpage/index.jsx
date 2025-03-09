import React from "react";
import * as motion from "motion/react-client"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Button } from "@material-tailwind/react";
import "./index.less"
const Frontpage = ({ data }) => {
  const { products } = data

  console.log(products, "开始的方式快递发", data)

  const itemBuilder = (product, index) => {
    const { slug, title, media, priceRangeV2 } = product
    return (
      <div className="item-container" key={index}>
        <div className="item-info">
          <div className="item-title">{title}</div>
          {/* <div className="item-price">{priceRangeV2.minVariantPrice.amount}</div> */}
          <div className="item-description">Here is description of the product Here is description of the product Here is description of the product Here is description of the product Here is description of the product</div>
        </div>
        <motion.div
          className="motion-container"
          initial={{ width: "80%" }}  // 初始宽度 80%
          whileInView={{ width: "100%" }}  // 进入视口后变为 100%
          transition={{ duration: 0.8, ease: "easeOut" }} // 过渡动画
          viewport={{ amount: 0.8}} // 进入 10% 视口后触发，仅执行一次
        >
          <div className="item-img">
            <GatsbyImage
              alt={media?.[0]?.image.altText}
              // image={firstImage?.gatsbyImageData ?? storefrontImageData}
              image={media?.[0]?.image.gatsbyImageData}
              loading="eager"
            />
            {/* <img src={product.images[0].src} alt="" /> */}
          </div>
        </motion.div>
        <Link
          className="item-button"
          to={slug}
          aria-label={`View ${title} product page`}
        ><Button color="blue">More</Button></Link>
      </div>
    )
  }

  return (
    <div className="frontpage-contaner">
      {
        (products || []).map((product, index) => {
          return itemBuilder(product, index)
        })
      }
    </div>
  )
}

export default Frontpage
