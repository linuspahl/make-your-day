// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import CenteredSpinner from './CenteredSpinner'

describe('CenteredSpinner should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<CenteredSpinner />)
  })
})
