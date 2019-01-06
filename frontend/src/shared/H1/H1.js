// libraries
import React from 'react'
import styled from 'styled-components'

const Element = styled.h1`
  font-size: 28px;
  text-align: center;
  hyphens: auto;
  ${props => props.context === 'page' && 'margin-bottom: 60px;'};
`

export default props => (
  <Element context={props.context}>{props.children}</Element>
)
