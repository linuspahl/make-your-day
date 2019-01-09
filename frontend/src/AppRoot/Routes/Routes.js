// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

// components
import PublicRoute from '../PublicRoute/PublicRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Login from 'containers/Login/Login'
import Dashboard from 'containers/Dashboard/Dashboard'

export default props => (
  <Router>
    <Switch>
      <PublicRoute
        path="/login"
        component={Login}
        isUserLoggedIn={props.isUserLoggedIn}
        updateLocalStorage={props.updateLocalStorage}
      />
      <PrivateRoute
        path="/"
        component={Dashboard}
        isUserLoggedIn={props.isUserLoggedIn}
      />
    </Switch>
  </Router>
)
