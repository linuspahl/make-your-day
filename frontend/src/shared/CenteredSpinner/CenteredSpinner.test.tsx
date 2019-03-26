// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CenteredSpinner from './CenteredSpinner'

describe('CenteredSpinner should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CenteredSpinner />)
  })
})
