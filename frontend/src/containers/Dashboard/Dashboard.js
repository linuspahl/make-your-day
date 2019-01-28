// libraries
import React from 'react'
import styled from 'styled-components'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
import DashboardWidgets from 'components/DashboardWidgets/DashboardWidgets'
import Timeline from 'components/Timeline/Timeline'

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-rows: 1fr 70px 1fr;
  grid-gap: 20px;
`

export default props => (
  <PageLayout
    isUserLoggedIn={props.isUserLoggedIn}
    rootPath={props.rootPath}
    noPadding
  >
    <Layout>
      <Timeline />
      <CategoryIconOverview />
      <DashboardWidgets
        createNotificationBanner={props.createNotificationBanner}
      />
    </Layout>
  </PageLayout>
)
