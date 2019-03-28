// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PageLayout from './PageLayout'

describe('PageLayout should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <PageLayout rootPath="/">Page content</PageLayout>
    )
  })
})
