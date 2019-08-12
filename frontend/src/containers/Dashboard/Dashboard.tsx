// libraries
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// components
import DashboardWidgets from 'components/DashboardWidgets/DashboardWidgets'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
// interfaces
import { NotificationCreate } from 'types/types'
import { WidgetFull } from 'store/widget/type'
// graphql
import { GetWidgetsWithEvaluation } from 'store/widget/query'

export const Layout = styled.div`
  ${(props): string => {
    const {
      theme: {
        heights: { bottomMenu },
        mediaQuery: { tablet },
        padding,
      },
    } = props
    return `
      height: 100%;
      width: 100%;
      
      padding: ${padding}rem 0 ${padding + bottomMenu / 4}rem 0;  

      display: grid;
      grid-row-gap: ${padding}rem;
      grid-template-rows:
        calc(50% - ${padding / 2}rem) calc(50% - ${padding / 2}rem);


      @media (min-width: ${tablet}) and (orientation: landscape) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: none;
        grid-column-gap: ${padding}rem;

        padding: 0 ${padding}rem;
      }
    `
  }}
`

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

const Dashboard = (props: Props): JSX.Element => (
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
            <DashboardWidgets
              delay={600}
              createNotificationBanner={props.createNotificationBanner}
              loading={loading}
              widgets={widgetsDashboardTop}
            />

            <DashboardWidgets
              createNotificationBanner={props.createNotificationBanner}
              loading={loading}
              widgets={widgetsDashboardBottom}
              delay={500}
            />
          </React.Fragment>
        )
      }}
    </Query>
  </Layout>
)

export default Dashboard
