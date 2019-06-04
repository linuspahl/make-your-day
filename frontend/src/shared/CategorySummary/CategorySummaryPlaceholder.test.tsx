// libraries
import * as React from 'react'
import { render, cleanup } from 'testUtils'
// components
import CategorySummaryPlaceholder from './CategorySummaryPlaceholder'

describe('CategorySummaryPlaceholder should', (): void => {
  afterEach(cleanup)

  test('render withoud crashing', (): void => {
    const { getByTestId } = render(<CategorySummaryPlaceholder />)
    expect(getByTestId('CategorySummaryPlaceholder')).toBeInTheDocument()
  })

  test('have a specific width, when a size is porivded', (): void => {
    const { getByTestId } = render(<CategorySummaryPlaceholder size="large" />)
    expect(getByTestId('CategorySummaryPlaceholder')).toHaveStyleRule(
      'width',
      '60px'
    )
  })
})
