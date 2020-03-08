// libraries
import React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: string
}

const H2 = ({ children }: Props): JSX.Element => (
  <Element as="h1">{children}</Element>
)

export default H2
