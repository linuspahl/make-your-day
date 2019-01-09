// libraries
import React from 'react'
import { Route } from 'react-router-dom'

import { Redirect } from 'react-router-dom'

export default ({ component: Component, ...rest }) => {
  // If user is already logged in and tries to access a public route,
  // we will redirect him to to root route, the dashboard
  console.log(rest)
  if (rest.isUserLoggedIn) return <Redirect to="/" />
  return <Route render={() => <Component {...rest} />} />
}
