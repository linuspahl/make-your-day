// libraries
import React from 'react'
// utils
import {
  renderWithAppRoot,
  cleanup,
  leftClickOption,
  fireEvent,
} from 'testUtils'
// components
import BottomNavigation from 'shared/BottomNavigation/BottomNavigation'

describe('BottomNavigation should', (): void => {
  const children = 'My special BottomNavigation content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(
      <BottomNavigation toggleNavigation={(): void => {}} isNavVisible>
        {children}
      </BottomNavigation>
    )
    expect(getByText(children)).toBeInTheDocument()
  })

  test('should call toggle navigation action', (): void => {
    const onClickEvent = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <BottomNavigation toggleNavigation={onClickEvent} isNavVisible>
        {children}
      </BottomNavigation>
    )
    fireEvent.click(getByTestId('NavigationToggle'), leftClickOption)
    expect(onClickEvent).toBeCalledTimes(1)
  })
})
