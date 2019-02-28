// libraries
import React from 'react'
import styled from 'styled-components'

const Element = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columnAmount}, 1fr);
  width: 100%;
  > div {
    display: flex;
    align-items: center;

    min-height: 40px;

    border-top: 1px solid ${props => props.theme.border};
  }
`

const GridBody = props => (
  <Element columnAmount={props.columnAmount}>{props.children}</Element>
)

export default GridBody
