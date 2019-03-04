// libraries
import React from 'react'
import styled from 'styled-components'
import { sortBy } from 'utils/utils'
// components
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import NoResult from 'shared/NoResult/NoResult'
import Widget from 'components/Widget/Widget'
import TimelineWidget from 'components/TimelineWidget/TimelineWidget'

// graphql
import WidgetPlaceholder from '../Widget/WidgetPlaceholder'

const Layout = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 20px;

  overflow-x: auto;
  white-space: nowrap;
`

const WidgetLayout = styled.div`
  display: inline-block;
  vertical-align: top;

  width: 100%;
  height: 100%;

  margin-right: 20px;
  padding: 20px 0;

  &:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }
`

const TimelineWidgetLayout = styled(WidgetLayout)`
  padding-top: 0;
`

const LoadingPlaceholder = () => (
  <WidgetLayout>
    <PlaceholderGroup>
      <WidgetPlaceholder />
    </PlaceholderGroup>
  </WidgetLayout>
)

const DashboardWidgets = props => {
  const { createNotificationBanner, widgets, loading } = props

  if (loading) return <LoadingPlaceholder />

  if (!widgets || widgets.length === 0) return <NoResult />

  return (
    <Layout>
      {sortBy(widgets, 'id').map(widget =>
        widget.type === 'timeline' ? (
          <TimelineWidgetLayout>
            <TimelineWidget loading={loading} key={widget.id} />
          </TimelineWidgetLayout>
        ) : (
          <WidgetLayout key={widget.id}>
            <Widget
              createNotificationBanner={createNotificationBanner}
              widget={widget}
            />
          </WidgetLayout>
        )
      )}
    </Layout>
  )
}

export default DashboardWidgets
