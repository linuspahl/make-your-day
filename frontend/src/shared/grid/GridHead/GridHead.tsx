// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: React.ReactNode[]
}

const GridHead = (props: Props): React.ReactElement => (
  <Element columnAmount={props.children.length}>{props.children}</Element>
)

export default GridHead
