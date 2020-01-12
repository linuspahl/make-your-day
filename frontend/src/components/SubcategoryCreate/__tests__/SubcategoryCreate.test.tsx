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
// contexts
import AppContext from 'contexts/AppContext'
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
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <SubcategoryCreate {...propFixtures} />
      </AppContext.Provider>,
      {
        ...renderUtilsProps,
        mocks: [getCategorySuccess, createSubcategorySuccess],
      }
    )
    // Wait for getCategory
    await wait()
    initSubcategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    // Wait for updateCategory
    await wait()
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: `Subkategorie ${subcategory.title} erfolgreich erstellt`,
      type: 'success',
    })
  })

  test('should redirect to redord create form, on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <SubcategoryCreate {...propFixtures} rootPath="/categories" />
      </AppContext.Provider>,
      {
        ...renderUtilsProps,
        route: `/category/${category.id}/subcategories/create?source=createRecord`,
        mocks: [getCategorySuccess, createSubcategorySuccess],
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
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <SubcategoryCreate rootPath="/subcategories/create" />
      </AppContext.Provider>,
      {
        ...renderUtilsProps,
        mocks: [getCategorySuccess, createSubcategoryError],
      }
    )
    await wait()
    initSubcategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: 'Erstellung der Subkategorie fehlgeschlagen',
      type: 'error',
    })
  })
})
