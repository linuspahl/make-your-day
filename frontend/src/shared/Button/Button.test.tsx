// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Button from './Button'

describe('Button should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Button>Content</Button>)
  })
})
