// libraries
import * as React from 'react'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
} from 'testUtils'
import initSubcategoryForm from 'components/SubcategoryForm/__tests__/initSubcategoryForm'
// components
import SubcategoryCreate from './SubcategoryCreate'
// fixtures
import {
  createSubcategorySuccess,
  createSubcategoryError,
  subcategory,
} from 'store/category/fixtures'
import { getCategorySuccess, category } from 'store/category/fixtures'

describe('SubcategoryCreate should', (): void => {
  afterEach(cleanup)

  test.only('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText, debug } = renderWithAppRoot(
      <SubcategoryCreate
        rootPath="/Subcategory/create"
        createNotificationBanner={createNotificationBannerStub}
      />,
      {
        route: `category/${category.id}/subcategory/create`,
        mocks: [getCategorySuccess, createSubcategorySuccess],
      }
    )
    await wait()
    debug()
    initSubcategoryForm(getByLabelText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: `Unterkategorie ${subcategory.title} erfolgreich erstellt`,
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <SubcategoryCreate
        rootPath="/Subcategory/create"
        createNotificationBanner={createNotificationBannerStub}
      />,
      {
        route: `category/${category.id}/subcategory/create`,
        mocks: [getCategorySuccess, createSubcategoryError],
      }
    )
    await wait()
    initSubcategoryForm(getByLabelText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Erstellung der Unterkategorie fehlgeschlagen',
      type: 'error',
    })
  })
})
