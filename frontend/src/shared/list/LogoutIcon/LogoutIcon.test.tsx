// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import LogoutIcon from './LogoutIcon'

describe('LogoutIcon should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <LogoutIcon
        createNotificationBanner={(): void => {}}
        userSessionId={1}
        clearLocalStorage={(): void => {}}
      />
    )
  })
})
