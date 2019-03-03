// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidgetDayPlaceholder from './TimelineWidgetDayPlaceholder'

describe('TimelineWidgetDayPlaceholder should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<TimelineWidgetDayPlaceholder />)
  })
})
