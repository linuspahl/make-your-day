// libraries
import React from 'react'
import styled from 'styled-components'

const Element = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columnAmount}, 1fr);

  width: 100%;

  margin-bottom: 10px;
`

const GridHead = props => (
  <Element columnAmount={props.children.length}>{props.children}</Element>
)

export default GridHead
