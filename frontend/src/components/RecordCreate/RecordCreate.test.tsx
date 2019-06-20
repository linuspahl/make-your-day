// libraries
import * as React from 'react'
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
import RecordCreate from './RecordCreate'
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
    const { getByLabelText, getByText } = renderWithAppRoot(
      <RecordCreate
        {...propsFixture}
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [createRecordSuccess, getCategoryWithChildrenSuccess] }
    )
    await wait()
    initRecordForm(getByLabelText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: `Eintrag ${record.title} erfolgreich erstellt`,
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <RecordCreate
        {...propsFixture}
        createNotificationBanner={createNotificationBannerStub}
      />,
      {
        mocks: [createRecordError, getCategoryWithChildrenSuccess],
      }
    )
    await wait()
    initRecordForm(getByLabelText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Erstellung der Eintrag fehlgeschlagen',
      type: 'error',
    })
  })
})
