// libraries
import * as React from 'react'
// utils
import {
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
  wait,
  cleanup,
  adjustApiStub,
} from 'testUtils'
// components
import EditorWidget from 'components/EditorWidget/EditorWidget'
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
      {
        mocks: [updateWidgetError],
      }
    )

    fireEvent.click(container.firstElementChild, leftClickOption)
    fireEvent.blur(container.firstElementChild)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
  })

  test('update widget value, without showing notification banner', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { container } = renderWithAppRoot(
      <EditorWidget
        createNotificationBanner={createNotificationBannerStub}
        widget={widget}
      />,
      {
        mocks: [
          adjustApiStub(updateWidgetSuccess, {
            variables: {
              id: widget.id,
              value: 'Inhalt Notiz 1',
            },
            result: {
              id: widget.id,
              title: widget.title,
              type: widget.type,
              value: 'Inhalt Notiz 1',
              position: widget.position,
            },
          }),
        ],
      }
    )
    fireEvent.click(container.firstElementChild, leftClickOption)
    fireEvent.blur(container.firstElementChild)
    await wait()
    expect(createNotificationBannerStub).not.toBeCalled()
  })
})
