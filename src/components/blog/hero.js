import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import * as styles from './hero.module.css'

const Hero = ({ image, title, content, children, className }) => (
  <div className={[className, "h-[61.5vh] min-h-[560px] w-full mx-auto md:w-[85%] lg:max-w-[70%]"].join(" ")}>
    {image && (
      <GatsbyImage className="!h-full !w-full" alt={title || ""} image={image} />
    )}
    <div className={styles.details}>
      <h1 className={styles.title}>{title}</h1>
      {content && (
        <div className={styles.content}>{renderRichText(content)}</div>
      )}
    </div>
    {
      children && children
    }
  </div>
)

export default Hero
