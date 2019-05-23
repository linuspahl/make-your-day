// libraries
import * as React from 'react'
// components
import { Element } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  role?: string
}

const ContentBox = (props: Props): React.ReactElement => (
  <Element className={props.className} role={props.role}>
    {props.children}
  </Element>
)

export default ContentBox
