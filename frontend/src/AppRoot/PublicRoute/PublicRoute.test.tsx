// libraries
import React from 'react'
import { renderWithAppRoot, cleanup } from 'testUtils'
import { Switch } from 'react-router'
// components
import PublicRoute from './PublicRoute'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PublicRoute should', (): void => {
  const children = 'Content'
  afterEach(cleanup)

  test('render content', (): void => {
    const { getByText } = renderWithAppRoot(
      <Switch>
        <PublicRoute
          component={(): JSX.Element => <div>{children}</div>}
          createNotificationBanner={(): void => {}}
          path="/"
          userSession={null}
        />
      </Switch>
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('redirect, when no userSession is provided', (): void => {
    const { queryByText } = renderWithAppRoot(
      <Switch>
        <PublicRoute
          component={(): JSX.Element => <div>{children}</div>}
          createNotificationBanner={(): void => {}}
          path="/dashboard"
          userSession={userSession}
        />
      </Switch>,
      { route: '/dashboard' }
    )
    expect(queryByText(children)).not.toBeInTheDocument()
  })
})
