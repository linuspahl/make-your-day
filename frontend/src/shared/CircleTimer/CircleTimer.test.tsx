// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CircleTimer from './CircleTimer'

describe('CircleTimer should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<CircleTimer>Icon</CircleTimer>)
  })
})
