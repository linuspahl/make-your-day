// graphql
import { GetWidgets } from 'store/widget/query.gql'

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

export const deleteWidget = (cache, result, variables) => {
  const {
    data: { deleteWidget },
  } = result

  try {
    if (deleteWidget) {
      const widgetsQuery = cache.readQuery({ query: GetWidgets })
      const updatedWidgets = widgetsQuery.getWidgets.filter(widgets => {
        return widgets.id !== variables.id
      })

      cache.writeQuery({
        query: GetWidgets,
        data: {
          getWidgets: [...updatedWidgets],
        },
      })
    }
  } catch {}
}
