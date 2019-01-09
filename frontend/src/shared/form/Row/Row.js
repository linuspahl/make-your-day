import React from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.disabled &&
    `
    color: grey
  `};
`

export default props => (
  <Layout disabled={props.disabled} className={props.className}>
    {props.children}
  </Layout>
)
