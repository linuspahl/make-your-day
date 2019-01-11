import { GetCategories } from 'store/category/query.gql'

export const addCategory = (cache, createCategory) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const categories = cache.readQuery({ query: GetCategories })

    cache.writeQuery({
      query: GetCategories,
      data: {
        getCategories: categories.getCategories.concat([createCategory]),
      },
    })
  } catch {}
}
