// libraries
import React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: React.ReactNode
  columnAmount: number
}

const GridBody = ({ columnAmount, children }: Props): JSX.Element => (
  <Element columnAmount={columnAmount}>{children}</Element>
)

export default GridBody
