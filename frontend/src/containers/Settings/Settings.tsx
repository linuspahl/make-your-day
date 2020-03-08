// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import UserSettingsOverview from 'components/UserSettingsOverview/UserSettingsOverview'
import UserSessionsOverview from 'components/UserSessionsOverview/UserSessionsOverview'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate, LocalStorage } from 'types/types'
import { UserSettings } from 'store/userSetting/type'

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  updateLocalStorage: (localStorage: LocalStorage) => void
  userSession: UserSession
  userSettings: UserSettings
}

const Settings = ({
  clearLocalStorage,
  rootPath,
  updateLocalStorage,
  userSession,
  userSettings,
}: Props): JSX.Element => (
  <>
    <Route
      exact
      path={rootPath}
      render={(): JSX.Element => (
        <UserSettingsOverview
          clearLocalStorage={clearLocalStorage}
          rootPath={rootPath}
          updateLocalStorage={updateLocalStorage}
          userSession={userSession}
          userSettings={userSettings}
        />
      )}
    />
    <Route
      exact
      path={`${rootPath}/sessions`}
      render={(): JSX.Element => (
        <UserSessionsOverview
          clearLocalStorage={clearLocalStorage}
          currentUserSession={userSession}
        />
      )}
    />
  </>
)

export default Settings
