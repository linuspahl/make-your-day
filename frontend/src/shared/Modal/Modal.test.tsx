// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Modal from './Modal'

describe('Modal should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Modal toggleAction={(): void => {}}>Content</Modal>
    )
  })
})
