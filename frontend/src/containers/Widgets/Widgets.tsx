// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import WidgetCreate from 'components/WidgetCreate/WidgetCreate'
import WidgetEdit from 'components/WidgetEdit/WidgetEdit'
import WidgetOverview from 'components/WidgetOverview/WidgetOverview'
// interfaces
import { NotificationCreate } from 'types/types'

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

const Widgets = (props: Props): JSX.Element => {
  const { createNotificationBanner, rootPath } = props
  return (
    <React.Fragment>
      <Route
        exact
        path={rootPath}
        render={(): JSX.Element => <WidgetOverview rootPath={rootPath} />}
      />
      <Route
        exact
        path={`${rootPath}/create`}
        render={(): JSX.Element => (
          <WidgetCreate
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
      <Route
        exact
        path={`${rootPath}/edit/:id`}
        render={(): JSX.Element => (
          <WidgetEdit
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
    </React.Fragment>
  )
}

export default Widgets
