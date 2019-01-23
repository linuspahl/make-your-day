// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import DashboardWidgets from './DashboardWidgets'

describe('DashboardWidgets should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<DashboardWidgets />)
  })
})
