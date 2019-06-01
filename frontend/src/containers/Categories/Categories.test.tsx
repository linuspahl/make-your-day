// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Categories from './Categories'
// fixtures
import { userSession } from 'store/userSession/fixtures'

describe('Categories should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Categories
        createNotificationBanner={(): void => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
