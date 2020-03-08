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

const Routes = (): JSX.Element => (
  <Router>
    <Switch>
      <PublicRoute
        component={Loadable({
          loader: (): Promise<any> =>
            import(/* webpackChunkName: "Login" */ 'containers/Login/Login'),
          loading: LoadableCenteredSpinner,
        })}
        path="/login"
      />
      <InAppLayout>
        <PrivateRoute
          component={Loadable({
            loader: (): Promise<any> =>
              import(
                /* webpackChunkName: "Dashboard" */ 'containers/Dashboard/Dashboard'
              ),
            loading: LoadableCenteredSpinner,
          })}
          exact
          path="/"
        />

        <PrivateRoute
          component={Loadable({
            loader: (): Promise<any> =>
              import(
                /* webpackChunkName: "Settings" */ 'containers/Settings/Settings'
              ),
            loading: LoadableCenteredSpinner,
          })}
          path="/settings"
        />
        <PrivateRoute
          component={Loadable({
            loader: (): Promise<any> =>
              import(
                /* webpackChunkName: "Categories" */ 'containers/Categories/Categories'
              ),
            loading: LoadableCenteredSpinner,
          })}
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
