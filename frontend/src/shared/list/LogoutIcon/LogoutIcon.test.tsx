// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import LogoutIcon from './LogoutIcon'

describe('LogoutIcon should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <LogoutIcon
        createNotificationBanner={() => {}}
        userSessionId={1}
        clearLocalStorage={() => {}}
      />
    )
  })
})
