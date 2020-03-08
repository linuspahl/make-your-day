// libraries
import React from 'react'
// components
import { Element } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  role?: string
}

const Box = ({ className, role, children }: Props): JSX.Element => (
  <Element className={className} role={role}>
    {children}
  </Element>
)

export default Box
