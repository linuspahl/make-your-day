// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetOverview from './WidgetOverview'

describe('WidgetOverview should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<WidgetOverview />)
  })
})
