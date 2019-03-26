// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import DayEdit from './DayEdit'

describe('DayEdit should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<DayEdit />)
  })
})
