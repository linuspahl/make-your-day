// libraries
import React from 'react'
import styled from 'styled-components'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
import DashboardWidgets from 'components/DashboardWidgets/DashboardWidgets'
import TimelineWidget from 'components/TimelineWidget/TimelineWidget'

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-rows: 1fr 70px 1fr;
  grid-gap: 20px;

  @media (min-width: ${props =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    grid-template-columns: 1fr 70px 1fr;
    grid-template-rows: none;
  }
`

export default props => (
  <PageLayout
    isUserLoggedIn={props.isUserLoggedIn}
    rootPath={props.rootPath}
    noPadding
  >
    <Layout>
      <TimelineWidget />
      <CategoryIconOverview context="horizontal-scroll" />
      <DashboardWidgets
        createNotificationBanner={props.createNotificationBanner}
      />
    </Layout>
  </PageLayout>
)
