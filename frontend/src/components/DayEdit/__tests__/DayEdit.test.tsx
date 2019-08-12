// libraries
import React from 'react'
// utils
import { renderWithAppRoot, wait, adjustApiStub } from 'testUtils'
// components
import DayEdit from 'components/DayEdit/DayEdit'

import { getRecordsSuccess } from 'store/record/fixtures'
import { record } from 'store/record/fixtures'

describe('DayEdit should', (): void => {
  test('should list records', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(<DayEdit />, {
      mocks: [
        adjustApiStub(getRecordsSuccess, {
          variables: { createdAt: '2010-10-10' },
        }),
      ],
      route: `/timeline/2010-10-10`,
      routePath: `/timeline/:date`,
      mockWrappingRoute: true,
    })
    // Wait for getRecords
    await wait()
    expect(getByText(record.category.title)).toBeInTheDocument()
  })
})
