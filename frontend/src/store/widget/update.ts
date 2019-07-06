// libraries
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'react-apollo'
// graphql
import { GetWidgets, GetWidgetsOverview } from 'store/widget/query'
import { Widget } from 'store/widget/type'

export const addWidget = (cache: DataProxy, result: FetchResult): void => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched
  try {
    const widgets: {
      getWidgets: Widget[]
    } = cache.readQuery({ query: GetWidgetsOverview })

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
): void => {
  const {
    data: { deleteWidget },
  } = result
  try {
    if (deleteWidget) {
      const widgetsQuery: {
        getWidgets: Widget[]
      } = cache.readQuery({ query: GetWidgetsOverview })

      const updatedWidgets = widgetsQuery.getWidgets.filter(
        (widget): boolean => {
          return widget.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetWidgets,
        data: {
          getWidgets: [...updatedWidgets],
        },
      })
    }
  } catch {}
}
