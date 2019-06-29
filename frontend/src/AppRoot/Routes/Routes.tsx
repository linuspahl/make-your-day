// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
// components
import PublicRoute from '../PublicRoute/PublicRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
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

const Routes = (props: Props): JSX.Element => (
  <Router>
    <Switch>
      <PublicRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(/* webpackChunkName: "Login" */ 'containers/Login/Login'),
          loading: CenteredSpinner,
        })}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/login"
        updateLocalStorage={props.updateLocalStorage}
      />
      <PrivateRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "Dashboard" */ 'containers/Dashboard/Dashboard'
            ),
          loading: CenteredSpinner,
        })}
        createNotificationBanner={props.createNotificationBanner}
        exact
        userSession={props.userSession}
        path="/"
      />
      <PrivateRoute
        clearLocalStorage={props.clearLocalStorage}
        createNotificationBanner={props.createNotificationBanner}
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "Settings" */ 'containers/Settings/Settings'
            ),
          loading: CenteredSpinner,
        })}
        userSession={props.userSession}
        path="/settings"
        updateLocalStorage={props.updateLocalStorage}
        userSettings={props.userSettings}
      />
      <PrivateRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "Categories" */ 'containers/Categories/Categories'
            ),
          loading: CenteredSpinner,
        })}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/categories"
      />
      <PrivateRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "Widgets" */ 'containers/Widgets/Widgets'
            ),
          loading: CenteredSpinner,
        })}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/widgets"
      />
      <PrivateRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "Evaluations" */ 'containers/Evaluations/Evaluations'
            ),
          loading: CenteredSpinner,
        })}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/evaluations"
      />
      <PrivateRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "Timeline" */ 'containers/Timeline/Timeline'
            ),
          loading: CenteredSpinner,
        })}
        userSession={props.userSession}
        path="/timeline"
      />
      <PublicRoute
        path="*"
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "PageNotFound" */ 'containers/PageNotFound/PageNotFound'
            ),
          loading: CenteredSpinner,
        })}
      />
    </Switch>
  </Router>
)

export default Routes
