// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <ErrorMessage message="Message" error="Error" />
    )
  })
})
