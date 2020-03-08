// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Routes from './Routes'
import { userSession } from 'store/userSession/fixtures'

describe('Routes should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Routes
        clearLocalStorage={(): void => {}}
        updateLocalStorage={(): void => {}}
        userSession={userSession}
        userSettings={{ nightMode: false }}
      />
    )
  })
})
