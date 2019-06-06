// libraries
import * as React from 'react'
// utils
import { render, fireEvent, cleanup, leftClickOption } from 'testUtils'
// components
import CloseIcon from './CloseIcon'

describe('CloseIcon should', (): void => {
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByTestId } = render(<CloseIcon />)
    expect(getByTestId('CloseIcon')).toBeInTheDocument()
  })

  test('work with a click event, when clickAction is provided', (): void => {
    const onClickEvent = jest.fn()
    const { getByTestId } = render(<CloseIcon closeAction={onClickEvent} />)
    expect(getByTestId('CloseIcon')).toBeInTheDocument()
    fireEvent.click(getByTestId('CloseIcon'), leftClickOption)
    expect(onClickEvent).toBeCalledTimes(1)
  })
})
