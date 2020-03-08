// This file is the heart of the app routing
// You'll find all "base" routes here
// Each route will render a container component
// the component will be lazy loaded

// It would be awesome to have a shared component for the redundant react lodable part
// Due to typescript this is not so easy and for now we need to do it manually for each container
// and we need to disble explicit any (only place were we disable this rule)
/* eslint-disable @typescript-eslint/no-explicit-any */

// libraries
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
// components
import InAppLayout from 'components/InAppLayout/InAppLayout'
import LoadableCenteredSpinner from 'shared/CenteredSpinner/LoadableCenteredSpinner'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicRoute from '../PublicRoute/PublicRoute'
// interfaces
import { LocalStorageCreate } from 'types/types'
import { UserSession } from 'store/userSession/type'

interface Props {
  clearLocalStorage: () => void
  updateLocalStorage: (localStorage: LocalStorageCreate) => void
  userSession: UserSession
  userSettings: { [key: string]: boolean }
}

const Routes = ({
  clearLocalStorage,
  updateLocalStorage,
  userSession,
  userSettings,
}: Props): JSX.Element => (
  <Router>
    <Switch>
      <PublicRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(/* webpackChunkName: "Login" */ 'containers/Login/Login'),
          loading: LoadableCenteredSpinner,
        })}
        userSession={userSession}
        path="/login"
        updateLocalStorage={updateLocalStorage}
      />
      <InAppLayout userSession={userSession}>
        <PrivateRoute
          component={Loadable({
            loader: (): Promise<any> =>
              import(
                /* webpackChunkName: "Dashboard" */ 'containers/Dashboard/Dashboard'
              ),
            loading: LoadableCenteredSpinner,
          })}
          exact
          userSession={userSession}
          path="/"
        />

        <PrivateRoute
          clearLocalStorage={clearLocalStorage}
          component={Loadable({
            loader: (): Promise<any> =>
              import(
                /* webpackChunkName: "Settings" */ 'containers/Settings/Settings'
              ),
            loading: LoadableCenteredSpinner,
          })}
          userSession={userSession}
          path="/settings"
          updateLocalStorage={updateLocalStorage}
          userSettings={userSettings}
        />
        <PrivateRoute
          component={Loadable({
            loader: (): Promise<any> =>
              import(
                /* webpackChunkName: "Categories" */ 'containers/Categories/Categories'
              ),
            loading: LoadableCenteredSpinner,
          })}
          userSession={userSession}
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
          userSession={userSession}
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
          userSession={userSession}
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
          userSession={userSession}
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
