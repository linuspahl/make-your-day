// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryCreate from './CategoryCreate'

describe('CategoryCreate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <CategoryCreate rootPath="/" createNotificationBanner={(): void => {}} />
    )
  })
})
