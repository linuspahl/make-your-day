// libraries
import React from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  padding: 20px;

  background-color: ${props => props.theme.appBg};

  // This will define the default, nightmode specific text color
  // When a component needs a different color,
  // it should be defined in the specific component
  color: ${props => props.theme.text};
`

export default props => {
  return <Layout>{props.children}</Layout>
}
