// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidget from './TimelineWidget'

describe('TimelineWidget should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<TimelineWidget />)
  })
})
