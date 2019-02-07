// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import DayEdit from './DayEdit'

describe('DayEdit should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<DayEdit />)
  })
})
