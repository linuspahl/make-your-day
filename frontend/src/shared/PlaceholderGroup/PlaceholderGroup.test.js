// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import PlaceholderGroup from './PlaceholderGroup'

describe('PlaceholderGroup should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<PlaceholderGroup />)
  })
})
