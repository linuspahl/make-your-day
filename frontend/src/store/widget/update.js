// graphql
import { GetWidgets } from 'store/category/query.gql'

export const addWidget = (cache, result) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const widgets = cache.readQuery({ query: GetWidgets })
    const {
      data: { createWidget },
    } = result

    cache.writeQuery({
      query: GetWidgets,
      data: {
        getWidgets: [...widgets.getWidgets, createWidget],
      },
    })
  } catch {}
}
