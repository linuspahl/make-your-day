// libraries
import * as React from 'react'
import { Route } from 'react-router-dom'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import PageLayout from 'components/PageLayout/PageLayout'
import UserSettingsOverview from 'components/UserSettingsOverview/UserSettingsOverview'
import UserSessionsOverview from 'components/UserSessionsOverview/UserSessionsOverview'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate, LocalStorage } from 'types/types'
import { UserSetting } from 'store/userSetting/type'

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  updateLocalStorage: (localStorage: LocalStorage) => void
  userSession: UserSession
  userSettings: { [key: string]: UserSetting }
}

const Settings = (props: Props): JSX.Element => {
  return (
    <PageLayout userSession={props.userSession} rootPath={props.rootPath}>
      <ContentBox role="main">
        <Route
          exact
          path={props.rootPath}
          render={(): JSX.Element => (
            <UserSettingsOverview
              clearLocalStorage={props.clearLocalStorage}
              createNotificationBanner={props.createNotificationBanner}
              rootPath={props.rootPath}
              updateLocalStorage={props.updateLocalStorage}
              userSession={props.userSession}
              userSettings={props.userSettings}
            />
          )}
        />
        <Route
          exact
          path={`${props.rootPath}/sessions`}
          render={(): JSX.Element => (
            <UserSessionsOverview
              clearLocalStorage={props.clearLocalStorage}
              createNotificationBanner={props.createNotificationBanner}
              currentUserSession={props.userSession}
            />
          )}
        />
      </ContentBox>
    </PageLayout>
  )
}

export default Settings
