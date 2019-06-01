// libraries
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate, LocalStorageCreate } from 'types/types'

interface Props {
  component: React.ReactType
  createNotificationBanner?: (notification: NotificationCreate) => void
  exact?: boolean
  path: string
  updateLocalStorage?: (localStorage: LocalStorageCreate) => void
  userSession?: UserSession
}

const PublicRoute = ({
  component: Component,
  userSession,
  ...rest
}: Props): JSX.Element => {
  // If user is already logged in and tries to access a public route,
  // we will redirect him to to root route, the dashboard
  if (userSession && userSession.token) return <Redirect to="/" />
  return (
    <Route
      render={(): JSX.Element => (
        <Component userSession={userSession} {...rest} />
      )}
    />
  )
}

export default PublicRoute
