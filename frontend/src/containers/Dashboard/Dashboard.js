// libraries
import React from 'react'
import styled from 'styled-components'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'

export const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 70px 1fr;
`

export default props => (
  <PageLayout isUserLoggedIn={props.isUserLoggedIn} rootPath={props.rootPath}>
    <div />
    <CategoryIconOverview inline />
    <div />
  </PageLayout>
)
