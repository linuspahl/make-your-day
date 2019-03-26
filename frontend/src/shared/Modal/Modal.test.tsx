// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Modal from './Modal'

describe('Modal should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Modal toggleAction={() => {}}>Content</Modal>)
  })
})
