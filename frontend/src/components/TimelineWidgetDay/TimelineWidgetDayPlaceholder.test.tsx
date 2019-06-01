// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidgetDayPlaceholder from './TimelineWidgetDayPlaceholder'

describe('TimelineWidgetDayPlaceholder should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<TimelineWidgetDayPlaceholder />)
  })
})
