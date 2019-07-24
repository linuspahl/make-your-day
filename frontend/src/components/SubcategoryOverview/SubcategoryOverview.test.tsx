// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import SubcategoryOverview from './SubcategoryOverview'
// fixtrues
import {
  subcategory,
  getCategoryPlainWithChildrenSuccess,
} from 'store/category/fixtures'

describe('SubcategoryOverview should', (): void => {
  test('display content', async (): Promise<void> => {
    const categoryId =
      getCategoryPlainWithChildrenSuccess.result.data.getCategory.id

    const { getByText } = renderWithAppRoot(
      <SubcategoryOverview rootPath={`category/${categoryId}/subcategories`} />,
      {
        mocks: [getCategoryPlainWithChildrenSuccess],
        mockWrappingRoute: true,
        route: `category/${categoryId}/subcategories`,
        routePath: 'category/:id/subcategories',
      }
    )
    await wait()
    expect(getByText(subcategory.title)).toBeInTheDocument()
  })
})
