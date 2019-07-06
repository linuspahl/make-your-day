// libraries
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'react-apollo'
// graphql
import { GetRecords } from 'store/record/query'
// interfaces
import { Record } from 'store/record/type'

export const addRecord = (cache: DataProxy, result: FetchResult): void => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched
  try {
    const records: { getRecords: Record[] } = cache.readQuery({
      query: GetRecords,
    })
    const {
      data: { createRecord },
    } = result

    cache.writeQuery({
      query: GetRecords,
      data: {
        getRecords: [...records.getRecords, createRecord],
      },
    })
  } catch {}
}

export const deleteRecord = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: number }
): void => {
  const {
    data: { deleteRecord },
  } = result

  try {
    if (deleteRecord) {
      const recordsQuery: { getRecords: Record[] } = cache.readQuery({
        query: GetRecords,
      })
      const updatedRecords = recordsQuery.getRecords.filter(
        (records): boolean => {
          return records.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetRecords,
        data: {
          getRecords: [...updatedRecords],
        },
      })
    }
  } catch {}
}
