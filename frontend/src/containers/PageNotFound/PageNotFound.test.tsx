// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PageNotFound from './PageNotFound'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('PageNotFound should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <PageNotFound userSession={userSession} rootPath="/" />
    )
  })
})
