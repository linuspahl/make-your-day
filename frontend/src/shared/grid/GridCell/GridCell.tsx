// libraries
import React from 'react'
// components
import { Element } from './styles'

interface Props {
  children?: React.ReactNode
  justify?: string
}

const GridCell = ({ justify, children }: Props): JSX.Element => (
  <Element justify={justify}>{children}</Element>
)

export default GridCell
