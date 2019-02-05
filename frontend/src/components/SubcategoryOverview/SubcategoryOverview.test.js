// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryOverview from './SubcategoryOverview'

describe('SubcategoryOverview should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<SubcategoryOverview />)
  })
})
