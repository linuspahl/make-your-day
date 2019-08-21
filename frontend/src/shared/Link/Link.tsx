// libraries
import React from 'react'
import { Element } from './styles'

interface Props {
  children: string
  to: string
}

const Link = (props: Props): JSX.Element => (
  <Element to={props.to}>{props.children}</Element>
)

export default Link
