// libraries
import * as React from 'react'
import { sortBy } from 'lodash'
// components
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import NoResult from 'shared/NoResult/NoResult'
import Widget from 'components/Widget/Widget'
import TimelineWidget from 'components/TimelineWidget/TimelineWidget'
import EvaluationWidget from 'components/EvaluationWidget/EvaluationWidget'
import WidgetPlaceholder from '../Widget/WidgetPlaceholder'
import { Layout, WidgetLayout, NoResultBox, PlaceholderWrapper } from './styles'
// graphql
import { NotificationCreate } from 'types/types'
import { Widget as WidgetType } from 'store/widget/type'

const LoadingPlaceholder = (): React.ReactElement => (
  <PlaceholderWrapper>
    <PlaceholderGroup>
      <WidgetPlaceholder />
    </PlaceholderGroup>
  </PlaceholderWrapper>
)

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  loading: boolean
  widgets: WidgetType[]
}

const DashboardWidgets = (props: Props): React.ReactElement => {
  const { createNotificationBanner, widgets, loading } = props

  if (loading) return <LoadingPlaceholder />

  if (!widgets || widgets.length === 0)
    return (
      <PlaceholderWrapper>
        <NoResultBox>
          <NoResult />
        </NoResultBox>
      </PlaceholderWrapper>
    )

  return (
    <Layout>
      {sortBy(widgets, 'id').map(widget => {
        if (widget.type === 'timeline') {
          return (
            <WidgetLayout key={widget.id}>
              <TimelineWidget key={widget.id} />
            </WidgetLayout>
          )
        }

        if (widget.type === 'evaluation') {
          return (
            <WidgetLayout key={widget.id}>
              <EvaluationWidget
                evaluation={widget.evaluation}
                key={widget.id}
              />
            </WidgetLayout>
          )
        }

        return (
          <WidgetLayout key={widget.id}>
            <Widget
              createNotificationBanner={createNotificationBanner}
              widget={widget}
            />
          </WidgetLayout>
        )
      })}
    </Layout>
  )
}

export default DashboardWidgets
