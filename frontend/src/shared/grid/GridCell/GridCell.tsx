// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children?: React.ReactNode
  justify?: string
}

const GridCell = (props: Props): React.ReactElement => (
  <Element justify={props.justify}>{props.children}</Element>
)

export default GridCell
