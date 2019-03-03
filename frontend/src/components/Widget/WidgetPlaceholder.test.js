// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetPlaceholder from './WidgetPlaceholder'

describe('WidgetPlaceholder should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<WidgetPlaceholder />)
  })
})
