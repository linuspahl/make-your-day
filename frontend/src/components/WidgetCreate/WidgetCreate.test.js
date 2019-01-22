// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetCreate from './WidgetCreate'

describe('WidgetCreate should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<WidgetCreate />)
  })
})
