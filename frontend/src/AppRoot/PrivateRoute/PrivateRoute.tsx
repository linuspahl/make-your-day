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

const PrivateRoute = ({
  component: Component,
  exact,
  path,
  ...rest
}: Props): JSX.Element => {
  const { userSession } = useContext(AppContext)
  console.log('userSession', userSession)
  // If user is not logged in and tries to access a private route,
  // we will redirect him to the login page
  if (!userSession || !userSession.token) return <Redirect to="/login" />
  return (
    <Route
      path={path}
      exact={exact}
      render={(): JSX.Element => <Component rootPath={path} {...rest} />}
    />
  )
}

export default PrivateRoute
