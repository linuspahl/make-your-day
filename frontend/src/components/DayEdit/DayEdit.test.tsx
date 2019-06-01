// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import DayEdit from './DayEdit'

describe('DayEdit should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<DayEdit />)
  })
})
