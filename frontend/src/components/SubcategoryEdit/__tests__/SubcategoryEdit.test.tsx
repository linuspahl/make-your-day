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
// contexts
import AppContext from 'contexts/AppContext'
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
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <SubcategoryEdit {...propFixtures} />
      </AppContext.Provider>,
      {
        ...renderUtilsProps,
        mocks: [getSubcategorySuccess, updateSubcategorySuccess],
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
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: `Subkategorie New Name erfolgreich bearbeitet`,
      type: 'success',
    })
  })

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <SubcategoryEdit {...propFixtures} />
      </AppContext.Provider>,
      {
        ...renderUtilsProps,
        mocks: [getSubcategorySuccess, updateSubcategoryError],
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
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: `Bearbeitung der Subkategorie fehlgeschlagen`,
      type: 'error',
    })
  })
})
