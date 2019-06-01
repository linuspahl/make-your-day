// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryEdit from './SubcategoryEdit'

describe('SubcategoryEdit should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <SubcategoryEdit rootPath="/" createNotificationBanner={(): void => {}} />
    )
  })
})
