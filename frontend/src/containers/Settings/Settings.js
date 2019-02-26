// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import PageLayout from 'components/PageLayout/PageLayout'
import UserSettingsOverview from 'components/UserSettingsOverview/UserSettingsOverview'
import UserSessionsOverview from 'components/UserSessionsOverview/UserSessionsOverview'

export default props => (
  <PageLayout userSession={props.userSession} rootPath={props.rootPath}>
    <ContentBox>
      <Route
        exact
        path={props.rootPath}
        render={() => (
          <UserSettingsOverview
            clearLocalStorage={props.clearLocalStorage}
            createNotificationBanner={props.createNotificationBanner}
            rootPath={props.rootPath}
            updateLocalStorage={props.updateLocalStorage}
            userSettings={props.userSettings}
          />
        )}
      />
      <Route
        exact
        path={`${props.rootPath}/sessions`}
        render={() => (
          <UserSessionsOverview
            clearLocalStorage={props.clearLocalStorage}
            createNotificationBanner={props.createNotificationBanner}
            rootPath={props.rootPath}
            userSession={props.userSession}
          />
        )}
      />
    </ContentBox>
  </PageLayout>
)
