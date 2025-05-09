import React from "react";
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
// import * as motion from "motion/react-client"
import HorizontalScrollList from "@ui/HorizontalScrollList"
import "./index.less"
const Selling = ({data}) => {
  // console.log(data, "selling")
  const products = data.products || []

  const itemBuilder = (product, index) => {
    const { slug, title, media, tags, description /* priceRangeV2 */ } = product
    return (
      <Card key={slug+index} className="flex-row shadow-none border border-gray-200 w-full h-[15rem] lg:w-[35rem] lg-h-[20rem] my-20 rounded-sm">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-sm rounded-r-none"
        >
          <GatsbyImage
            alt={media?.[0]?.image.altText}
            className="w-full h-full"
            // image={firstImage?.gatsbyImageData ?? storefrontImageData}
            image={media?.[0]?.image.gatsbyImageData}
            loading="eager"
          />
        </CardHeader>
        <CardBody className="flex-1 overflow-hidden" title={tags && tags.join(" ")}>
          { tags && tags.length && <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {
                tags.map(item => {
                  return <div key={item} color="gray" className="inline-block mr-2 whitespace-nowrap bg-blue-gray-100 bg-opacity-20 text-xs rounded-sm px-2">
                    {item}
                  </div>
                })
              }
            </div>
          }
          <Typography variant="h4" color="blue-gray" className="mb-2 mt-1 whitespace-nowrap">
            {title}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal text-ellipsis line-clamp-3">
            {description}
          </Typography>
          <Link to={slug} className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </CardBody>
      </Card>
    )
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center px-5 mt-14 mb-8">Hot Selling</h1>
      <div className="selling-contaner">
        <HorizontalScrollList className="scroll-area-container">
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