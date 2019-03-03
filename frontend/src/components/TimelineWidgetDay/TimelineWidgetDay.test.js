// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidgetDay from './TimelineWidgetDay'

describe('TimelineWidgetDay should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<TimelineWidgetDay />)
  })
})
