// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: string
}

const H2 = (props: Props): JSX.Element => <Element>{props.children}</Element>

export default H2
