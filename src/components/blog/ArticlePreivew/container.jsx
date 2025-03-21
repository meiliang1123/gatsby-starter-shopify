import React from 'react'

const Container = ({ children, as = 'div', className }) => {
  const Tag = as

  return (
    <Tag
      className={`${className}`}
      style={{
        maxWidth: 'var(--size-max-width)',
        margin: '0 auto',
        padding: 'var(--space-2xl) var(--size-gutter)',
      }}
    >
      {children}
    </Tag>
  )
}

export default Container
