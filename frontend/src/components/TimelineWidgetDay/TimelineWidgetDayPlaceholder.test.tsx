// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidgetDayPlaceholder from './TimelineWidgetDayPlaceholder'

describe('TimelineWidgetDayPlaceholder should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<TimelineWidgetDayPlaceholder />)
  })
})
