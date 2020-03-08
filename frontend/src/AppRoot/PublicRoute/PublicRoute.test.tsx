// libraries
import React from 'react'
import { renderWithAppRoot, cleanup } from 'testUtils'
import { Switch } from 'react-router'
// components
import PublicRoute from './PublicRoute'

describe('PublicRoute should', (): void => {
  const children = 'Content'
  afterEach(cleanup)

  test('render content, when no user session is provided', (): void => {
    const { getByText } = renderWithAppRoot(
      <Switch>
        <PublicRoute
          component={(): JSX.Element => <div>{children}</div>}
          path="/"
        />
      </Switch>,
      { context: { userSession: undefined } }
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('redirect, when userSession is provided', (): void => {
    const { queryByText } = renderWithAppRoot(
      <Switch>
        <PublicRoute
          component={(): JSX.Element => <div>{children}</div>}
          path="/dashboard"
        />
      </Switch>,
      { route: '/dashboard' }
    )
    expect(queryByText(children)).not.toBeInTheDocument()
  })
})
