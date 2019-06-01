// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Timeline from './Timeline'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Timeline should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Timeline rootPath="/" userSession={userSession} />
    )
  })
})
