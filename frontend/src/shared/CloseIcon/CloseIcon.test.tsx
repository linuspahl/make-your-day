// libraries
import * as React from 'react'
import { render, fireEvent, cleanup } from 'testUtils'
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
    const leftClick = { button: 0 }
    fireEvent.click(getByTestId('CloseIcon'), leftClick)

    expect(onClickEvent).toBeCalledTimes(1)
  })
})
