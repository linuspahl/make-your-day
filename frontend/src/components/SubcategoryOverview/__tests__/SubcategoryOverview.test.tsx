// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import SubcategoryOverview from 'components/SubcategoryOverview/SubcategoryOverview'
// fixtrues
import {
  subcategory,
  getCategoryForListWithChildrenSuccess,
} from 'store/category/fixtures'

describe('SubcategoryOverview should', (): void => {
  test('display content', async (): Promise<void> => {
    const categoryId =
      getCategoryForListWithChildrenSuccess.result.data.getCategory.id

    const { getByText } = renderWithAppRoot(
      <SubcategoryOverview rootPath={`category/${categoryId}/subcategories`} />,
      {
        mocks: [getCategoryForListWithChildrenSuccess],
        mockWrappingRoute: true,
        route: `category/${categoryId}/subcategories`,
        routePath: 'category/:id/subcategories',
      }
    )
    await wait()
    expect(getByText(subcategory.title)).toBeInTheDocument()
  })
})
