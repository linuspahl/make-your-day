// libraries
import * as React from 'react'
// components
import { Element } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  role?: string
  context?: 'page'
}

const ContentBox = (props: Props): JSX.Element => {
  const { children, className, role, context } = props
  return (
    <Element className={className} role={role} context={context}>
      {children}
    </Element>
  )
}

export default ContentBox
