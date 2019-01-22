import { GetWidgets } from 'store/category/query.gql'

export const addWidget = (cache, createCategory) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const widgets = cache.readQuery({ query: GetWidgets })

    cache.writeQuery({
      query: GetWidgets,
      data: {
        getWidgets: widgets.getWidgets.concat([createCategory]),
      },
    })
  } catch {}
}
