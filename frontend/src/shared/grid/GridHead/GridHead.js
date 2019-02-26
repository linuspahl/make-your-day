// libraries
import React from 'react'
import styled from 'styled-components'

const GridHead = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columnAmount}, 1fr);

  width: 100%;

  margin-bottom: 10px;
`

export default props => (
  <GridHead columnAmount={props.children.length}>{props.children}</GridHead>
)
