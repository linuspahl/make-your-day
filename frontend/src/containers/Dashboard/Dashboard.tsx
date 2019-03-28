// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// components
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
import DashboardWidgets from 'components/DashboardWidgets/DashboardWidgets'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import PageLayout from 'components/PageLayout/PageLayout'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import { GetWidgets } from 'store/widget/query'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate } from 'types/types'
import { Widget } from 'store/widget/type'

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-rows: calc(50vh - 35px) 70px calc(50vh - 35px);

  @media (min-width: ${props =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    grid-template-columns: 1fr 70px 1fr;
    grid-template-rows: none;
  }
`

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  userSession: UserSession
}

const Dashboard = (props: Props): React.ReactElement => (
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

            const widgets: Widget[] = data.getWidgets
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
              <React.Fragment>
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
              </React.Fragment>
            )
          }}
        </Query>
      </Layout>
    </FadeTransition>
  </PageLayout>
)

export default Dashboard
