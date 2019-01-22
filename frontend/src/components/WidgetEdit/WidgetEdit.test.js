// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetEdit from './WidgetEdit'

describe('WidgetEdit should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<WidgetEdit />)
  })
})
