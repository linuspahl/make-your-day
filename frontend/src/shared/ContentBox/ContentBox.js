// libraries
import React from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  width: 100%;
  max-width: 420px;

  padding: 40px 20px 40px 20px;
  margin: auto;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.contentBoxBg};
`

export default props => (
  <Layout className={props.className}>{props.children}</Layout>
)
