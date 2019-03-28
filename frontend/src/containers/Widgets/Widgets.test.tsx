// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Widgets from './Widgets'
import { userSession } from 'store/userSession/fixtures'

describe('Widgets should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Widgets
        createNotificationBanner={() => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
