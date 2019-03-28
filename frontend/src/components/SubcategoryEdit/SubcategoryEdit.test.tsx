// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryEdit from './SubcategoryEdit'

describe('SubcategoryEdit should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <SubcategoryEdit rootPath="/" createNotificationBanner={() => {}} />
    )
  })
})
