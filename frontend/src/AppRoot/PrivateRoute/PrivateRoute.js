// libraries
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({
  component: Component,
  isUserLoggedIn,
  path,
  exact,
  ...rest
}) => {
  // If user is not logged in and tries to access a private route,
  // we will redirect him to the login page
  if (!isUserLoggedIn) return <Redirect to="/login" />
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        <Component isUserLoggedIn={isUserLoggedIn} rootPath={path} {...rest} />
      )}
    />
  )
}
