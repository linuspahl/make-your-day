// libraries
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// interfaces
import { UserSession } from 'store/userSession/type'
import { LocalStorageCreate } from 'types/types'

interface Props {
  clearLocalStorage?: () => void
  component: React.ReactType
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
}: Props): JSX.Element => {
  // If user is not logged in and tries to access a private route,
  // we will redirect him to the login page
  if (!userSession || !userSession.token) return <Redirect to="/login" />
  return (
    <Route
      path={path}
      exact={exact}
      render={(): JSX.Element => (
        <Component userSession={userSession} rootPath={path} {...rest} />
      )}
    />
  )
}

export default PrivateRoute
