// libraries
import React from 'react'
import { Element } from './styles'

interface Props {
  children: string
  to: string
}

const Link = ({ to, children }: Props): JSX.Element => (
  <Element to={to}>{children}</Element>
)

export default Link
