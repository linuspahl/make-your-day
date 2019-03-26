// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryCreate from './SubcategoryCreate'

describe('SubcategoryCreate should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<SubcategoryCreate createNotificationBanner={() => {}} rootPath="/" />)
  })
})
