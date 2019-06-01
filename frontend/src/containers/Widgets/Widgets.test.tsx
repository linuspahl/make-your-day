// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Widgets from './Widgets'
import { userSession } from 'store/userSession/fixtures'

describe('Widgets should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Widgets
        createNotificationBanner={(): void => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
