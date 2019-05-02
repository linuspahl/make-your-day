// libraries
import * as React from 'react'
import { sortBy } from 'lodash'
import { Link } from 'react-router-dom'
// components
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import NoResult from 'shared/NoResult/NoResult'
import Widget from 'components/Widget/Widget'
import TimelineWidget from 'components/TimelineWidget/TimelineWidget'
import EvaluationWidget from 'components/EvaluationWidget/EvaluationWidget'
import H2 from 'shared/H2/H2'
import WidgetPlaceholder from '../Widget/WidgetPlaceholder'
import {
  Layout,
  NoResultWrapper,
  PlaceholderWrapper,
  WidgetHeader,
  WidgetLayout,
} from './styles'
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
        <NoResultWrapper>
          <Link to="/widgets/create" className="defaultColor">
            <NoResult message="Noch kein Widget vorhanden" />
          </Link>
        </NoResultWrapper>
      </PlaceholderWrapper>
    )

  return (
    <Layout>
      {sortBy(widgets, 'id').map(widget => (
        <WidgetLayout key={widget.id}>
          <WidgetHeader>
            <H2>{widget.title}</H2>
          </WidgetHeader>

          {widget.type === 'timeline' && <TimelineWidget key={widget.id} />}

          {widget.type === 'evaluation' && (
            <EvaluationWidget evaluation={widget.evaluation} key={widget.id} />
          )}

          {widget.type === 'textarea' && (
            <Widget
              createNotificationBanner={createNotificationBanner}
              widget={widget}
            />
          )}
        </WidgetLayout>
      ))}
    </Layout>
  )
}

export default DashboardWidgets
