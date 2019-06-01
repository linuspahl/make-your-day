// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: React.ReactNode[]
}

const GridHead = (props: Props): JSX.Element => (
  <Element columnAmount={props.children.length}>{props.children}</Element>
)

export default GridHead
