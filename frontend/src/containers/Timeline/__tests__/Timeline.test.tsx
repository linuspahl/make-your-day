// libraries
import React from 'react'
// utils
import { renderWithAppRoot } from 'testUtils'
// components
import Timeline from 'containers/Timeline/Timeline'

describe('Timeline should', (): void => {
  test('render timeline day edit route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Timeline rootPath="/timeline" />,
      {
        route: '/timeline/2010-12-20',
      }
    )
    expect(getByTestId('DayEdit')).toBeInTheDocument()
  })
})
