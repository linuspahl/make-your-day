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
    color: #b5b5b5;
    cursor: not-allowed;
  `};
`

export default props => (
  <Layout
    disabled={props.disabled}
    className={props.className}
    as={props.as}
    htmlFor={props.htmlFor}
    onClick={props.onClick}
  >
    {props.children}
  </Layout>
)
