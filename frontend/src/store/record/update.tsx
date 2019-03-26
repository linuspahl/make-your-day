// libraries
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'react-apollo';
// graphql
import { GetRecords } from 'store/record/query'
// interfaces
import { Record } from 'store/record/type';

export const addRecord = (cache: DataProxy, result: FetchResult) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const records: { getRecords: Array<Record>} = cache.readQuery({ query: GetRecords })
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

export const deleteRecord = (cache: DataProxy, result: FetchResult, variables: { id: number }) => {
  const {
    data: { deleteRecord },
  } = result

  try {
    if (deleteRecord) {
      const recordsQuery: { getRecords: Array<Record>} = cache.readQuery({ query: GetRecords })
      const updatedRecords = recordsQuery.getRecords.filter(records => {
        return records.id !== variables.id
      })

      cache.writeQuery({
        query: GetRecords,
        data: {
          getRecords: [...updatedRecords],
        },
      })
    }
  } catch {}
}
