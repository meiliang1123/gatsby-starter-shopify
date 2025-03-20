import React from "react";
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
const ArticleTextBuilder = ({data, className}) => {
  const { id, time, tags, title, description, gatsbyImage, href, secondTitle, secondDescription } = data

  return <article key={id} className={`flex max-w-xl flex-col items-start justify-between ${className}`}>
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={time} className="text-gray-500">
          {time}
        </time>
        { tags?.length && <span
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {tags?.join("/")}
          </span>
        }
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          {/* <span className="absolute inset-0" /> */}
          <Link to={href} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm/6 text-gray-600">{description}</p>
      </div>
      <div className="relative mt-4 flex items-center gap-x-4">
        { 
          gatsbyImage && <GatsbyImage alt="" className="size-10 rounded-full bg-gray-50" image={gatsbyImage} />
        }
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">
            <span className="absolute inset-0" />
            {secondTitle && secondTitle}
          </p>
          <p className="text-gray-600">{secondDescription || "default"}</p>
        </div>
      </div>
    </article>
}

// ArticleTextBuilder.defaultProps = {
//   id: "",
//   href: "",
//   description: "",
//   title: "",
//   tags: [],
//   gatsbyImage: null,
//   secondTitle: "",
//   secondDescription: ""
// }

export default ArticleTextBuilder