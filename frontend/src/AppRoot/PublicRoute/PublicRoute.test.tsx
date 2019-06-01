// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PublicRoute from './PublicRoute'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PublicRoute should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <PublicRoute
        createNotificationBanner={(): void => {}}
        updateLocalStorage={(): void => {}}
        userSession={userSession}
        path="/"
        component={(): JSX.Element => <div>Content</div>}
      />
    )
  })
})
