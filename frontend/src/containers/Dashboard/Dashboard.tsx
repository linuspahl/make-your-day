// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
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

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    grid-template-columns: calc(50vw - 35px) 70px calc(50vw - 35px);
    grid-template-rows: none;
  }
`

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  userSession: UserSession
}

const Dashboard = (props: Props): JSX.Element => (
  <PageLayout
    userSession={props.userSession}
    rootPath={props.rootPath}
    noPadding
  >
    <FadeTransition fullHeight fullWidth>
      <Layout role="main">
        <Query query={GetWidgets}>
          {({
            loading,
            error,
            data,
          }: {
            loading: boolean
            error?: ApolloError
            data: { getWidgets: Widget[] }
          }): JSX.Element => {
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Widgets konnten nicht geladen werden"
                />
              )

            const widgets: Widget[] = data.getWidgets || []
            let widgetsDashboardTop = widgets.filter(
              (widget): boolean => widget.position === 'dashboard-top'
            )
            let widgetsDashboardBottom = widgets.filter(
              (widget): boolean => widget.position === 'dashboard-bottom'
            )

            return (
              <React.Fragment>
                <DashboardWidgets
                  createNotificationBanner={props.createNotificationBanner}
                  loading={loading}
                  widgets={widgetsDashboardTop}
                />
                <CategoryIconOverview context="horizontal-scroll" />
                <DashboardWidgets
                  createNotificationBanner={props.createNotificationBanner}
                  loading={loading}
                  widgets={widgetsDashboardBottom}
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
