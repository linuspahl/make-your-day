// libraries
import React from 'react'
import { sortBy } from 'lodash'
// components
import EditorWidget from 'components/EditorWidget/EditorWidget'
import EditorWidgetPlaceholder from 'components/EditorWidget/EditorWidgetPlaceholder'
import EvaluationWidget from 'components/EvaluationWidget/EvaluationWidget'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H2 from 'shared/H2/H2'
import Icon from 'shared/Icon/Icon'
import NoResult from 'shared/NoResult/NoResult'
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import TimelineWidget from 'components/TimelineWidget/TimelineWidget'
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
// interfaces
import { WidgetFull } from 'store/widget/type'

const LoadingPlaceholder = (): JSX.Element => (
  <PlaceholderWrapper data-testid="DashboardWidgetsPlaceholder">
    <PlaceholderGroup>
      <EditorWidgetPlaceholder />
    </PlaceholderGroup>
  </PlaceholderWrapper>
)

interface Props {
  loading: boolean
  widgets: WidgetFull[]
  delay?: number
}

const DashboardWidgets = ({
  widgets = [],
  loading,
  delay,
}: Props): JSX.Element => (
  <FadeTransition delay={delay || 0} fullHeight fullWidth>
    {loading && <LoadingPlaceholder />}
    {!loading && (
      <Layout>
        {sortBy(widgets, 'id').map(
          (widget): JSX.Element => (
            <WidgetLayout key={widget.id}>
              <WidgetHeader>
                <H2>{widget.title}</H2>
              </WidgetHeader>

              {widget.type === 'timeline' && <TimelineWidget />}
              {widget.type === 'evaluation' && (
                <EvaluationWidget evaluation={widget.evaluation} />
              )}
              {widget.type === 'textarea' && <EditorWidget widget={widget} />}
            </WidgetLayout>
          )
        )}
        {(!widgets || widgets.length == 0) && (
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
        )}
      </Layout>
    )}
  </FadeTransition>
)

export default DashboardWidgets
