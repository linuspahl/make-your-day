// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Routes from './Routes'
import { userSession } from 'store/userSession/fixtures'

describe('Routes should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Routes
        createNotificationBanner={(): void => {}}
        clearLocalStorage={(): void => {}}
        updateLocalStorage={(): void => {}}
        userSession={userSession}
        userSettings={{ nightMode: false }}
      />
    )
  })
})
