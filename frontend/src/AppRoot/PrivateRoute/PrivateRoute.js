// libraries
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  userSession,
  path,
  exact,
  ...rest
}) => {
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
