// libraries
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate, LocalStorageCreate } from 'types/types'

interface Props {
  clearLocalStorage?: () => void
  component: React.ReactType
  createNotificationBanner?: (notification: NotificationCreate) => void
  exact?: boolean
  path: string
  updateLocalStorage?: (localStorage: LocalStorageCreate) => void
  userSession: UserSession
  userSettings?: { [key: string]: boolean }
}

const PrivateRoute = ({
  component: Component,
  exact,
  path,
  userSession,
  ...rest
}: Props): React.ReactElement => {
  // If user is not logged in and tries to access a private route,
  // we will redirect him to the login page
  if (!userSession || !userSession.token) return <Redirect to="/login" />
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        <Component userSession={userSession} rootPath={path} {...rest} />
      )}
    />
  )
}

export default PrivateRoute
