// libraries
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'react-apollo'
// graphql
import {
  GetCategoriesForList,
  GetCategoryForListWithChildren,
} from 'store/category/query'
// interfaces
import { CategoryFull, Category, Subcategory } from 'store/category/type'

export const addCategory = (cache: DataProxy, result: FetchResult): void => {
  const {
    data: { createCategory },
  } = result
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched.
  try {
    const categories: { GetCategoriesForList: Category[] } = cache.readQuery({
      query: GetCategoriesForList,
    })

    cache.writeQuery({
      query: GetCategoriesForList,
      data: {
        GetCategoriesForList: [
          ...categories.GetCategoriesForList,
          createCategory,
        ],
      },
    })
  } catch {}
}

export const addSubcategory = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: number }
): void => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched
  try {
    const category: { getCategory: CategoryFull } = cache.readQuery({
      query: GetCategoryForListWithChildren,
      variables,
    })
    const {
      data: { createSubcategory },
    } = result

    cache.writeQuery({
      query: GetCategoryForListWithChildren,
      data: {
        getCategory: {
          ...category.getCategory,
          subcategory: [
            ...category.getCategory.subcategories,
            createSubcategory,
          ],
        },
      },
      variables,
    })
  } catch {}
}

export const deleteCategory = (
  cache: DataProxy,
  result: FetchResult,
  variables: Category
): void => {
  const {
    data: { deleteCategory },
  } = result

  try {
    if (deleteCategory) {
      const categoriesQuery: {
        GetCategoriesForList: CategoryFull[]
      } = cache.readQuery({ query: GetCategoriesForList })
      const updatedCategories = categoriesQuery.GetCategoriesForList.filter(
        (category): boolean => {
          return category.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetCategoriesForList,
        data: {
          GetCategoriesForList: [...updatedCategories],
        },
      })
    }
  } catch {}
}
