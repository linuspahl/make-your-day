// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategorySummary from './CategorySummary'

describe('CategorySummary should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategorySummary category={{}} />)
  })
})
