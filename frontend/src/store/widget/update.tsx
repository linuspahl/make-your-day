// libraries
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'react-apollo';
// graphql
import { GetWidgets } from 'store/widget/query'
import { Widget } from 'store/widget/type';

export const addWidget = (cache: DataProxy, result: FetchResult) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const widgets: {
      getWidgets: Array<Widget>
    } = cache.readQuery({ query: GetWidgets })

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

export const deleteWidget = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: number }
) => {
  const {
    data: { deleteWidget },
  } = result

  try {
    if (deleteWidget) {
      const widgetsQuery: {
        getWidgets: Array<Widget>
      } = cache.readQuery({ query: GetWidgets })

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
