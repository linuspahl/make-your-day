// libraries
import * as React from 'react'
import { Element } from './styles'

interface Props {
  context?: string
  children: React.ReactNode
}

const H1 = (props: Props): JSX.Element => (
  <Element context={props.context} as="h1">
    {props.children}
  </Element>
)

export default H1
