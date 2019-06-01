// libraries
import * as React from 'react'
import { sortBy } from 'lodash'
import { Link } from 'react-router-dom'
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
  NewWidgetLink,
  NewWidgetBox,
  NewWidgetWrapper,
  PlaceholderWrapper,
  WidgetHeader,
  WidgetLayout,
} from './styles'
// graphql
import { NotificationCreate } from 'types/types'
import { Widget as WidgetType } from 'store/widget/type'

const LoadingPlaceholder = (): JSX.Element => (
  <PlaceholderWrapper>
    <PlaceholderGroup>
      <EditorWidgetPlaceholder />
    </PlaceholderGroup>
  </PlaceholderWrapper>
)

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  loading: boolean
  widgets: WidgetType[]
}

const DashboardWidgets = (props: Props): JSX.Element => {
  const { createNotificationBanner, widgets = [], loading } = props

  if (loading) return <LoadingPlaceholder />

  if (widgets.length === 0)
    return (
      <PlaceholderWrapper>
        <NewWidgetBox>
          <Link to="/widgets/create" className="defaultColor">
            <NoResult message="Noch kein Widget vorhanden" />
          </Link>
        </NewWidgetBox>
      </PlaceholderWrapper>
    )

  return (
    <Layout>
      {sortBy(widgets, 'id').map(
        (widget): JSX.Element => (
          <WidgetLayout key={widget.id}>
            <WidgetHeader>
              <H2>{widget.title}</H2>
            </WidgetHeader>

            {widget.type === 'timeline' && <TimelineWidget key={widget.id} />}
            {widget.type === 'evaluation' && (
              <EvaluationWidget
                evaluation={widget.evaluation}
                key={widget.id}
              />
            )}
            {widget.type === 'textarea' && (
              <EditorWidget
                createNotificationBanner={createNotificationBanner}
                widget={widget}
              />
            )}
          </WidgetLayout>
        )
      )}
      <NewWidgetWrapper>
        <NewWidgetBox>
          <NewWidgetLink to="/widgets/create">
            <CreateWidgetIcon>
              <Icon title="plus" />
            </CreateWidgetIcon>
            <NoResult message="Weiteres Widget erstellen" />
          </NewWidgetLink>
        </NewWidgetBox>
      </NewWidgetWrapper>
    </Layout>
  )
}

export default DashboardWidgets
