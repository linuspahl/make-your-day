// libraries
import React from 'react'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
} from 'testUtils'
import initWidgetForm from 'components/WidgetForm/__tests__/initWidgetForm'
// components
import WidgetCreate from 'components/WidgetCreate/WidgetCreate'
// fixtures
import { createWidgetSuccess, createWidgetError } from 'store/widget/fixtures'
import { getEvaluationsForListSuccess } from 'store/evaluation/fixtures'

describe('WidgetCreate should', (): void => {
  afterEach(cleanup)

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <WidgetCreate
        rootPath="/widget/create"
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [getEvaluationsForListSuccess, createWidgetSuccess] }
    )
    await wait()
    initWidgetForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Widget Notiz 1 erfolgreich erstellt',
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <WidgetCreate
        rootPath="/widget/create"
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [getEvaluationsForListSuccess, createWidgetError] }
    )
    await wait()
    initWidgetForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Erstellung des Widgets fehlgeschlagen',
      type: 'error',
    })
  })
})
