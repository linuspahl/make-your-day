import { GetRecords } from 'store/record/query.gql'

export const addRecord = (cache, createRecord) => {
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const records = cache.readQuery({ query: GetRecords })

    cache.writeQuery({
      query: GetRecords,
      data: {
        getCategories: records.getCategories.concat([createRecord]),
      },
    })
  } catch {}
}
