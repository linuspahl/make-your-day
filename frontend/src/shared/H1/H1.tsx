// libraries
import React from 'react'
import { Element } from './styles'

interface Props {
  context?: string
  children: React.ReactNode
}

const H1 = ({ context, children }: Props): JSX.Element => (
  <Element context={context} as="h1">
    {children}
  </Element>
)

export default H1
