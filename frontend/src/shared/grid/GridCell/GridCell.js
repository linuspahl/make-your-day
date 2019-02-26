// libraries
import React from 'react'
import styled from 'styled-components'

const GridCell = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};
`

export default props => (
  <GridCell justify={props.justify}>{props.children}</GridCell>
)
