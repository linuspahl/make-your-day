// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Widget from './Widget'

describe('Widget should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Widget widget={{}} />)
  })
})
