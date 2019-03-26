// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import NoResult from './NoResult'

describe('NoResult should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<NoResult />)
  })
})
