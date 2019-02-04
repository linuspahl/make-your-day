// libraries
import React from 'react'
import styled from 'styled-components'

const Element = styled.h2`
  margin: 0;

  font-size: 16px;
  font-weight: bold;

  hyphens: auto;
`

export default props => (
  <Element context={props.context}>{props.children}</Element>
)
