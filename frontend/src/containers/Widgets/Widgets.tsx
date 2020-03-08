// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import WidgetCreate from 'components/WidgetCreate/WidgetCreate'
import WidgetEdit from 'components/WidgetEdit/WidgetEdit'
import WidgetOverview from 'components/WidgetOverview/WidgetOverview'

interface Props {
  rootPath: string
}

const Widgets = ({ rootPath }: Props): JSX.Element => (
  <>
    <Route
      exact
      path={rootPath}
      render={(): JSX.Element => <WidgetOverview rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/create`}
      render={(): JSX.Element => <WidgetCreate rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/edit/:id`}
      render={(): JSX.Element => <WidgetEdit rootPath={rootPath} />}
    />
  </>
)

export default Widgets
