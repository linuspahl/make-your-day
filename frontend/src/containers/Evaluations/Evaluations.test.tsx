// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Evaluations from './Evaluations'
// fixtures
import { userSession } from 'store/userSession/fixtures';

describe('Evaluations should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Evaluations
        createNotificationBanner={() => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
