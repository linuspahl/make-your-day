// libraries
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: Component, userSession, ...rest }) => {
  // If user is already logged in and tries to access a public route,
  // we will redirect him to to root route, the dashboard
  if (userSession && userSession.token) return <Redirect to="/" />
  return (
    <Route render={() => <Component userSession={userSession} {...rest} />} />
  )
}
