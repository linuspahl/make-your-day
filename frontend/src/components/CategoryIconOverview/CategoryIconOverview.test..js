// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIconOverview from './CategoryIconOverview'

describe('CategoryIconOverview should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategoryIconOverview />)
  })
})
