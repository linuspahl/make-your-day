// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// components
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
import DashboardWidgets from 'components/DashboardWidgets/DashboardWidgets'
import PageLayout from 'components/PageLayout/PageLayout'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate } from 'types/types'
import { WidgetFull } from 'store/widget/type'
// graphql
import { GetWidgetsWithEvaluation } from 'store/widget/query'

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
    <Layout role="main">
      <Query query={GetWidgetsWithEvaluation}>
        {({
          loading,
          error,
          data,
        }: {
          loading: boolean
          error?: ApolloError
          data: { getWidgets: WidgetFull[] }
        }): JSX.Element => {
          if (error)
            return (
              <ErrorMessage
                error={error}
                message="Widgets konnten nicht geladen werden"
              />
            )

          const widgets: WidgetFull[] = data.getWidgets || []
          let widgetsDashboardTop = widgets.filter(
            (widget): boolean => widget.position === 'dashboard-top'
          )
          let widgetsDashboardBottom = widgets.filter(
            (widget): boolean => widget.position === 'dashboard-bottom'
          )

          return (
            <React.Fragment>
              <FadeTransition delay={100} fullHeight fullWidth>
                <DashboardWidgets
                  createNotificationBanner={props.createNotificationBanner}
                  loading={loading}
                  widgets={widgetsDashboardTop}
                />
              </FadeTransition>
              <FadeTransition delay={300} fullHeight fullWidth>
                <CategoryIconOverview context="horizontal-scroll" />
              </FadeTransition>
              <FadeTransition delay={600} fullHeight fullWidth>
                <DashboardWidgets
                  createNotificationBanner={props.createNotificationBanner}
                  loading={loading}
                  widgets={widgetsDashboardBottom}
                />
              </FadeTransition>
            </React.Fragment>
          )
        }}
      </Query>
    </Layout>
  </PageLayout>
)

export default Dashboard
