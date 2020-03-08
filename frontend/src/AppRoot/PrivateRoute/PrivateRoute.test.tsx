// libraries
import React from 'react'
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import PrivateRoute from './PrivateRoute'
// fixtures
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
        />
      </Switch>,
      { route: '/dashboard' }
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test.only('not render content, when no userSession is provided', (): void => {
    const { queryByText, debug } = renderWithAppRoot(
      <Switch>
        <PrivateRoute
          component={(): JSX.Element => <div>{children}</div>}
          path="/dashboard"
        />
      </Switch>,
      { route: '/dashboard', context: { userSession: undefined } }
    )
    console.log(debug())
    expect(queryByText(children)).not.toBeInTheDocument()
  })
})
