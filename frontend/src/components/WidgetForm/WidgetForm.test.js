// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import WidgetForm from './WidgetForm'

describe('WidgetForm should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<WidgetForm />)
  })
})
