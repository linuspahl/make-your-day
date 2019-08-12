// libraries
import React from 'react'
// components
import CategoryOverview from 'components/CategoryOverview/CategoryOverview'
import { renderWithAppRoot, wait } from 'testUtils'
// fixtures
import { category, getCategoriesSuccess } from 'store/category/fixtures'

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
})
