// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PublicRoute from './PublicRoute'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PublicRoute should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <PublicRoute
        createNotificationBanner={() => {}}
        updateLocalStorage={() => {}}
        userSession={userSession}
        path="/"
        component={<div>Content</div>}
      />)
  })
})
