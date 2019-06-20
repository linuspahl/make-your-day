// graphql
import { Record, RecordCreate } from 'store/record/type'
import { GetRecords } from 'store/record/query'
// fixtures
import { category } from 'store/category/fixtures'
// graphql
import { CreateRecord } from 'store/record/mutation'

export const createRecord: RecordCreate = {
  title: 'Einrag',
  amount: 10,
  categoryId: category.id,
  description: null,
}

export const record: Record = {
  ...createRecord,
  category,
  createdAt: '1560151144',
  id: 1,
}

// # Api stubs

// ## createRecord
const createRecordRequest = {
  request: {
    query: CreateRecord,
    variables: createRecord,
  },
}
export const createRecordSuccess = {
  ...createRecordRequest,
  result: {
    data: {
      createRecord: record,
    },
  },
}
export const createRecordError = {
  ...createRecordRequest,
  error: new Error('createRecord failed'),
}

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
