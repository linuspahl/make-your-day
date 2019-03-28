// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryEdit from './CategoryEdit'

describe('CategoryEdit should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <CategoryEdit rootPath="/" createNotificationBanner={() => {}} />
    )
  })
})
