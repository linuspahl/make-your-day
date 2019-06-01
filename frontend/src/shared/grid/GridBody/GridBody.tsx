// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: React.ReactNode
  columnAmount: number
}

const GridBody = (props: Props): JSX.Element => (
  <Element columnAmount={props.columnAmount}>{props.children}</Element>
)

export default GridBody
