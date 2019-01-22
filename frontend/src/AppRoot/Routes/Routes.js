// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import PublicRoute from '../PublicRoute/PublicRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Categories from 'containers/Categories/Categories'
import Dashboard from 'containers/Dashboard/Dashboard'
import Login from 'containers/Login/Login'
import PageNotFound from 'containers/PageNotFound/PageNotFound'
import Settings from 'containers/Settings/Settings'
import Widgets from 'containers/Widgets/Widgets'

export default props => (
  <Router>
    <Switch>
      <PublicRoute
        component={Login}
        createNotificationBanner={props.createNotificationBanner}
        isUserLoggedIn={props.isUserLoggedIn}
        path="/login"
        updateLocalStorage={props.updateLocalStorage}
      />
      <PrivateRoute
        component={Dashboard}
        exact
        isUserLoggedIn={props.isUserLoggedIn}
        path="/"
      />
      <PrivateRoute
        clearLocalStorage={props.clearLocalStorage}
        component={Settings}
        exact
        isUserLoggedIn={props.isUserLoggedIn}
        path="/settings"
        updateLocalStorage={props.updateLocalStorage}
        userSettings={props.userSettings}
      />
      <PrivateRoute
        component={Categories}
        createNotificationBanner={props.createNotificationBanner}
        isUserLoggedIn={props.isUserLoggedIn}
        path="/categories"
      />
      <PrivateRoute
        component={Widgets}
        createNotificationBanner={props.createNotificationBanner}
        isUserLoggedIn={props.isUserLoggedIn}
        path="/widgets"
      />
      <PrivateRoute path="*" component={PageNotFound} />
    </Switch>
  </Router>
)
