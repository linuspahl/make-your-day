// libraries
import React from 'react'
// components
import { Element } from './styles'

interface Props {
  children?: React.ReactNode
  justify?: string
}

const GridCell = (props: Props): JSX.Element => (
  <Element justify={props.justify}>{props.children}</Element>
)

export default GridCell
