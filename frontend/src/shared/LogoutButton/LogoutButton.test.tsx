// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import LogoutButton from './LogoutButton'

describe('LogoutButton should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <LogoutButton
        userSessionId={1}
        clearLocalStorage={() => {}}
        createNotificationBanner={() => {}}
      />
    )
  })
})
