// libraries
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// components
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
import DashboardWidgets from 'components/DashboardWidgets/DashboardWidgets'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import PageLayout from 'components/PageLayout/PageLayout'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import { GetWidgets } from 'store/widget/query.gql'

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-rows: 1fr 70px 1fr;

  @media (min-width: ${props =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    grid-template-columns: 1fr 70px 1fr;
    grid-template-rows: none;
  }
`

const Dashboard = props => (
  <PageLayout
    userSession={props.userSession}
    rootPath={props.rootPath}
    noPadding
  >
    <FadeTransition fullHeight fullWidth>
      <Layout>
        <Query query={GetWidgets}>
          {({ loading, error, data }) => {
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Widgets konnten nicht geladen werden"
                />
              )

            const widgets = data.getWidgets
            let dashboardTopWidgets = null
            let dashboardBottomWidgets = null

            if (widgets) {
              dashboardTopWidgets = widgets.filter(
                widget => widget.position === 'dashboard-top'
              )
              dashboardBottomWidgets = widgets.filter(
                widget => widget.position === 'dashboard-bottom'
              )
            }

            return (
              <Fragment>
                <DashboardWidgets
                  createNotificationBanner={props.createNotificationBanner}
                  loading={loading}
                  widgets={dashboardTopWidgets}
                />
                <CategoryIconOverview context="horizontal-scroll" />
                <DashboardWidgets
                  createNotificationBanner={props.createNotificationBanner}
                  loading={loading}
                  widgets={dashboardBottomWidgets}
                />
              </Fragment>
            )
          }}
        </Query>
      </Layout>
    </FadeTransition>
  </PageLayout>
)

export default Dashboard
