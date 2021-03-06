// libraries
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'react-apollo'
// graphql
import {
  GetCategoriesForList,
  GetCategoryForListWithChildren,
} from 'store/category/query'
// interfaces
import { CategoryFull, Category, CategoryForList } from 'store/category/type'

export const addCategory = (cache: DataProxy, result: FetchResult): void => {
  const {
    data: { createCategory },
  } = result
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched.
  try {
    const categories: { getCategories: Category[] } = cache.readQuery({
      query: GetCategoriesForList,
    })

    cache.writeQuery({
      query: GetCategoriesForList,
      data: {
        getCategories: [...categories.getCategories, createCategory],
      },
    })
  } catch {}
}

export const addSubcategory = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: string }
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
          subcategories: [
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
        getCategories: CategoryForList[]
      } = cache.readQuery({ query: GetCategoriesForList })

      const updatedCategories = categoriesQuery.getCategories.filter(
        (category): boolean => {
          return category.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetCategoriesForList,
        data: {
          getCategories: [...updatedCategories],
        },
      })
    }
  } catch {}
}

export const deleteSubcategory = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: string },
  parentCategoryId: string
): void => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched
  try {
    const category: { getCategory: CategoryFull } = cache.readQuery({
      query: GetCategoryForListWithChildren,
      variables: { id: parentCategoryId },
    })
    const {
      data: { deleteCategory },
    } = result

    if (deleteCategory) {
      const updatedSubcategories = category.getCategory.subcategories.filter(
        (category): boolean => {
          return category.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetCategoryForListWithChildren,
        data: {
          getCategory: {
            ...category.getCategory,
            subcategories: updatedSubcategories,
          },
        },
        variables,
      })
    }
  } catch {}
}
