// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PrivateRoute from './PrivateRoute'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PrivateRoute should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <PrivateRoute
        clearLocalStorage={(): void => {}}
        component={(): JSX.Element => <div>Content</div>}
        createNotificationBanner={(): void => {}}
        path="/"
        userSession={userSession}
      />
    )
  })
})
