// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PageLayout from './PageLayout'

describe('PageLayout should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <PageLayout rootPath="/">Page content</PageLayout>
    )
  })
})
