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
import initSubcategoryForm from 'components/SubcategoryForm/__tests__/initSubcategoryForm'
// components
import SubcategoryCreate from 'components/SubcategoryCreate/SubcategoryCreate'
// fixtures
import {
  createSubcategorySuccess,
  createSubcategoryError,
  subcategory,
} from 'store/category/fixtures'
import { getCategorySuccess, category } from 'store/category/fixtures'

describe('SubcategoryCreate should', (): void => {
  const propFixtures = {
    rootPath: '/categories',
  }
  const renderUtilsProps = {
    route: `/category/${category.id}/subcategories/create`,
    routePath: `/category/:id/subcategories/create`,
    mockWrappingRoute: true,
  }
  afterEach(cleanup)

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <SubcategoryCreate {...propFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [getCategorySuccess, createSubcategorySuccess],
        context: { createNotificationBanner: createNotificationBannerStub },
      }
    )
    // Wait for getCategory
    await wait()
    initSubcategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    // Wait for updateCategory
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: `Subkategorie ${subcategory.title} erfolgreich erstellt`,
      type: 'success',
    })
  })

  test('should redirect to redord create form, on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <SubcategoryCreate {...propFixtures} rootPath="/categories" />,
      {
        ...renderUtilsProps,
        route: `/category/${category.id}/subcategories/create?source=createRecord`,
        mocks: [getCategorySuccess, createSubcategorySuccess],
        context: { createNotificationBanner: createNotificationBannerStub },
      }
    )
    // Wait for getCategory
    await wait()
    initSubcategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    // Wait for updateCategory
    await wait()
    // TODO: Test redirect, not possible right now
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <SubcategoryCreate rootPath="/subcategories/create" />,
      {
        ...renderUtilsProps,
        mocks: [getCategorySuccess, createSubcategoryError],
        context: { createNotificationBanner: createNotificationBannerStub },
      }
    )
    await wait()
    initSubcategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Erstellung der Subkategorie fehlgeschlagen',
      type: 'error',
    })
  })
})
