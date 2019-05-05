// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PrivateRoute from './PrivateRoute'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PrivateRoute should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <PrivateRoute
        clearLocalStorage={() => {}}
        component={() => <div>Content</div>}
        createNotificationBanner={() => {}}
        path="/"
        userSession={userSession}
      />
    )
  })
})
