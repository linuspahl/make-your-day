// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import UserSettingsOverview from 'components/UserSettingsOverview/UserSettingsOverview'
import UserSessionsOverview from 'components/UserSessionsOverview/UserSessionsOverview'

interface Props {
  rootPath: string
}

const Settings = ({ rootPath }: Props): JSX.Element => (
  <>
    <Route
      exact
      path={rootPath}
      render={(): JSX.Element => <UserSettingsOverview rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/sessions`}
      render={(): JSX.Element => <UserSessionsOverview />}
    />
  </>
)

export default Settings
