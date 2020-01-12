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
// components
import CategoryEdit from 'components/CategoryEdit/CategoryEdit'
// contexts
import AppContext from 'contexts/AppContext'
// fixtures
import {
  updateCategorySuccess,
  updateCategoryError,
  category,
  getCategorySuccess,
} from 'store/category/fixtures'

describe('CategoryEdit should', (): void => {
  const renderUtilsProps = {
    mocks: [getCategorySuccess, updateCategorySuccess],
    mockWrappingRoute: true,
    route: `/categories/edit/${updateCategorySuccess.result.data.updateCategory.id}`,
    routePath: '/categories/edit/:id',
  }
  const propsFixture = {
    rootPath: `/categories`,
  }
  afterEach(cleanup)

  test('show notification banner on successful edit ', async (): Promise<
    void
  > => {
    const createNotificationBanner = jest.fn()
    const { getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <CategoryEdit {...propsFixture} />
      </AppContext.Provider>,
      renderUtilsProps
    )
    // Wait for getCategory
    await wait()
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // Wait for updateCategory
    await wait()
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: `Kategorie ${category.title} erfolgreich bearbeitet`,
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful edit ', async (): Promise<
    void
  > => {
    const createNotificationBanner = jest.fn()
    const { getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <CategoryEdit {...propsFixture} />
      </AppContext.Provider>,
      {
        ...renderUtilsProps,
        mocks: [getCategorySuccess, updateCategoryError],
      }
    )
    // Wait for getCategory
    await wait()
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // Wait for updateCategory
    await wait()
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: 'Bearbeitung der Kategorie fehlgeschlagen',
      type: 'error',
    })
  })
})
