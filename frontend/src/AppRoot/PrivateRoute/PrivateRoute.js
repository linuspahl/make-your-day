// libraries
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: Component, isUserLoggedIn, ...rest }) => {
  // If user is not logged in and tries to access a private route,
  // we will redirect him to the login page
  if (!isUserLoggedIn) return <Redirect to="/login" />
  return (
    <Route
      exact
      render={() => <Component isUserLoggedIn={isUserLoggedIn} {...rest} />}
    />
  )
}