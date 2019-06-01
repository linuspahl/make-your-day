// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Evaluations from './Evaluations'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Evaluations should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Evaluations
        createNotificationBanner={(): void => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
