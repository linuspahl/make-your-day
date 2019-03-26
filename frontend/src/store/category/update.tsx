// libraries
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'react-apollo';
// graphql
import {
  GetCategories,
  GetCategoryPlainWithChildren,
} from 'store/category/query'
// interfaces
import { CategoryFull, Category, CategoryCreate } from 'store/category/type';

export const addCategory = (cache: DataProxy, result: FetchResult) => {
  const {
    data: { createCategory },
  } = result
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const categories: { getCategories: Array<Category>} = cache.readQuery({ query: GetCategories })

    cache.writeQuery({
      query: GetCategories,
      data: {
        getCategories: [...categories.getCategories, createCategory],
      },
    })
  } catch {}
}

export const addSubcategory = (cache: DataProxy, result: FetchResult, variables: { id: number}) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const categories: { getCategory: CategoryFull } = cache.readQuery({
      query: GetCategoryPlainWithChildren,
      variables,
    })
    const {
      data: { createSubcategory },
    } = result

    cache.writeQuery({
      query: GetCategoryPlainWithChildren,
      data: {
        getCategory: {
          ...categories.getCategory,
          subcategories: [
            ...categories.getCategory.subcategories,
            createSubcategory,
          ],
        },
      },
      variables,
    })
  } catch {}
}

export const deleteCategory = (cache: DataProxy, result: FetchResult, variables: Category) => {
  const {
    data: { deleteCategory },
  } = result

  try {
    if (deleteCategory) {
      const categoriesQuery: { getCategories: Array<CategoryFull>} = cache.readQuery({ query: GetCategories })
      const updatedCategories = categoriesQuery.getCategories.filter(
        category => {
          return category.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetCategories,
        data: {
          getCategories: [...updatedCategories],
        },
      })
    }
  } catch {}
}