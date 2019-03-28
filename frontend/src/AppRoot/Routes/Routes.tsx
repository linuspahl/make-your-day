// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import * as React from 'react'
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
import Evaluations from 'containers/Evaluations/Evaluations'
import Timeline from 'containers/Timeline/Timeline'
// interfaces
import { NotificationCreate, LocalStorageCreate } from 'types/types'
import { UserSession } from 'store/userSession/type'

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  updateLocalStorage: (localStorage: LocalStorageCreate) => void
  userSession: UserSession
  userSettings: { [key: string]: boolean }
}

const Routes = (props: Props): React.ReactElement => (
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
        component={Evaluations}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/evaluations"
      />
      <PrivateRoute
        component={Timeline}
        userSession={props.userSession}
        path="/timeline"
      />
      <PublicRoute path="*" component={PageNotFound} />
    </Switch>
  </Router>
)

export default Routes
