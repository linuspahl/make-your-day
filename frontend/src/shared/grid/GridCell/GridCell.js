// libraries
import React from 'react'
import styled from 'styled-components'

const Element = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};
`

const GridCell = props => (
  <Element justify={props.justify}>{props.children}</Element>
)

export default GridCell
