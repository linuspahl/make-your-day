// libraries
import * as React from 'react'
// utils
import {
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
  wait,
  cleanup,
} from 'testUtils'
// components
import EditorWidget from './EditorWidget'
// fixtures
import {
  widget,
  updateWidgetError,
  updateWidgetSuccess,
} from 'store/widget/fixtures'

describe('EditorWidget should', (): void => {
  document.execCommand = (): boolean => true
  afterEach(cleanup)

  test('show notification banner if updating edit failed', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { container } = renderWithAppRoot(
      <EditorWidget
        createNotificationBanner={createNotificationBannerStub}
        widget={widget}
      />,
      { mocks: [updateWidgetError] }
    )

    fireEvent.click(container.firstElementChild, leftClickOption)
    fireEvent.blur(container.firstElementChild)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
  })

  test('update editor without error', async (): Promise<void> => {
    const createNotificationBannerStub = jest.fn()
    const { container, getByTestId } = renderWithAppRoot(
      <EditorWidget
        createNotificationBanner={createNotificationBannerStub}
        widget={widget}
      />,
      { mocks: [updateWidgetSuccess] }
    )
    fireEvent.click(container.firstElementChild, leftClickOption)
    fireEvent.blur(container.firstElementChild)
    await wait()
    expect(createNotificationBannerStub).not.toBeCalled()
  })
})
