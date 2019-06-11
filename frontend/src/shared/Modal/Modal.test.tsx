// libraries
import * as React from 'react'
// utils
import {
  renderWithAppRoot,
  cleanup,
  fireEvent,
  leftClickOption,
} from 'testUtils'
// components
import Modal from './Modal'

describe('Modal should', (): void => {
  const children = 'My special Modal content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(
      <Modal toggleAction={(): void => {}}>{children}</Modal>
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('display headline', (): void => {
    const headline = 'My special Modal headline!'
    const { getByText } = renderWithAppRoot(
      <Modal toggleAction={(): void => {}} headline={headline}>
        Content
      </Modal>
    )
    expect(getByText(headline)).toBeInTheDocument()
  })

  test('close by click on offset area', (): void => {
    const toggleActionEvent = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <Modal toggleAction={toggleActionEvent}>{children}</Modal>
    )
    fireEvent.click(getByTestId('Modal-offset'), leftClickOption)
    expect(toggleActionEvent).toBeCalled()
  })
})
