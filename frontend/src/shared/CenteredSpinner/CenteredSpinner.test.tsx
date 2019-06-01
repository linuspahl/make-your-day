// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CenteredSpinner from './CenteredSpinner'

describe('CenteredSpinner should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<CenteredSpinner />)
  })
})
