// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import DayEdit from './DayEdit'

import { getRecordsSuccess } from 'store/record/fixtures'

describe('DayEdit should', (): void => {
  test('should list records', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(<DayEdit />, {
      mocks: [
        {
          ...getRecordsSuccess,
          request: {
            ...getRecordsSuccess.request,
            variables: { date: '2010-10-10' },
          },
        },
      ],
      route: `/timeline/2010-10-10`,
      routePath: `/timeline/:date`,
      mockWrappingRoute: true,
    })
    // wait for getRecords
    await wait()
  })
})
