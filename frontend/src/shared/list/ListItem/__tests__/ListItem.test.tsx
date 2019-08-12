// libraries
import React from 'react'
import {
  renderWithAppRoot,
  cleanup,
  fireEvent,
  leftClickOption,
} from 'testUtils'
// components
import ListItem from 'shared/list/ListItem/ListItem'

describe('ListItem should', (): void => {
  const children = 'My special ListItem content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(<ListItem>{children}</ListItem>)
    expect(getByText(children)).toBeInTheDocument()
  })

  test('align content with space-between, when property spaceBetween is provided', (): void => {
    const { getByText } = renderWithAppRoot(
      <ListItem spaceBetween>{children}</ListItem>
    )
    expect(getByText(children)).toHaveStyleRule(
      'justify-content',
      'space-between'
    )
  })

  test('work with a click event, when clickAction is provided', (): void => {
    const onClickEvent = jest.fn()
    const { getByText } = renderWithAppRoot(
      <ListItem clickAction={onClickEvent}>{children}</ListItem>
    )

    fireEvent.click(getByText(`${children}`), leftClickOption)

    expect(onClickEvent).toBeCalledTimes(1)
  })
})
