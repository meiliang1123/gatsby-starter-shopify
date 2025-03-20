import React from "react";
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import * as motion from "motion/react-client"
import HorizontalScrollList from "@ui/HorizontalScrollList"
import "./index.less"
const Selling = ({data}) => {
  console.log(data, "selling")
  const products = data.products || []

  const itemBuilder = (product, index) => {
    const { slug, title, media, /* priceRangeV2 */ } = product
    return (
      <Card key={index} className="item mt-6">
        <CardHeader color="blue-gray" className="relative h-56">
          <GatsbyImage
            alt={media?.[0]?.image.altText}
            // image={firstImage?.gatsbyImageData ?? storefrontImageData}
            image={media?.[0]?.image.gatsbyImageData}
            loading="eager"
          />
        </CardHeader>
        <motion.div
          className="motion-container overflow-hidden"
          transition={{ duration: 0.8, ease: "easeOut" }} // 过渡动画
          viewport={{ amount: 0.8}} // 进入 10% 视口后触发，仅执行一次
        >
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {title}
            </Typography>
            <Typography>
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </Typography>
          </CardBody>
        </motion.div>
        <CardFooter className="pt-0">
          <Link
            className="item-button"
            to={slug}
            aria-label={`View ${title} product page`}
          ><Button>Read More</Button></Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center px-5 mt-14 mb-8">Hot Selling</h1>
      <div className="selling-contaner">
        <HorizontalScrollList>
          {
            products.map((item, index) => {
              return itemBuilder(item, index)
          })
          }
          {
            products.map((item, index) => {
              return itemBuilder(item, index)
          })
          }
          {
            products.map((item, index) => {
              return itemBuilder(item, index)
          })
          }
        </HorizontalScrollList>
      </div>
    </>
  )
}

export default Selling