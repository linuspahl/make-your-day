// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Row from './Row'

describe('Row should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Row>Content</Row>)
  })
})
