// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

// components
import PublicRoute from '../PublicRoute/PublicRoute'
import Login from 'containers/Login/Login'

export default props => (
  <Router>
    <Switch>
      <PublicRoute
        path="/login"
        exact
        component={Login}
        isUserLoggedIn={props.isUserLoggedIn}
        updateLocalStorage={props.updateLocalStorage}
      />
    </Switch>
  </Router>
)
