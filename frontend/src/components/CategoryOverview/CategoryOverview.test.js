// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryOverview from './CategoryOverview'

describe('CategoryOverview should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CategoryOverview />)
  })
})
