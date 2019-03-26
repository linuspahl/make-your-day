// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategorySummaryPlaceholder from './CategorySummaryPlaceholder'

describe('CategorySummaryPlaceholder should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CategorySummaryPlaceholder />)
  })
})
