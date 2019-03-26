// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: Array<React.ReactNode>
}

const GridHead = (props: Props) => (
  <Element columnAmount={props.children.length}>{props.children}</Element>
)

export default GridHead
