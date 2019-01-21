// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import PublicRoute from '../PublicRoute/PublicRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Login from 'containers/Login/Login'
import Dashboard from 'containers/Dashboard/Dashboard'
import Settings from 'containers/Settings/Settings'
import Categories from 'containers/Categories/Categories'
import PageNotFound from 'containers/PageNotFound/PageNotFound'

export default props => (
  <Router>
    <Switch>
      <PublicRoute
        path="/login"
        component={Login}
        isUserLoggedIn={props.isUserLoggedIn}
        updateLocalStorage={props.updateLocalStorage}
        createNotificationBanner={props.createNotificationBanner}
      />
      <PrivateRoute
        path="/"
        component={Dashboard}
        isUserLoggedIn={props.isUserLoggedIn}
        exact
      />
      <PrivateRoute
        path="/settings"
        component={Settings}
        clearLocalStorage={props.clearLocalStorage}
        updateLocalStorage={props.updateLocalStorage}
        isUserLoggedIn={props.isUserLoggedIn}
        userSettings={props.userSettings}
        exact
      />
      <PrivateRoute
        path="/categories"
        component={Categories}
        isUserLoggedIn={props.isUserLoggedIn}
      />
      <PrivateRoute path="*" component={PageNotFound} />
    </Switch>
  </Router>
)
