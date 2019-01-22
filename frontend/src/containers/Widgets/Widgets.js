// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import ContentBox from 'shared/ContentBox/ContentBox'
import WidgetOverview from 'components/WidgetOverview/WidgetOverview'
import WidgetEdit from 'components/WidgetEdit/WidgetEdit'
import WidgetCreate from 'components/WidgetCreate/WidgetCreate'

export default props => {
  const { createNotificationBanner, isUserLoggedIn, rootPath } = props
  return (
    <PageLayout isUserLoggedIn={isUserLoggedIn} rootPath={rootPath}>
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
