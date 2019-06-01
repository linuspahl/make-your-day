// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import FadeTransition from './FadeTransition'

describe('FadeTransition should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <FadeTransition>Children</FadeTransition>
    )
  })
})
