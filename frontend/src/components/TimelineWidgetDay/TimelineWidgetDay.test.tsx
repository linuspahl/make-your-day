// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidgetDay from './TimelineWidgetDay'
// fixtures
import { category } from 'store/category/fixtures'

describe('TimelineWidgetDay should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <TimelineWidgetDay
        categories={[{ ...category, recordAmountSum: 0 }]}
        date="2012-12-12"
      />
    )
  })
})
