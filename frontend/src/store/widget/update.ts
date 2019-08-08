// libraries
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'react-apollo'
// graphql
import { GetWidgetsForList } from 'store/widget/query'
import { WidgetEdit } from 'store/widget/type'

export const addWidget = (cache: DataProxy, result: FetchResult): void => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched
  try {
    const widgets: {
      getWidgets: WidgetEdit[]
    } = cache.readQuery({ query: GetWidgetsForList })

    const {
      data: { createWidget },
    } = result

    cache.writeQuery({
      query: GetWidgetsForList,
      data: {
        getWidgets: [...widgets.getWidgets, createWidget],
      },
    })
  } catch {}
}

export const deleteWidget = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: string }
): void => {
  const {
    data: { deleteWidget },
  } = result
  try {
    if (deleteWidget) {
      const widgetsQuery: {
        getWidgets: WidgetEdit[]
      } = cache.readQuery({ query: GetWidgetsForList })

      const updatedWidgets = widgetsQuery.getWidgets.filter(
        (widget): boolean => {
          return widget.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetWidgetsForList,
        data: {
          getWidgets: [...updatedWidgets],
        },
      })
    }
  } catch {}
}
