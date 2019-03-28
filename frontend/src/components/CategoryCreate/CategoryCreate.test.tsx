// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryCreate from './CategoryCreate'

describe('CategoryCreate should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <CategoryCreate rootPath="/" createNotificationBanner={() => {}} />
    )
  })
})
