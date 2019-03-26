// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Routes from './Routes'
import { userSession } from 'store/userSession/fixtures';

describe('Routes should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Routes
        createNotificationBanner={() => {}}
        clearLocalStorage={() => {}}
        updateLocalStorage={() => {}}
        userSession={userSession}
        userSettings={{ nightMode: false }}
      />)
  })
})
