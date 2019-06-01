// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategorySummaryPlaceholder from './CategorySummaryPlaceholder'

describe('CategorySummaryPlaceholder should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<CategorySummaryPlaceholder />)
  })
})
