// libraries
import React from 'react'
// components
import { Element } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  context?: 'page'
  role?: string
}

const ContentBox = ({
  children,
  className,
  context,
  role,
}: Props): JSX.Element => (
  <Element className={className} role={role} context={context}>
    {children}
  </Element>
)

export default ContentBox
