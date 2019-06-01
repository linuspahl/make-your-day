// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Dashboard from './Dashboard'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Dashboard should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Dashboard
        createNotificationBanner={(): void => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
