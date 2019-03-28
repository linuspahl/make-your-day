// libraries
import * as React from 'react'
// components
import { Element } from './styles'

interface Props {
  children: string
}

const H2 = (props: Props): React.ReactElement => (
  <Element>{props.children}</Element>
)

export default H2
