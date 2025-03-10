import React from "react";
import * as motion from "motion/react-client"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Carousel } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import "./index.less"
const Frontpage = ({ data }) => {
  const { products } = data

  console.log(products, "开始的方式快递发", data)

  const itemBuilder = (product, index) => {
    const { slug, title, media, priceRangeV2 } = product
    return (
      <div className="item-container relative" key={index}>
        <motion.div
          className="motion-container absolute z-10 left-0 text-white w-[100%] h-[100%] bg-black bg-opacity-20 backdrop-blur-sm"
          whileInView={{ opacity: 1 }}  // 初始宽度 80%
          initial={{ opacity: 0 }}  // 进入视口后变为 100%
          transition={{ duration: 0.5, ease: "easeOut" }} // 过渡动画
        >
          <div className="item-info lg:w-[50vw] sm:w-[100vw] h-[100%] m-auto p-10 pb-16 flex flex-col justify-end text-left">
            <div className="item-title">{title}</div>
            {/* <div className="item-price">{priceRangeV2.minVariantPrice.amount}</div> */}
            <div className="item-description h-16 overflow-hidden text-ellipsis line-clamp-3 leading-[1.4]">Here is description of the product Here is description of the product Here is description of the product Here is description of the product Here is description of the product</div>
          </div>
        </motion.div>
        <div className="item-img">
          <GatsbyImage
            alt={media?.[0]?.image.altText}
            className="lg:h-[70vh] h-[40vh]"
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
    )
  }

  return (
    <div className="frontpage-contaner mb-[2vh]">
      <Carousel
        autoplay={true}
        loop={true}
        autoplayDelay={3000}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {
          (products || []).map((product, index) => {
            return itemBuilder(product, index)
          })
        }
      </Carousel>
    </div>
  )
}

export default Frontpage
