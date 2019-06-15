// libraries
import * as React from 'react'
// components
import CategoryOverview from './CategoryOverview'
import { renderWithAppRoot, wait } from 'testUtils'
// fixtures
import {
  category,
  getCategoriesError,
  getCategoriesSuccess,
} from 'store/category/fixtures'

describe('CategoryOverview should', (): void => {
  test('list fetched categories', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <CategoryOverview rootPath="/categories" />,
      { mocks: [getCategoriesSuccess] }
    )
    // Wait for the Query component
    await wait()
    expect(getByText(category.title)).toBeInTheDocument()
  })

  test('show info, when category fetching fails', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <CategoryOverview rootPath="/categories" />,
      { mocks: [getCategoriesError] }
    )
    // Wait for the Query component
    await wait()

    expect(
      getByText('Kategorien konnten nicht geladen werden')
    ).toBeInTheDocument()
  })

  test('show loading spinner, while fetching categories', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <CategoryOverview rootPath="/categories" />
    )
    // without `await wait()` the Query component will be in the loading state
    expect(getByTestId('CenteredSpinner')).toBeInTheDocument()
  })

  test('show info, when there are no existing categories', async (): Promise<
    void
  > => {
    const { getByText } = renderWithAppRoot(
      <CategoryOverview rootPath="/categories" />,
      {
        mocks: [
          { ...getCategoriesSuccess, result: { data: { getCategories: [] } } },
        ],
      }
    )
    await wait()

    expect(getByText('Kein Eintrag vorhanden')).toBeInTheDocument()
  })
})
