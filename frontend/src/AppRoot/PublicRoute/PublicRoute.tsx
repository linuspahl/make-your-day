// libraries
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
// contexts
import AppContext from 'contexts/AppContext'

interface Props {
  component: React.ReactType
  exact?: boolean
  path: string
}

const PublicRoute = ({ component: Component, ...rest }: Props): JSX.Element => {
  const { userSession } = useContext(AppContext)
  // If user is already logged in and tries to access a public route,
  // we will redirect him to to root route, the dashboard
  if (userSession && userSession.token) return <Redirect to="/" />
  return <Route render={(): JSX.Element => <Component {...rest} />} />
}

export default PublicRoute
