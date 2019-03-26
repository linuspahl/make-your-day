// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CloseIcon from './CloseIcon'

describe('CloseIcon should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CloseIcon closeAction={() => {}} />)
  })
})
