// libraries
import * as React from 'react'
import MockDate from 'mockdate'
// utils
import { renderWithAppRoot, wait, cleanup } from 'testUtils'
// components
import TimelineWidget from 'components/TimelineWidget/TimelineWidget'
// fixtures
import { getRecordsSuccess, record } from 'store/record/fixtures'

describe('TimelineWidget should', (): void => {
  beforeEach((): void => {
    MockDate.set(new Date(parseInt(record.createdAt)))
  })
  afterEach(cleanup)

  test('display timeline day', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(<TimelineWidget />, {
      mocks: [
        {
          ...getRecordsSuccess,
          result: {
            data: {
              getRecords: [
                ...getRecordsSuccess.result.data.getRecords,
                {
                  ...record,
                  id: 3,
                  category: { ...record.category, hasUnit: false },
                },
              ],
            },
          },
        },
      ],
    })
    await wait()
    expect(getByText('We')).toBeInTheDocument()
  })

  test('work without existing records', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(<TimelineWidget />, {
      mocks: [{ ...getRecordsSuccess, result: { data: { getRecords: [] } } }],
    })
    await wait()
    expect(getByText('Kein Eintrag vorhanden')).toBeInTheDocument()
  })
})
