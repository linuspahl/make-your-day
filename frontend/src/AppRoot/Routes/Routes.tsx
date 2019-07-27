// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component

// libraries
import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
// components
import InAppLayout from 'components/InAppLayout/InAppLayout'
import LoadableCenteredSpinner from 'shared/CenteredSpinner/LoadableCenteredSpinner'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicRoute from '../PublicRoute/PublicRoute'
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
          loading: LoadableCenteredSpinner,
        })}
        createNotificationBanner={props.createNotificationBanner}
        userSession={props.userSession}
        path="/login"
        updateLocalStorage={props.updateLocalStorage}
      />
      <InAppLayout userSession={props.userSession}>
        <PrivateRoute
          component={Loadable({
            loader: (): Promise<any> =>
              import(
                /* webpackChunkName: "Dashboard" */ 'containers/Dashboard/Dashboard'
              ),
            loading: LoadableCenteredSpinner,
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
            loading: LoadableCenteredSpinner,
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
            loading: LoadableCenteredSpinner,
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
            loading: LoadableCenteredSpinner,
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
            loading: LoadableCenteredSpinner,
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
            loading: LoadableCenteredSpinner,
          })}
          userSession={props.userSession}
          path="/timeline"
        />
      </InAppLayout>
      <PublicRoute
        path="*"
        component={Loadable({
          loader: (): Promise<any> =>
            import(
              /* webpackChunkName: "PageNotFound" */ 'containers/PageNotFound/PageNotFound'
            ),
          loading: LoadableCenteredSpinner,
        })}
      />
    </Switch>
  </Router>
)

export default Routes
