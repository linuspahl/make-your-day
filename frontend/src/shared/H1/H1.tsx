// libraries
import * as React from 'react'
import { Element } from './styles'

interface Props {
  context?: string
  children: React.ReactNode
}

const H1 = (props: Props): React.ReactElement => (
  <Element context={props.context}>{props.children}</Element>
)

export default H1
