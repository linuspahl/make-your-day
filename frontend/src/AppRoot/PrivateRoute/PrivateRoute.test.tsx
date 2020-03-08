// libraries
import React from 'react'
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import PrivateRoute from './PrivateRoute'
// fixtures
import { userSession } from 'store/userSession/fixtures'
import { Switch } from 'react-router'

describe('PrivateRoute should', (): void => {
  const children = 'Content'
  afterEach(cleanup)

  test('render content', (): void => {
    const { getByText } = renderWithAppRoot(
      <Switch>
        <PrivateRoute
          component={(): JSX.Element => <div>{children}</div>}
          path="/dashboard"
          userSession={userSession}
        />
      </Switch>,
      { route: '/dashboard' }
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('not render content, when no userSession is provided', (): void => {
    const { queryByText } = renderWithAppRoot(
      <Switch>
        <PrivateRoute
          component={(): JSX.Element => <div>{children}</div>}
          path="/dashboard"
          userSession={null}
        />
      </Switch>,
      { route: '/dashboard' }
    )
    expect(queryByText(children)).not.toBeInTheDocument()
  })
})
