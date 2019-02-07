// graphql
import {
  GetCategories,
  GetCategoryPlainWithChildren,
} from 'store/category/query.gql'

export const addCategory = (cache, result) => {
  const {
    data: { createCategory },
  } = result
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const categories = cache.readQuery({ query: GetCategories })

    cache.writeQuery({
      query: GetCategories,
      data: {
        getCategories: [...categories.getCategories, createCategory],
      },
    })
  } catch {}
}

export const addSubcategory = (cache, result, variables) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const categories = cache.readQuery({
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

export const deleteCategory = (cache, result, variables) => {
  const {
    data: { deleteCategory },
  } = result

  try {
    if (deleteCategory) {
      const categoriesQuery = cache.readQuery({ query: GetCategories })
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
