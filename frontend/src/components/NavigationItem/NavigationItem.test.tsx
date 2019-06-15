// libraries
import * as React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
} from 'testUtils'
// components
import NavigationItem from './NavigationItem'

describe('NavigationItem should', (): void => {
  const propsFixture = {
    toggleAction: (): void => {},
    rootPath: '/',
    route: { title: 'Dashboard', path: '/' },
  }
  afterEach(cleanup)

  test('show provided route title', (): void => {
    const { getByText } = renderWithAppRoot(
      <NavigationItem {...propsFixture} />
    )
    expect(getByText('Dashboard')).toBeInTheDocument()
  })

  test('shoud trigger toggle action on click', (): void => {
    const onClickStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <NavigationItem {...propsFixture} toggleAction={onClickStub} />
    )
    fireEvent.click(getByText('Dashboard'), leftClickOption)
    expect(onClickStub).toBeCalledTimes(1)
  })
})
