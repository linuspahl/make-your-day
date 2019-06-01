// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CloseIcon from './CloseIcon'

describe('CloseIcon should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <CloseIcon closeAction={(): void => {}} />
    )
  })
})
