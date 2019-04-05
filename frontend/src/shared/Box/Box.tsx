// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: React.ReactNode
  className?: string
}

const Box = (props: Props): React.ReactElement => (
  <Element className={props.className}>{props.children}</Element>
)

export default Box
