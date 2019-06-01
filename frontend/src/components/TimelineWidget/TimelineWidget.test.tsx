// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import TimelineWidget from './TimelineWidget'

describe('TimelineWidget should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<TimelineWidget />)
  })
})
