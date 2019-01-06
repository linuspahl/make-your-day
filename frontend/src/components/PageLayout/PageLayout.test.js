// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import PageLayout from './PageLayout'

describe('PageLayout should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<PageLayout>Page content</PageLayout>)
  })
})
