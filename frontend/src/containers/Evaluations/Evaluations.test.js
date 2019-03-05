// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Evaluations from './Evaluations'

describe('Evaluations should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Evaluations>Content</Evaluations>)
  })
})
