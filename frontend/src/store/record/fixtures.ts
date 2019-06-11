// graphql
import { Record } from 'store/record/type'
import { GetRecords } from 'store/record/query'
// fixtures
import { category } from 'store/category/fixtures'

export const record: Record = {
  id: 1,
  title: 'Einrag',
  amount: 10,
  createdAt: '1560251144',
  categoryId: category.id,
  category: category,
}

// Api stubs
const getRecordsRequest = {
  request: {
    query: GetRecords,
  },
}
export const getRecordsSuccess = {
  ...getRecordsRequest,
  result: {
    data: {
      getRecords: [record],
    },
  },
}

export const getRecordsError = {
  ...getRecordsRequest,
  error: new Error('getRecords failed'),
}
