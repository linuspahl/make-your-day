// libraries
import React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: React.ReactNode | React.ReactNodeArray
}

const GridHead = (props: Props): JSX.Element => {
  const amountChildren = React.Children.toArray(props.children).length
  return <Element columnAmount={amountChildren}>{props.children}</Element>
}

export default GridHead
