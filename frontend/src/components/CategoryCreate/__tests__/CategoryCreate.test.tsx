// libraries
import React from 'react'
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
import CategoryCreate from 'components/CategoryCreate/CategoryCreate'
// contexts
import AppContext from 'contexts/AppContext'
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
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <CategoryCreate {...propsFixture} />
      </AppContext.Provider>,
      { mocks: [createCategorySuccess] }
    )
    initCategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: `Kategorie ${category.title} erfolgreich erstellt`,
      type: 'success',
    })
  })

  test('redirect to categories overview, if created category hasSubcategories prop is false ', async (): Promise<
    void
  > => {
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <CategoryCreate {...propsFixture} />
      </AppContext.Provider>,
      {
        mocks: [
          {
            ...createCategorySuccess,
            result: {
              data: {
                createCategory: {
                  ...createCategorySuccess.result.data.createCategory,
                  hasSubcategories: false,
                },
              },
            },
          },
        ],
      }
    )
    initCategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    // TODO: Test if got redirected to '/categories', currently not possible
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBanner = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <AppContext.Provider value={{ createNotificationBanner }}>
        <CategoryCreate {...propsFixture} />
      </AppContext.Provider>,
      { mocks: [createCategoryError] }
    )
    initCategoryForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBanner).toBeCalledTimes(1)
    expect(createNotificationBanner).toBeCalledWith({
      message: 'Erstellung der Kategorie fehlgeschlagen',
      type: 'error',
    })
  })
})
