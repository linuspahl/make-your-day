// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Timeline from './Timeline'

describe('Timeline should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Timeline />)
  })
})
