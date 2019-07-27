// libraries
import * as React from 'react'
// utils
import {
  renderWithAppRoot,
  cleanup,
  leftClickOption,
  fireEvent,
} from 'testUtils'
// components
import BottomNavigation from './BottomNavigation'

describe('BottomNavigation should', (): void => {
  const children = 'My special BottomNavigation content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(
      <BottomNavigation toggleNavigation={(): void => {}}>
        {children}
      </BottomNavigation>
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('should call toggle navigation action', (): void => {
    const onClickEvent = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <BottomNavigation toggleNavigation={onClickEvent}>
        {children}
      </BottomNavigation>
    )
    fireEvent.click(getByTestId('NavigationToggle'), leftClickOption)
    expect(onClickEvent).toBeCalledTimes(1)
  })
})
