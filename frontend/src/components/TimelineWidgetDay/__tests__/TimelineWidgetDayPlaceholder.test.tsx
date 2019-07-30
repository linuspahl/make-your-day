// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import TimelineWidgetDayPlaceholder from 'components/TimelineWidgetDay/TimelineWidgetDayPlaceholder'

describe('TimelineWidgetDayPlaceholder should', (): void => {
  test('render without crashing', (): void => {
    const { getByTestId } = renderWithAppRoot(<TimelineWidgetDayPlaceholder />)
    expect(getByTestId('TimelineWidgetDayPlaceholder')).toBeInTheDocument()
  })
})
