// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategorySummaryPlaceholder from './CategorySummaryPlaceholder'

describe('CategorySummaryPlaceholder should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategorySummaryPlaceholder />)
  })
})
