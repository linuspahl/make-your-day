// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Categories from './Categories'
// fixtures
import { userSession } from 'store/userSession/fixtures';

describe('Categories should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Categories
        createNotificationBanner={() => {}}
        rootPath="/"
        userSession={userSession}
      />
    )
  })
})
