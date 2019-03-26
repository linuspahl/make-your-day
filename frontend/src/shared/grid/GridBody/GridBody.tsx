// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: any
  columnAmount: number
}

const GridBody = (props: Props) => (
  <Element columnAmount={props.columnAmount}>{props.children}</Element>
)

export default GridBody
