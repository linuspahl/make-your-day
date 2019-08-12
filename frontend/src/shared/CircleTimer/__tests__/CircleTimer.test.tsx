// libraries
import React from 'react'
import {
  renderWithAppRoot,
  cleanup,
  fireEvent,
  leftClickOption,
} from 'testUtils'
// components
import CircleTimer from 'shared/CircleTimer/CircleTimer'

describe('CircleTimer should', (): void => {
  afterEach(cleanup)

  const children = 10

  test('render without crashing', (): void => {
    const { getByText } = renderWithAppRoot(
      <CircleTimer>{children}</CircleTimer>
    )
    expect(getByText('10')).toBeInTheDocument()
  })

  test('work with a click event, when clickAction is provided', (): void => {
    const onClickEvent = jest.fn()
    const { getByText } = renderWithAppRoot(
      <CircleTimer clickAction={onClickEvent}>{children}</CircleTimer>
    )
    fireEvent.click(getByText(`${children}`), leftClickOption)

    expect(onClickEvent).toBeCalledTimes(1)
  })
})
