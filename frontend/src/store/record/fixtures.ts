// graphql
import { Record } from 'store/record/type'
import { GetRecords } from 'store/record/query'
// fixtures
import { category } from 'store/category/fixtures'

export const record: Record = {
  id: 1,
  title: 'Einrag',
  amount: 10,
  createdAt: '1560151144',
  categoryId: category.id,
  category: category,
  description: null,
}

// # Api stubs

// ## getRecords
const getRecordsRequest = {
  request: {
    query: GetRecords,
  },
}
export const getRecordsSuccess = {
  ...getRecordsRequest,
  result: {
    data: {
      getRecords: [record, { ...record, id: 2, createdAt: '1560862502' }],
    },
  },
}
export const getRecordsError = {
  ...getRecordsRequest,
  error: new Error('getRecords failed'),
}
