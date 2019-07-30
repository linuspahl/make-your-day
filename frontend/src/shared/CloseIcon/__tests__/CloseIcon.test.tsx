// libraries
import * as React from 'react'
// utils
import {
  fireEvent,
  cleanup,
  leftClickOption,
  renderWithAppRoot,
} from 'testUtils'
// components
import CloseIcon from 'shared/CloseIcon/CloseIcon'

describe('CloseIcon should', (): void => {
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByTestId } = renderWithAppRoot(<CloseIcon />)
    expect(getByTestId('CloseIcon')).toBeInTheDocument()
  })

  test('work with a click event, when clickAction is provided', (): void => {
    const onClickEvent = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <CloseIcon closeAction={onClickEvent} />
    )
    expect(getByTestId('CloseIcon')).toBeInTheDocument()
    fireEvent.click(getByTestId('CloseIcon'), leftClickOption)
    expect(onClickEvent).toBeCalledTimes(1)
  })
})
