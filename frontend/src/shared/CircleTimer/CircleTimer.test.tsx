// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CircleTimer from './CircleTimer'

describe('CircleTimer should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CircleTimer>Icon</CircleTimer>)
  })
})
