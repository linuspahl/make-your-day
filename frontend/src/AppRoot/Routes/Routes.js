// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

// components
import PublicRoute from '../PublicRoute/PublicRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Categories from 'containers/Categories/Categories'
import Dashboard from 'containers/Dashboard/Dashboard'
import Login from 'containers/Login/Login'
import PageNotFound from 'containers/PageNotFound/PageNotFound'
import Settings from 'containers/Settings/Settings'
import Widgets from 'containers/Widgets/Widgets'
import Timeline from 'containers/Timeline/Timeline'

export default props => (
  <Router>
    <Switch>
      <PublicRoute
        component={Login}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/login"
        updateLocalStorage={props.updateLocalStorage}
      />
      <PrivateRoute
        component={Dashboard}
        createNotificationBanner={props.createNotificationBanner}
        exact
        userSession={props.userSession}
        path="/"
      />
      <PrivateRoute
        clearLocalStorage={props.clearLocalStorage}
        createNotificationBanner={props.createNotificationBanner}
        component={Settings}
        expiresAt={props.expiresAt}
        userSession={props.userSession}
        path="/settings"
        updateLocalStorage={props.updateLocalStorage}
        userSettings={props.userSettings}
      />
      <PrivateRoute
        component={Categories}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/categories"
      />
      <PrivateRoute
        component={Widgets}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/widgets"
      />
      <PrivateRoute
        component={Timeline}
        userSession={props.userSession}
        path="/timeline"
      />
      <PrivateRoute path="*" component={PageNotFound} />
    </Switch>
  </Router>
)
