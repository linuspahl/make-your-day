// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import SubcategoryOverview from './SubcategoryOverview'
// fixtrues
import {
  subcategory,
  category,
  getCategoryPlainWithChildrenSuccess,
} from 'store/category/fixtures'

describe('SubcategoryOverview should', (): void => {
  test('display content', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <SubcategoryOverview
        rootPath={`category/${category.id}/subcategories`}
      />,
      { mocks: [getCategoryPlainWithChildrenSuccess] }
    )
    await wait()
    expect(getByText(subcategory.title)).toBeInTheDocument()
  })
})
