// graphql
import { GetRecords } from 'store/record/query.gql'

export const addRecord = (cache, result) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const records = cache.readQuery({ query: GetRecords })
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
