// libraries
import * as React from 'react'
import { sortBy } from 'lodash'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
// components
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import NoResult from 'shared/NoResult/NoResult'
import EditorWidget from 'components/EditorWidget/EditorWidget'
import TimelineWidget from 'components/TimelineWidget/TimelineWidget'
import EvaluationWidget from 'components/EvaluationWidget/EvaluationWidget'
import Icon from 'shared/Icon/Icon'
import H2 from 'shared/H2/H2'
import EditorWidgetPlaceholder from 'components/EditorWidget/EditorWidgetPlaceholder'
import {
  CreateWidgetIcon,
  Layout,
  NewWidgetTile,
  NewWidgetWrapper,
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
      <EditorWidgetPlaceholder />
    </PlaceholderGroup>
  </PlaceholderWrapper>
)

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  loading: boolean
  widgets: WidgetType[]
}

const DashboardWidgets = (props: Props): React.ReactElement => {
  const { createNotificationBanner, widgets, loading, history } = props

  if (loading) return <LoadingPlaceholder />

  if (!widgets || widgets.length === 0)
    return (
      <PlaceholderWrapper>
        <NewWidgetTile>
          <Link to="/widgets/create" className="defaultColor">
            <NoResult message="Noch kein Widget vorhanden" />
          </Link>
        </NewWidgetTile>
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
            <EditorWidget
              createNotificationBanner={createNotificationBanner}
              widget={widget}
            />
          )}
        </WidgetLayout>
      ))}
      <NewWidgetWrapper>
        <NewWidgetTile>
          <CreateWidgetIcon onClick={() => history.push('/widgets/create')}>
            <Icon title="plus" />
          </CreateWidgetIcon>
          <NoResult message="Weiteres Widget erstellen" />
        </NewWidgetTile>
      </NewWidgetWrapper>
    </Layout>
  )
}

export default withRouter(DashboardWidgets)
