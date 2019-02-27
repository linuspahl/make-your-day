// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Button from './Button'

describe('Button should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Button>Content</Button>)
  })
})
