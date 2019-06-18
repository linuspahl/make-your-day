// libraries
import * as React from 'react'
// utils
import initCategoryForm from 'components/CategoryForm/__tests__/initCategoryForm'
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
} from 'testUtils'
// components
import CategoryCreate from './CategoryCreate'
// fixtures
import {
  createCategorySuccess,
  createCategoryError,
  category,
} from 'store/category/fixtures'

describe('CategoryCreate should', (): void => {
  const propsFixture = {
    rootPath: '/category/create',
  }
  afterEach(cleanup)

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <CategoryCreate
        {...propsFixture}
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [createCategorySuccess] }
    )
    initCategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: `Kategorie ${category.title} erfolgreich erstellt`,
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <CategoryCreate
        {...propsFixture}
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [createCategoryError] }
    )
    initCategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Erstellung der Kategorie fehlgeschlagen',
      type: 'error',
    })
  })
})
