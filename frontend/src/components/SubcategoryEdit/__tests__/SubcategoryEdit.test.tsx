// libraries
import React from 'react'
// utils
import {
  leftClickOption,
  renderWithAppRoot,
  fireEvent,
  wait,
  cleanup,
} from 'testUtils'
// components
import SubcategoryEdit from 'components/SubcategoryEdit/SubcategoryEdit'
// fixtures
import {
  updateSubcategorySuccess,
  category,
  subcategory,
  updateSubcategoryError,
  getSubcategorySuccess,
} from 'store/category/fixtures'
// graphql

describe('SubcategoryEdit should', (): void => {
  const propFixtures = {
    rootPath: '/categories',
  }
  const renderUtilsProps = {
    route: `/category/${category.id}/subcategories/${subcategory.id}/edit`,
    routePath: `/category/:categoryId/subcategories/:id/edit`,
    mockWrappingRoute: true,
  }
  afterEach(cleanup)

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <SubcategoryEdit {...propFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [getSubcategorySuccess, updateSubcategorySuccess],
        context: { createNotificationBanner: createNotificationBannerStub },
      }
    )
    // Wait for getCategory
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Name' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // Wait for updateCategory
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: `Subkategorie New Name erfolgreich bearbeitet`,
      type: 'success',
    })
  })

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <SubcategoryEdit {...propFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [getSubcategorySuccess, updateSubcategoryError],
        context: { createNotificationBanner: createNotificationBannerStub },
      }
    )
    // Wait for getCategory
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Name' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // Wait for updateCategory
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: `Bearbeitung der Subkategorie fehlgeschlagen`,
      type: 'error',
    })
  })
})
