// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Button from './Button'

describe('Button should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Button>Content</Button>)
  })
})
