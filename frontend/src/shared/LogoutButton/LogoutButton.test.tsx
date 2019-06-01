// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import LogoutButton from './LogoutButton'

describe('LogoutButton should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <LogoutButton
        userSessionId={1}
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
      />
    )
  })
})
