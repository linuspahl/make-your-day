// libraries
import React from 'react'
// utils
import initRecordForm from 'components/RecordForm/__tests__/initRecordForm'
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
} from 'testUtils'
// components
import RecordCreate from 'components/RecordCreate/RecordCreate'
// fixtures
import {
  createRecordSuccess,
  createRecordError,
  record,
} from 'store/record/fixtures'

import { getCategoryWithChildrenSuccess } from 'store/category/fixtures'

describe('RecordCreate should', (): void => {
  const propsFixture = {
    rootPath: '/record/create',
  }
  afterEach(cleanup)

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { queryByLabelText, getByText } = renderWithAppRoot(
      <RecordCreate {...propsFixture} />,
      {
        mocks: [createRecordSuccess, getCategoryWithChildrenSuccess],
        route: `/categories/${record.categoryId}/records/create`,
        routePath: '/categories/:categoryId/records/create',
        mockWrappingRoute: true,
        context: { createNotificationBanner: createNotificationBannerStub },
      }
    )
    await wait()
    initRecordForm(queryByLabelText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Eintrag erfolgreich erstellt',
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { queryByLabelText, getByText } = renderWithAppRoot(
      <RecordCreate {...propsFixture} />,
      {
        route: `/categories/${record.categoryId}/records/create`,
        routePath: '/categories/:categoryId/records/create',
        mockWrappingRoute: true,
        mocks: [createRecordError, getCategoryWithChildrenSuccess],
        context: { createNotificationBanner: createNotificationBannerStub },
      }
    )
    await wait()
    initRecordForm(queryByLabelText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Erstellung des Eintrags fehlgeschlagen',
      type: 'error',
    })
  })
})
