// libraries
import * as React from 'react'
import { Route } from 'react-router-dom'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import PageLayout from 'components/PageLayout/PageLayout'
import WidgetCreate from 'components/WidgetCreate/WidgetCreate'
import WidgetEdit from 'components/WidgetEdit/WidgetEdit'
import WidgetOverview from 'components/WidgetOverview/WidgetOverview'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate } from 'types/types'

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  userSession: UserSession
}

const Widgets = (props: Props) => {
  const { createNotificationBanner, userSession, rootPath } = props
  return (
    <PageLayout userSession={userSession} rootPath={rootPath}>
      <ContentBox>
        <Route
          exact
          path={rootPath}
          render={() => <WidgetOverview rootPath={rootPath} />}
        />
        <Route
          exact
          path={`${rootPath}/create`}
          render={() => (
            <WidgetCreate
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
        <Route
          exact
          path={`${rootPath}/edit/:id`}
          render={() => (
            <WidgetEdit
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
      </ContentBox>
    </PageLayout>
  )
}

export default Widgets
