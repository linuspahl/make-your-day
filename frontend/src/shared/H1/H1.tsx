// libraries
import * as React from 'react'
import styled from 'styled-components'

interface Element {
  context: string
}

const Element = styled.h1<Element>`
  font-size: 28px;
  text-align: center;
  hyphens: auto;
  ${props => props.context === 'page' && 'margin-bottom: 60px;'};
`

export interface H1Props { context: string; children: string; }

const H1 = (props: H1Props) => <Element context={props.context}>{props.children}</Element>

export default H1
