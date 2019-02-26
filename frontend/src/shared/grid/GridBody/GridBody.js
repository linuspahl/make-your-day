// libraries
import React from 'react'
import styled from 'styled-components'

const GridBody = styled.div`
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

export default props => (
  <GridBody columnAmount={props.columnAmount}>{props.children}</GridBody>
)
