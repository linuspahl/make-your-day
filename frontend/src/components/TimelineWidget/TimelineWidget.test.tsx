// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidget from './TimelineWidget'

describe('TimelineWidget should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<TimelineWidget />)
  })
})
