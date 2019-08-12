// libraries
import React from 'react'
// components
import { Element } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  role?: string
}

const Box = (props: Props): JSX.Element => (
  <Element className={props.className} role={props.role}>
    {props.children}
  </Element>
)

export default Box
