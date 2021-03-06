// libraries
import React from 'react'
// utils
import {
  adjustApiStub,
  cleanup,
  fireEvent,
  leftClickOption,
  mockDocument,
  mockWindow,
  renderWithAppRoot,
  wait,
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
  mockDocument()
  mockWindow()
  afterEach(cleanup)

  test('show notification banner if updating edit failed', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { container } = renderWithAppRoot(<EditorWidget widget={widget} />, {
      context: { createNotificationBanner: createNotificationBannerStub },
      mocks: [updateWidgetError],
    })

    fireEvent.click(container.firstElementChild, leftClickOption)
    fireEvent.blur(container.firstElementChild)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
  })

  test('update widget value, without showing notification banner', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { container } = renderWithAppRoot(<EditorWidget widget={widget} />, {
      context: { createNotificationBanner: createNotificationBannerStub },
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
    })
    fireEvent.click(container.firstElementChild, leftClickOption)
    fireEvent.blur(container.firstElementChild)
    await wait()
    expect(createNotificationBannerStub).not.toBeCalled()
  })
})
