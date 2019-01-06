// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import ContentBox from './ContentBox'

describe('ContentBox should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<ContentBox>Content</ContentBox>)
  })
})
