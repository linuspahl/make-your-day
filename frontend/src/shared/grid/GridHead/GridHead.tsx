// libraries
import React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: React.ReactNode | React.ReactNodeArray
}

const GridHead = ({ children }: Props): JSX.Element => {
  const amountChildren = React.Children.toArray(children).length
  return <Element columnAmount={amountChildren}>{children}</Element>
}

export default GridHead
