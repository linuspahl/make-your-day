// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Modal from './Modal'

describe('Modal should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Modal />)
  })
})
