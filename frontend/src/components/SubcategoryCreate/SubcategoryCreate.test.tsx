// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryCreate from './SubcategoryCreate'

describe('SubcategoryCreate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <SubcategoryCreate
        createNotificationBanner={(): void => {}}
        rootPath="/"
      />
    )
  })
})
