// libraries
import * as React from 'react'
// utils
import colorTheme from 'theme'
import {
  cleanup,
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
} from 'testUtils'
// components
import Button from './Button'

describe('Button should', (): void => {
  afterEach(cleanup)

  const children = 'My special Button content!'
  const theme = colorTheme()

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(<Button>{children}</Button>)
    expect(getByText(children)).toBeInTheDocument()
  })

  test('work as a link, when target is provided', (): void => {
    const target = '/example-link'
    const { getByText } = renderWithAppRoot(
      <Button to={target}>{children}</Button>
    )
    expect(getByText(children).getAttribute('href')).toBe(target)
    expect(getByText(children).nodeName).toBe('A')
  })

  test('work with a click event, when clickAction is provided', (): void => {
    const onClickEvent = jest.fn()
    const { getByText } = renderWithAppRoot(
      <Button clickAction={onClickEvent}>{children}</Button>
    )
    fireEvent.click(getByText(children), leftClickOption)
    expect(onClickEvent).toBeCalledTimes(1)
  })

  test('use primary colors with context primary', (): void => {
    const { getByText } = renderWithAppRoot(
      <Button context="primary">{children}</Button>
    )
    expect(getByText(children)).toHaveStyleRule(
      'background-color',
      theme.primary
    )
  })

  test('use secondary colors with context secondary', (): void => {
    const { getByText } = renderWithAppRoot(
      <Button context="secondary">{children}</Button>
    )
    expect(getByText(children)).toHaveStyleRule(
      'background-color',
      theme.secondary
    )
  })

  test('use delete colors with context delete', (): void => {
    const { getByText } = renderWithAppRoot(
      <Button context="delete">{children}</Button>
    )
    expect(getByText(children)).toHaveStyleRule(
      'background-color',
      theme.delete
    )
  })
})
